import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient"; // Pastikan kamu sudah mengatur supabaseClient
import Layout from "../components/Layout";

const AllProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      let { data: products, error } = await supabase
        .from("product")
        .select("*");

      if (error) console.log("Error fetching products:", error);
      else setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="grid grid-cols-2 p-8 max-md:p-3 max-md:my-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-yellow-200 shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover p-5"
              />
              <div className="p-4 text-green-700">
                <h2 className="text-xl font-bold">{product.product_name}</h2>
                <p className="text-slate-800">{product.desc}</p>
                <p className="text-lg font-semibold mt-2">Rp{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllProduct;
