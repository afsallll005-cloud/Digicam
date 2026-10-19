import { useEffect } from "react";
import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './Editproduct.css'
import Sidebar from "../../components/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { getApiUrl } from "../../config/api";


function Editproduct() {

    const { id } = useParams();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            ProductName: "",
            Description: "",
            Price: "",
            MRPprice: "",
            Category: "",
            Image: null
        },

        onSubmit: async (values) => {
            try {
                const formData = new FormData();

                formData.append("ProductName", values.ProductName);
                formData.append("Description", values.Description);
                formData.append("Price", values.Price);
                formData.append("MRPprice", values.MRPprice);
                formData.append("Category", values.Category);
                formData.append("Image", values.Image);

                await axios.put(
                    getApiUrl(`/updateproduct/${id}`),
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" }
                    }
                );

                alert("Product updated");
                navigate("/Listproducts");

            } catch (err) {
                console.log(err);
            }
        }
    });

    // ✅ Load product data
    useEffect(() => {
        axios.get(getApiUrl(`/product/${id}`))
            .then((res) => {
                const data = res.data.data;

                formik.setValues({
                    ProductName: data.ProductName,
                    Description: data.Description,
                    Price: data.Price,
                    MRPprice: data.MRPprice,
                    Category: data.Category,
                    Image: null
                });
            });
    }, [id]);

    return (

        <div className="dash">

            <Sidebar />



            <div className="main">

                {/* TOPBAR */}
                <div className="topbar">
                    <div className="menu">
                        <Link to="/Listproducts" >All Products</Link>
                        <Link to="/Addproducts">Add Products</Link>

                        <a>Set Hero</a>
                        <a>Set Thambanile</a>
                        <a>Set Deal Area</a>
                        <a>Settings</a>
                    </div>

                    <div className="top-right">
                        <input type="text" placeholder="Search" />
                        <button className="download">Add Products</button>
                    </div>
                </div>

                <h1>Edit Products</h1>

                {/* PRODUCT CARDS */}
                <div className="cards">



                    <div className="form-container">
                        <div style={{ padding: "30px" }}>
                            {/* <h1>Edit Product</h1> */}

                            <form onSubmit={formik.handleSubmit}>

                                <input
                                    name="ProductName"
                                    value={formik.values.ProductName}
                                    onChange={formik.handleChange}
                                    placeholder="Product Name"
                                />
                                <input
                                    name="Category"
                                    value={formik.values.Category}
                                    onChange={formik.handleChange}
                                    placeholder="Category"
                                />

                                <input
                                    name="Price"
                                    value={formik.values.Price}
                                    onChange={formik.handleChange}
                                    placeholder="Price"
                                />
                                

                                {/* <input
                                    name="MRPprice"
                                    value={formik.values.MRPprice}
                                    onChange={formik.handleChange}
                                    placeholder="MRP"
                                /> */}


                                <textarea
                                    name="Description"
                                    value={formik.values.Description}
                                    onChange={formik.handleChange}
                                />

                                <input
                                    type="file"
                                    onChange={(e) =>
                                        formik.setFieldValue("Image", e.target.files[0])
                                    }
                                />

                                <button type="submit">Update</button>
                            </form>
                        </div>
                    </div>





                </div>

            </div>

        </div>
    );
}

export default Editproduct;