import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const [state, setState] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await axios
      .get("https://profitmodel-server.herokuapp.com/api/brand")
      .then((d) => {
        return d.data.data;
      })
      .catch((error) => console.log(error));

    const product = await axios
      .post("https://profitmodel-server.herokuapp.com/api/product", {
        name: "Muhammaddiyor",
        description: "ZADACHA",
        priceList: [
          { type: "SALE", price: 200 },
          { type: "SALE", price: 200 },
        ],
        categoryId: 2,
        brandId: 1,
        measurementId: 1,
        discount: 15,
        photos: ["image.png"],
      })
      .then((d) => {
        return d.data.data;
      })
      .catch((error) => console.log(error));
    console.log(product);
  };

  return (
    <button className="btn btn-primary" onClick={handleSubmit}>
      products
    </button>
  );
}
