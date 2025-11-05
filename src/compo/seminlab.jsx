import React, { useState } from "react";

const ProductList = () => {
  // Predefined array of products
  const products = [
    { id: 1, name: "Notebook", price: 50, category: "Stationery" },
    { id: 2, name: "Pen", price: 20, category: "Stationery" },
    { id: 3, name: "Pencil", price: 10, category: "Stationery" },
    { id: 4, name: "Laptop", price: 60000, category: "Electronics" },
    { id: 5, name: "Headphones", price: 2000, category: "Electronics" },
    { id: 6, name: "Mouse", price: 500, category: "Electronics" },
    { id: 7, name: "School Bag", price: 800, category: "Bags" },
    { id: 8, name: "Handbag", price: 1200, category: "Bags" },
    { id: 9, name: "Travel Bag", price: 1500, category: "Bags" },
  ]; 

  // useState to manage the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Product List with Category Filter</h1>

      {/* Dropdown to filter products by category */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="category" style={{ marginRight: "10px", fontWeight: "bold" }}>
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: "8px", fontSize: "16px", borderRadius: "4px" }}
        >
          <option value="All">All</option>
          <option value="Stationery">Stationery</option>
          <option value="Bags">Bags</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>

      {/* Display filtered products using map() */}
      <div>
        <h2>Products ({filteredProducts.length})</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              style={{
                padding: "10px",
                margin: "5px 0",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <strong>{product.name}</strong> - ₹{product.price} 
              <span style={{ color: "#666", marginLeft: "10px" }}>
                ({product.category})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;