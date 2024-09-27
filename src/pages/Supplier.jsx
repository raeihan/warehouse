import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { supabase } from "../utils/SupaClient";
import { Button, Spinner, useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import ColoumSupplier from "../components/ColoumSupplier";
import ModalAddSupplier from "../components/nextui/ModalAddSupplier";

const Supplier = () => {
    const [allBarang, setAllBarang] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
  
    const getAllBarang = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("supplier")
          .select("*")
          .order("id", { ascending: false });
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
  
    return (
      <Layout>
        <section id="table-barang" className="p-8">
          <div className="flex justify-between mb-5">
            <Button color="warning" variant="ghost" onPress={onOpen}>
              + Add Supplier
            </Button>
            <ModalAddSupplier
              isOpen={isOpen}
              onOpen={onOpen}
              onOpenChange={onOpenChange}
            />
          </div>
  
          {loading ? (
            <div className="flex justify-center items-center h-full gap-4">
              <Spinner color="warning" />
              <p className="text-white flex flex-col">Wait a Second</p>
            </div>
          ) : (
            <ColoumSupplier allBarang={allBarang} />
          )}
        </section>
      </Layout>
    );
  };

export default Supplier
