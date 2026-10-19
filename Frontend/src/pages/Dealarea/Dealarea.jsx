import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { getApiUrl } from "../../config/api";

function Dealarea() {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            BrandImage: null,
            Category: "",
            ProductName: "",
            MRPprice: "",
            Image: null
        },

        onSubmit: async (values) => {
            try {
                if (!values.Image || !values.BrandImage) {
                    alert("Please upload both images");
                    return;
                }

                const formData = new FormData();
                formData.append("BrandImage", values.BrandImage);
                formData.append("Category", values.Category);
                formData.append("ProductName", values.ProductName);
                formData.append("MRPprice", values.MRPprice);
                formData.append("Image", values.Image);

                const res = await axios.post(
                    getApiUrl("/addDealarea"),
                    formData
                );

                if (res.data.status) {
                    alert("Deal Area Added Successfully");
                    formik.resetForm();
                } else {
                    alert("Failed to add");
                }

            } catch (err) {
                console.log(err);
                alert("Server error");
            }
        }
    });

    return (
        <div className="dash">
            <Sidebar />

            <div className="main">

                {/* TOPBAR */}
                <div className="topbar">
                    <div className="menu">
                        <Link to="/Listproducts">All Products</Link>
                        <Link to="/Addproducts">Add Products</Link>

                        <a>Set Hero</a>
                        <a>Set Thumbnail</a>
                        <a>Set Deal Area</a>
                        <a>Settings</a>
                    </div>

                    <div className="top-right">
                        <input type="text" placeholder="Search" />
                        <button
                            className="download"
                            onClick={() => navigate("/Listproducts")}
                        >
                            Back
                        </button>
                    </div>
                </div>

                <h1>Deal Area</h1>

                <div className="cards">
                    <div className="main-container">
                        <div className="form-card">

                            <form onSubmit={formik.handleSubmit} className="form-grid">

                                {/* BRAND IMAGE */}
                                <div className="input-group">
                                    <label>Brand Logo</label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            formik.setFieldValue("BrandImage", e.currentTarget.files[0])
                                        }
                                    />
                                </div>

                                {/* CATEGORY */}
                                <div className="input-group">
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        name="Category"
                                        onChange={formik.handleChange}
                                        value={formik.values.Category}
                                    />
                                </div>

                                {/* PRODUCT NAME */}
                                <div className="input-group">
                                    <label>Product Name</label>
                                    <input
                                        type="text"
                                        name="ProductName"
                                        onChange={formik.handleChange}
                                        value={formik.values.ProductName}
                                    />
                                </div>

                                {/* MRP */}
                                <div className="input-group">
                                    <label>MRP</label>
                                    <input
                                        type="text"
                                        name="MRPprice"
                                        onChange={formik.handleChange}
                                        value={formik.values.MRPprice}
                                    />
                                </div>

                                {/* PRODUCT IMAGE */}
                                <div className="input-group">
                                    <label>Product Image</label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            formik.setFieldValue("Image", e.currentTarget.files[0])
                                        }
                                    />
                                </div>

                                <div className="button-group">
                                    <button type="submit" className="btn-primary">
                                        Add Deal
                                    </button>

                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        onClick={formik.resetForm}
                                    >
                                        Cancel
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Dealarea;