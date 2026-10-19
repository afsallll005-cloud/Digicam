import mongoose from 'mongoose'   

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  Role: {type: String, default:"user" }
});

export const UserModel =mongoose.model('signupCollection',userSchema);



// add product 
const productSchema = new mongoose.Schema({
    Id: String,
    ProductName: String,
    Description: String,
    Price: String,
    MRPprice: String,
    Category: String,
    Image: String,
    isDelete: { type: Boolean, default: false, required: true },
});

export const Productmodel = mongoose.model("Product", productSchema);




// Category
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});
export const Categorymodel = mongoose.model("Category",categorySchema);




// Add Deal Area

const dealSchema = new mongoose.Schema({
    BrandImage: String,
    Category: String,
    ProductName: String,
    MRPprice: String,
    Image: String
});

export const Dealareamodel = mongoose.model("dealareaCollection",dealSchema);



