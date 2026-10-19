import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from "multer";
import { addcategory, addDealarea, addproduct, addUser, deleteproduct, getCategories, getDealarea, geteditproduct, getListproduct, getRestoreproduct, permenentdelete, postlogin, restore, updateproduct } from './controller/controller.js';
dotenv.config()
import fs from "fs";
import path from "path";

const corsOptions={
    origin:'*',
   credentials: true,
optionsSuccessStatus: 200,
}


const app=express();


const uploadPath = path.join("public", "images");



// auto create folder
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

const upload = multer({ storage });



const dburl = process.env.DB_URL;
mongoose.connect(dburl).then(()=> console.log("connection Successful"))
.catch((error) => console.error("connection error;",error))





app.use (cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static('public'))
app.use("/images", express.static("public/images"));


// app.get ()
app.post('/addUser',addUser)
app.post('/login',postlogin)

//  Add Product
app.post('/addProduct', upload.single('Image'), addproduct)
app.get("/listProduct",getListproduct)

// Delete Product
app.delete("/deleteproduct/:id",deleteproduct)

// Product Edit
app.get("/product/:id",geteditproduct)
app.put("/updateproduct/:id", upload.single("Image"),updateproduct)

// Category
app.post("/addCategory",addcategory)
app.get("/getCategories",getCategories)

// Restore
app.get("/Restoreproduct",getRestoreproduct)
app.put("/restore/:id",restore)
app.delete("/permanentDelete/:id",permenentdelete)

//  Add Deal Area
app.get("/getDealareas",getDealarea)

app.post(
  "/addDealarea",
  upload.fields([
    { name: "BrandImage", maxCount: 1 },
    { name: "Image", maxCount: 1 }
  ]),
  addDealarea
);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
       `app is listening on http://localhost:${PORT}/`
    )
})



