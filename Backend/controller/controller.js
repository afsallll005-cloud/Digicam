import { Categorymodel, Dealareamodel, Productmodel, UserModel } from "../model/Schema.js";


export const addUser = async (req, res) => {
  try {
    const { username, password } = req.body
    console.log(username, password)


    if (username.length == 0 || password.length == 0) {
      res.send('All fields are required');
    } else {
      await UserModel.insertOne({
        username,
        password,
      }); console.log('User added successfully');
    }


    res.json({
      status: true,
      message: "User received successfully",

    })

  } catch (error) {
    console.log(error)
  }
}




export const postlogin = async (req, res) => {
  try {
    const { username, password } = req.body;

   
    if (!username || !password) {
      return res.json({
        status: false,
        message: "username & Password required",
      });
    }

  
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.json({
        status: false,
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.json({
        status: false,
        message: "Invalid password",
      });
    }

    res.json({
      status: true,
      message: "Login successful",
      data: user,
    });

  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Server error",
    });
  }
}


// Add Product
export const addproduct = async (req, res) => {
  try {

    console.log(req.body);
    console.log(req.file);

    const newProduct = new Productmodel({
      Id: req.body.Id,
      ProductName: req.body.ProductName,
      Description: req.body.Description,
      Price: req.body.Price,
      MRPprice: req.body.MRPprice,
      Category: req.body.Category,
      Image: req.file ? req.file.filename : ""
    });

    await newProduct.save();

    res.json({
      status: true,
      message: "Product added",
      data: newProduct
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false });
  }
};



export const getListproduct = async (req, res) => {
  try {
        const products = await Productmodel.find({isDelete:false});
        res.json({ status: true, data: products });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
};



export const deleteproduct = async (req, res) => {
  try {
    await Productmodel.findByIdAndUpdate(req.params.id, {
      isDelete: true,
    });

    res.json({ status: true, message: "Moved to recycle bin" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false });
  }
};



export const geteditproduct = async (req, res) => {
  try {
        const product = await Productmodel.findById(req.params.id);
        res.json({ status: true, data: product });
    } catch (err) {
        res.status(500).json({ status: false });
    }
};


export const updateproduct = async (req, res) => {
  try {

        const updateData = {
            ProductName: req.body.ProductName,
            Description: req.body.Description,
            Price: req.body.Price,
            MRPprice: req.body.MRPprice,
            Category: req.body.Category,
        };

        // if new image uploaded
        if (req.file) {
            updateData.Image = req.file.filename;
        }

        const updated = await Productmodel.findByIdAndUpdate(
            req.params.id,
            updateData,
           { new: true }
        );

        res.json({ status: true, data: updated });

    } catch (err) {
        res.status(500).json({ status: false });
    }
};



export const addcategory = async (req, res) => {
 try {
    const { name } = req.body;

    // check duplicate
    const existing = await Categorymodel.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const newCategory = new Categorymodel({ name });
    await newCategory.save();

    res.json({ message: "Category added successfully", data: newCategory });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};







export const getCategories = async (req, res) => {
  try {
    const categories = await Categorymodel.find();
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error fetching categories" });
  }
};



// Restore
export const getRestoreproduct = async (req, res) => {
  try {
        const products = await Productmodel.find({isDelete:true});
        res.json({ status: true, data: products });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
};


export const restore = async (req, res) => {
  try {
    await Productmodel.findByIdAndUpdate(req.params.id, {
      isDelete: false,
    });
    res.json({ status: true });
  } catch (err) {
    res.status(500).json({ status: false });
  }
};

export const permenentdelete = async (req, res) => {
   try {
    await Productmodel.findByIdAndDelete(req.params.id);
    res.json({ status: true });
  } catch (err) {
    res.status(500).json({ status: false });
  }
};





// Add Deal Area
export const getDealarea = async (req, res) => {
  try {
    const deals = await Dealareamodel.find();
    res.json({ status: true, data: deals });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: false });
  }
};




export const addDealarea = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    // 👇 HARD CHECK
    if (!req.files || !req.files.BrandImage || !req.files.Image) {
      return res.status(400).json({
        error: "Files missing",
        files: req.files
      });
    }

    const newDeal = new Dealareamodel({
      BrandImage: req.files.BrandImage[0].filename,
      Category: req.body.Category,
      ProductName: req.body.ProductName,
      MRPprice: req.body.MRPprice,
      Image: req.files.Image[0].filename
    });

    console.log("Saving to DB...");

    await newDeal.save();

    console.log("Saved successfully");

    res.json({
      status: true,
      message: "Deal Area added",
      data: newDeal
    });

  } catch (error) {
    console.log("🔥 FULL ERROR:", error); // VERY IMPORTANT
    res.status(500).json({
      status: false,
      error: error.message
    });
  }
};