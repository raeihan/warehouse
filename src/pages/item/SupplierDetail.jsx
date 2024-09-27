import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { supabase } from "../../utils/SupaClient";
import { useParams, useNavigate } from "react-router-dom";

const SupplierDetail = () => {
  const [getSupplierById, setGetSupplierById] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const getSupplierByIdFunc = async () => {
    try {
      const { data, error } = await supabase
        .from("supplier")
        .select("*")
        .eq("id_supplier", id)
        .single();

      if (error) {
        throw error;
      }

      setGetSupplierById(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSupplierByIdFunc();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!getSupplierById) {
    return <p>Supplier not found.</p>;
  }

  const { nama_supplier, logo_supplier, no_hp, alamat, email } = getSupplierById;

  return (
    <Layout>
      <div className="flex justify-center items-center p-10">
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200 w-full md:w-3/4 lg:w-1/2">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 flex-shrink-0">
              <img
                src={logo_supplier}
                alt={nama_supplier}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-2xl font-bold mb-4">{nama_supplier}</h1>

              <div className="mb-4">
                <strong>No HP: </strong>
                <span className="text-lg font-medium">{no_hp}</span>
              </div>

              <div className="mb-4">
                <strong>Alamat: </strong>
                <p className="text-justify">{alamat}</p>
              </div>

              <div className="mb-4">
                <strong>Email: </strong>
                <p>{email}</p>
              </div>

              <button
                onClick={() => navigate("/supplier")}
                className="mt-4 px-4 py-2 bg-green-700 text-yellow-200 rounded hover:bg-green-800 transition-all duration-300"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupplierDetail;
