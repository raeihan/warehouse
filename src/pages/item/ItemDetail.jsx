import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../utils/SupaClient";
import { useParams, useNavigate } from "react-router-dom";

const ItemDetail = () => {
  const [getBarangById, setGetBarangById] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const getIdBarang = async () => {
    try {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      setGetBarangById(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getIdBarang();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!getBarangById) {
    return <p>Item not found.</p>;
  }

  const { product_name, image, price, product_style, stock, desc } =
    getBarangById;

  return (
    <Layout>
      <div className="flex justify-center items-center p-10">
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200 w-full md:w-3/4 lg:w-1/2">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 flex-shrink-0">
              <img
                src={image}
                alt={product_name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-2xl font-bold mb-4">{product_name}</h1>

              <div className="mb-4">
                <strong>Harga: </strong>
                <span className="text-xl font-semibold text-green-500">
                  Rp {Number(price).toLocaleString("id-ID")}
                </span>
              </div>

              <div className="mb-4">
                <strong>Jenis Barang: </strong>
                <span className="capitalize">{product_style}</span>
              </div>

              <div className="mb-4">
                <strong>Stok: </strong>
                <span>{stock}</span>
              </div>

              <div className="mb-4">
                <strong>Deskripsi: </strong>
                <p className="text-justify">{desc}</p>
              </div>

              <button
                onClick={() => navigate("/table")}
                className="mt-4 px-4 py-2 bg-green-700 text-yellow-200 rounded hover:bg-green-800 transition-all duration-300"
              >Back</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
