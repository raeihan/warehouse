import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import ColoumEdit from "../components/ColoumEdit";
import { supabase } from "../utils/SupaClient";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import ModalAddSupplier from "../components/nextui/ModalAddSupplier";
import ModalAddBarang from "../components/nextui/ModalAddBarang";

const TableBarang = () => {
  const [allBarang, setAllBarang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getAllBarang = async () => {
    try {
      setLoading(true);

      let query = supabase
        .from("product")
        .select("*")
        .order("id", { ascending: false });

      if (category) {
        query = query.eq("product_style", category);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setAllBarang(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBarang();
  }, []);

  useEffect(() => {
    getAllBarang();
  }, [category]);

  return (
    <Layout>
      <section id="table-barang" className="p-8">
        <div className="flex flex-col md:flex-row md:justify-between mb-1">
          <Button color="warning" variant="ghost" onPress={onOpen}>
            + Add Product
          </Button>
          <ModalAddBarang
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          />
          <div className="mb-5 max-md:mt-5">
            <label htmlFor="category" className="mr-2 text-white">
              Filter Kategori:
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="" className="max-md:mt-5">All Categories</option>
              <option value="makanan">Foods</option>
              <option value="minuman">Drinks</option>
              <option value="kosmetik">Cosmetics</option>
            </select>
          </div>
        </div>

        {loading ? (
            <div className="flex justify-center items-center h-full gap-4">
              <Spinner color="warning" />
              <p className="text-white flex flex-col">Wait a Second</p>
            </div>
          ) : (
            <ColoumEdit allBarang={allBarang} />
          )}
      </section>
    </Layout>
  );
};

export default TableBarang;
