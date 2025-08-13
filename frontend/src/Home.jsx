import React from "react";

const Home = () => {
  const product = {
    name: "Apple Watch Series 10 GPS, Aluminium Case, Starlight Sport",
    price: 59900,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MKMX3_VW_34FR+watch-41-alum-starlight-cell-7s_VW_34FR_WF_CO+watch-face-41-starlight-sport-starlight_VW_34FR_WF_CO?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1632171047000",
  };

  const handleCheckout = async () => {
    const res = await fetch("http://localhost:8000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        items: [
          {
            name: product.name,
            price: product.price,
            quantity: 1
          }
        ]
      })
    });

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div className="min-h-screen flex items-center bg-gray-100 justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <img class="p-8 rounded-t-lg" src="https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/s10-case-unselect-gallery-1-202503_GEO_IN_FMT_WHH?wid=752&hei=720&fmt=jpeg&qlt=90&.v=1740185545832" alt="product image" />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h2>

        <p className="text-xl font-bold text-gray-900 mb-4">
          ₹{product.price}
        </p>

        <button
          onClick={handleCheckout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          style={{
            backgroundColor: "#1d4ed8", cursor: "pointer", border: "none"}}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Home;
