import { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Addproducts.css";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { getApiUrl } from "../../../config/api";

function Addproducts() {
    const [addProduct, setAddProduct] = useState(false)
    const [showCategory, setShowCategory] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categories, setCategories] = useState([]);

    const formik = useFormik({
        initialValues: {
            Id: "",
            ProductName: "",
            Description: "",
            Price: "",
            Category: "",
            MRPprice: "",
            Image: null
        },

        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("Id", values.Id);
                formData.append("ProductName", values.ProductName);
                formData.append("Description", values.Description);
                formData.append("Price", values.Price);
                formData.append("MRPprice", values.MRPprice);

                formData.append("Category", values.Category);
                formData.append("Image", values.Image);

                const res = await axios.post(
                    getApiUrl("/addProduct"),
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" }
                    }
                );

                alert("Product added");

                setAddProduct(false);

            } catch (err) {
                console.log(err);
            }
        }
    });



    const handleAddCategory = async () => {
        try {
            await axios.post(getApiUrl("/addCategory"), {
                name: categoryName
            });

            alert("Category added");

            await fetchCategories(); // refresh dropdown

            // ✅ AUTO SELECT NEW CATEGORY
            formik.setFieldValue("Category", categoryName);

            setShowCategory(false);
            setCategoryName("");

        } catch (err) {
            console.log(err);
        }
    };



    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await axios.get(getApiUrl("/getCategories"));
            setCategories(res.data);
        } catch (err) {
            console.log(err);
        }
    };





    return (
        <div className="dash">

            <Sidebar />

            <div className="main">

                {/* TOPBAR */}
                <div className="topbar">
                    <div className="menu">
                        <Link to="/Listproducts">All Products</Link>
                        <Link to="/Addproducts" id="Active">Add Products</Link>


                        {/* <select name="Set Index" id="">
      <option>Set Hero</option>
      <option>Set Deal Area</option>
      <option>Set Thambanile</option>

</select> */}

                        <a>Set Hero</a>
                        <a>Set Thambanile</a>

                        <a>Set Deal Area</a>
                        <a>Settings</a>
                    </div>

                    <div className="top-right">
                        <input type="text" placeholder="Search" />
                        <button className="download" onClick={() => setShowCategory(true)} >+Add Category</button>
                    </div>
                </div>


                {showCategory && (
                    <div className="category-modal">
                        <div className="category-box">
                            <h2>Add Category</h2>

                            <input
                                type="text"
                                placeholder="Enter category name"
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />

                            <div className="btns">
                                <button onClick={handleAddCategory}>Add</button>
                                <button onClick={() => setShowCategory(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                <h1>Add Products</h1>

                {/* CARDS */}
                <div className="cards">



                    <div className="main-container">
                        <div className="form-card">

                            <form onSubmit={formik.handleSubmit} className="form-grid">

                                <div className="input-group">
                                    <label>Product ID</label>
                                    <input
                                        type="text"
                                        name="Id"
                                        placeholder="Type Product Id"
                                        onChange={formik.handleChange}
                                        value={formik.values.Id || ""}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Product Name</label>
                                    <input
                                        type="text"
                                        name="ProductName"
                                        placeholder="Type Product Name"
                                        onChange={formik.handleChange}
                                        value={formik.values.ProductName}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>MRP</label>
                                    <input
                                        type="text"
                                        name="MRPprice"
                                        placeholder="Type Product MRPrice"
                                        onChange={formik.handleChange}
                                        value={formik.values.MRPprice}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Selling Price</label>
                                    <input
                                        type="text"
                                        name="Price"
                                        placeholder="Type Product Price"
                                        onChange={formik.handleChange}
                                        value={formik.values.Price}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Product Image</label>
                                    <input
                                        type="file"
                                        name="Image"
                                        onChange={(e) => {
                                            formik.setFieldValue("Image", e.currentTarget.files[0]);
                                        }}
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Category</label>
                                    {/* <input
                                        type="text"
                                        name="Category"
                                        placeholder="Type Product category"
                                        onChange={formik.handleChange}
                                        value={formik.values.Category}
                                    /> */}


                                    <select
                                        name="Category"
                                        onChange={formik.handleChange}
                                        value={formik.values.Category}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.length > 0 ? (
                                            categories.map((cat) => (
                                                <option key={cat._id} value={cat.name}>
                                                    {cat.name}
                                                </option>
                                            ))
                                        ) : (
                                            <option disabled>No categories</option>
                                        )}
                                    </select>

                                </div>

                                <div className="input-group">
                                    <label>Description</label>
                                    <textarea
                                        name="Description"
                                        placeholder="Type Product Description"
                                        onChange={formik.handleChange}
                                        value={formik.values.Description}
                                    />
                                </div>

                                <div className="button-group">
                                    <button type="submit" className="btn-primary">Add Product</button>
                                    <button type="reset" className="btn-secondary">Cancel</button>
                                </div>

                            </form>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    );
}

export default Addproducts;