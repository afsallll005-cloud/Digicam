import React, { useEffect, useState } from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiUrl, getImageUrl } from "../../../config/api";
import './Restoreproduct.css'

function Restoreproduct() {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ FETCH DELETED PRODUCTS
  useEffect(() => {
    axios.get(getApiUrl("/Restoreproduct"))
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // ✅ PERMANENT DELETE
  const deletePermanent = async (id) => {
    try {
      await axios.delete(getApiUrl(`/permanentDelete/${id}`));
      setProducts(products.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ RESTORE PRODUCT
  const restoreProduct = async (id) => {
    try {
      await axios.put(getApiUrl(`/restore/${id}`));
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
            <Link to="/Listproducts">All Products</Link>
            <Link to="/Addproducts">Add Products</Link>

            <a>Set Hero</a>
            <a>Set Thumbnail</a>
            <a>Set Deal Area</a>
            <a>Settings</a>
          </div>

          <div className="top-right">
            <input type="text" placeholder="Search" />
            <button className="download" onClick={() => navigate("/Listproducts")}>
              Back
            </button>
          </div>
        </div>

        <h1>Restore Products</h1>

        {/* PRODUCT CARDS */}
        <div className="cards">
          {products.map((item) => (
            <div className="product-card" key={item._id}>

              <img
                src={getImageUrl(item.Image)}
                alt="product"
                className="product-img"
              />

              <div className="product-info">
                <h3>{item.ProductName}</h3>

                <p className="category">{item.Category}</p>
                <p className="discription">{item.Description}</p>
                <p className="price">₹{item.Price}</p>

                {/* ACTION BUTTONS */}
                <div className="card-actions">

                  <button
                    className="deletePermanent-btn"
                    onClick={() => deletePermanent(item._id)}
                  >
                    Delete Permanent
                  </button>

                  <button
                    className="restoreProduct-btn"
                    onClick={() => restoreProduct(item._id)}
                  >
                    Restore
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

export default Restoreproduct;