import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../config/api";
import "./Cards.css";

function Cards({ products = [], addToCart, addToWishlist }) {

    const navigate = useNavigate();


    return (
        <div className="cards-container">

            <div className="container">


                <h2 className="section-title">Choose Your Type</h2>

                <div className="cardss">
                    {products.length > 0 ? (
                        products.map((item) => (
                            <div
                                className="product-cardd"
                                key={item._id}
                                onClick={() => navigate(`/product/${item._id}`)}
                            >

                                <img
                                    src={getImageUrl(item.Image, "/images/Cam01.png")}
                                    alt="product"
                                    className="product-imgg"
                                />

                                <div className="product-infoo">
                                    <h3>{item.ProductName}</h3>
                                    <p className="pricee">₹{item.Price}</p>

                                    {/* BUTTONS */}
                                    <div
                                        className="card-actionss"
                                        onClick={(e) => e.stopPropagation()} // prevent card click
                                    >
                                        <button
                                            className="cartt"
                                            onClick={() => addToCart(item)}
                                        >
                                            Add to Cart
                                        </button>

                                        <button
                                            className="wishlistt"
                                            onClick={() => addToWishlist(item)}
                                        >
                                            <img src="../public/Images/heartt.png" alt="" />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))
                    ) : (
                        <p className="empty">No products found</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Cards;