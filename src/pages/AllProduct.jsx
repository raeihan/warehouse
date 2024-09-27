import React, { useEffect, useState } from "react";
import { supabase } from "../utils/SupaClient";
import { Spinner} from "@nextui-org/react";
import Layout from "../components/Layout";


const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllBarang = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .order("id", { ascending: false });
      if (error) {
        throw error;
      }

      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBarang();
  }, []);

  return (
    <Layout>
      {!loading ? (
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
                <p className="text-lg font-semibold mt-2">
                  Rp{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      ) : (
        <div className="flex justify-center items-center h-full gap-4">
          <Spinner color="warning" />
          <p className="text-white flex flex-col">Wait a Second</p>
        </div>
      )}
    </Layout>
  );
};

export default AllProduct;
