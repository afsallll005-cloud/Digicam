import Sidebar from "../../../components/Sidebar/Sidebar";
import "./Listproducts.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getApiUrl, getImageUrl } from "../../../config/api";



function Listproducts() {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    // ✅ Fetch products
    useEffect(() => {
        axios.get(getApiUrl("/listProduct"))
            .then((res) => {
                setProducts(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // ✅ Delete product
    const deleteProduct = async (id) => {
        try {
            await axios.delete(getApiUrl(`/deleteproduct/${id}`));
            setProducts(products.filter((item) => item._id !== id));
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
                        <Link to="/Listproducts" id="Active">All Products</Link>
                        <Link to="/Addproducts">Add Products</Link>

                        <a>Set Hero</a>
                        <a>Set Thambanile</a>
                        <a>Set Deal Area</a>
                        <a>Settings</a>
                    </div>

                    <div className="top-right">
                        <input type="text" placeholder="Search" />
                        <button className="download" onClick={() => navigate("/Restoreproduct")}>
                            Revelt
                        </button>
                    </div>
                </div>

                <h1>Products</h1>

                {/* PRODUCT CARDS */}
                <div className="cards">
                    {products.map((item) => (
                        <div className="product-card" key={item._id}>

                            <img
                                src={getImageUrl(item.Image, "/images/Cam01.png")}
                                alt="product"
                                className="product-img"
                            />

                            <div className="product-info">
                                <h3>{item.ProductName}</h3>

                                <p className="category">{item.Category}</p>
                                <p className="discription">{item.Description}</p>

                                {/* <p className="mrp">₹{item.MRPprice}</p> */}

                                <p className="price">₹{item.Price}</p>
                                {/* <p className="pid">ID: {item.Id}</p> */}

                                {/* ACTION BUTTONS */}
                                <div className="card-actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => navigate(`/editproduct/${item._id}`)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteProduct(item._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default Listproducts;