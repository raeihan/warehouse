import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button, Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

const ChangeSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formEdit, setFormEdit] = useState({
    nama_supplier: "",
    no_hp: "",
    alamat: "",
    email: "",
    logo_supplier: "",
  });

  const [loading, setLoading] = useState(true);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const getSupplierById = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("supplier")
        .select("*")
        .eq("id_supplier", id)
        .single();
      setFormEdit(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateSupplierById = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    try {
      const { data } = await supabase
        .from("supplier")
        .update({
          nama_supplier: formEdit.nama_supplier,
          no_hp: formEdit.no_hp,
          alamat: formEdit.alamat,
          email: formEdit.email,
          logo_supplier: formEdit.logo_supplier,
        })
        .eq("id_supplier", id)
        .select();
      if (data) {
        Swal.fire({
          title: "Success",
          icon: "success",
        }).then(() => navigate("/supplier"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };

  useEffect(() => {
    getSupplierById();
    const titleElement = document.getElementById("title");
    if (titleElement) {
      titleElement.innerHTML = "Edit Supplier Page";
    }
  }, []);

  return (
    <Layout>
      {loading ? (
        <div className="flex justify-center items-center h-full gap-4">
          <Spinner color="warning" />
          <p className="text-white flex flex-col">Wait a Second</p>
        </div>
      ) : (
        <section id="edit-page" className="p-12">
          <form onSubmit={updateSupplierById}>
            <label>
              <h3 className="text-white pb-1">Supplier Name</h3>
              <input
                name="nama_supplier"
                type="text"
                className="form-input rounded-md w-full px-2"
                value={formEdit.nama_supplier}
                onChange={handleChange}
              />
            </label>
            <label>
              <h3 className="text-white py-1">Telp</h3>
              <input
                name="no_hp"
                type="text"
                className="form-input rounded-md w-full px-2"
                value={formEdit.no_hp}
                onChange={handleChange}
              />
            </label>
            <label>
              <h3 className="text-white py-1">Address</h3>
              <input
                name="alamat"
                type="text"
                className="form-input rounded-md w-full px-2"
                value={formEdit.alamat}
                onChange={handleChange}
              />
            </label>
            <label>
              <h3 className="text-white py-1">Email</h3>
              <input
                name="email"
                type="email"
                className="form-input rounded-md w-full px-2"
                value={formEdit.email}
                onChange={handleChange}
              />
            </label>
            <label>
              <h3 className="text-white py-1">Supplier Logo</h3>
              <input
                name="logo_supplier"
                type="text"
                className="form-input rounded-md w-full px-2"
                value={formEdit.logo_supplier}
                onChange={handleChange}
              />
            </label>
            <div className="text-white py-3 flex gap-4">
              <Button onClick={() => navigate("/supplier")} color="danger">
                Back
              </Button>
              {loadingBtn ? (
                <Button color="primary" disabled>
                  Loading...
                </Button>
              ) : (
                <Button type="submit" color="primary">
                  Change
                </Button>
              )}
            </div>
          </form>
        </section>
      )}
    </Layout>
  );
};

export default ChangeSupplier;
