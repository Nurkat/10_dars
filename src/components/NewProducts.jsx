import React, { useState, useEffect } from "react";
import "../App.css";
import Moon from "../assets/moon.svg";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchProducts = () => {
      fetch("https://api.escuelajs.co/api/v1/products")
        .then((resProductsult) => {
          if (!resProductsult) {
            throw new Error("Error");
          }
          return resProductsult.json();
        })
        .then((data) => {
          setProducts(data);
          setLoading(false);
          localStorage.setItem("products", JSON.stringify(data));
        })
        .catch((error) => {
          console.error("File consist Problem:", error);
          setLoading(false);
        });
    };

    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, []);

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  if (loading) {
    return (
      <div className="text-center text-[30px] color-[#555]">Loading...</div>
    );
  }

  const resProducts = products.slice(0, 20);

  return (
    <div
      className={`w-[1100px] mx-auto p-[20px] rounded-[20px] shadow-lg ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <button
        className="mb-[20px] p-[10px] rounded-[5px] border-[1px] border-gray-400 "
        onClick={toggleDarkMode}
      >
        <img src={Moon} alt="Mode Icon" className="w-[30px] h-[30px]   " />
      </button>
      <h1 className="text-center mb-[20px] text-[40px] text-gray-400  ">
        Products
      </h1>
      <ul className="flex flex-wrap justify-around">
        {resProducts.map((product) => (
          <li
            key={product.id}
            className={`mt-[20px] flex items-center w-[300px] p-[15px] shadow-lg  transition-all hover:bg-${
              darkMode ? "[#333]" : "[#f0f0f0]"
            } rounded-[20px]`}
          >
            <div>
              {product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="object-cover rounded-[8px] mr-[20px]"
                />
              ) : (
                <div className="no-image">Image does not exist</div>
              )}
              <div className="product-data">
                <strong className="my-[20px] text-[20px]">
                  {product.title}
                </strong>
                <p className="mt-[5px] text-[15px] text-[#333] ">
                  Price: ${product.price}
                </p>
                <button
                  className="mt-[20px] w-[100%] bg-gray-600 text-white p-[10px] text-[18px] rounded-[20px] transition-all hover:bg-[#FF0000]"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete    
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
