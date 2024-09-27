import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "../utils/SupaClient";
import LoadingSkeleton from "../components/nextui/LoadingSkeleton";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [product, setProduct] = useState(0);
  const [jenisBarangCount, setJenisBarangCount] = useState({});
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  
  const totalBarang = async () => {
    setLoadingSkeleton(true);
    try {
      const countTotalBarang = supabase
        .from("product")
        .select("*", { count: "exact", head: true });
      const jenisBarang = ["makanan", "minuman", "kosmetik"];

      const countTotalJenisBarang = jenisBarang.map((jenis) =>
        supabase
          .from("product")
          .select("*", { count: "exact", head: true })
          .eq("product_style", jenis)
      );

      const results = await Promise.all([
        countTotalBarang,
        ...countTotalJenisBarang,
      ]);

      const totalCount = results[0].count;
      const counts = {};
      results.slice(1).forEach((result, index) => {
        counts[jenisBarang[index]] = result.count;
      });

      setProduct(totalCount);
      setJenisBarangCount(counts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSkeleton(false);
    }
  };

  useEffect(() => {
    totalBarang();
  }, []);

  return (
    <Layout>
      <section id="dashboard" className="p-5 md:p-10">
        <div className="bg-blue-700 text-white rounded-lg h-48 p-5 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-4xl font-semibold">
            Selamat Datang Admin
          </h2>
          <p className="text-sm md:text-lg mt-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora,
            ipsam.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {loadingSkeleton ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            <>
              <div className="p-5 md:p-8 bg-red-700 text-white h-40 md:h-44 rounded-lg flex flex-col justify-center">
                <h2 className="text-lg md:text-2xl font-bold">All Foods</h2>
                <p className="text-3xl md:text-5xl font-bold mt-2">
                  {jenisBarangCount.makanan} Foods
                </p>
              </div>
              <div className="p-5 md:p-8 bg-yellow-400 text-white h-40 md:h-44 rounded-lg flex flex-col justify-center">
                <h2 className="text-lg md:text-2xl font-bold">All Drinks</h2>
                <p className="text-3xl md:text-5xl font-bold mt-2">
                  {jenisBarangCount.minuman} Drinks
                </p>
              </div>
              <div className="p-5 md:p-8 bg-orange-600 text-white h-40 md:h-44 rounded-lg flex flex-col justify-center">
                <h2 className="text-lg md:text-2xl font-bold">All Cosmetics</h2>
                <p className="text-3xl md:text-5xl font-bold mt-2">
                  {jenisBarangCount.kosmetik} Cosmetics
                </p>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
