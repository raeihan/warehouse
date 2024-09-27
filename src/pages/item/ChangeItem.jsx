import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { Button, Spinner } from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

const ChangeItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formEdit, setFormEdit] = useState({
    product_name: "",
    price: 0,
    product_style: "",
    stock: 0,
    desc: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);

  const [loadingBtn, setLoadingBtn] = useState(false);

  const handleChange = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };
  const getProductById = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();
      setFormEdit(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const updateProductById = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    try {
      const { data } = await supabase
        .from("product")
        .update({
          product_name: formEdit.product_name,
          price: formEdit.price,
          product_style: formEdit.product_style,
          stock: formEdit.stock,
          desc: formEdit.desc,
          image: formEdit.image,
        })
        .eq("id", id)
        .select();
      if (data) {
        Swal.fire({
          title: "Succes",
          icon: "success",
        }).then(() => navigate("/table"));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingBtn(false);
    }
  };
  useEffect(() => {
    getProductById();
    const titleElement = document.getElementById("title");
    if (titleElement) {
      titleElement.innerHTML = "Edit Product Page";
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
          <form onSubmit={updateProductById}>
            <label>
              <h3 className="text-white pb-1">Product Name</h3>
              <input
                name="product_name"
                type="text"
                className="form-input rounded-md w-full px-2"
                value={formEdit.product_name}
                onChange={handleChange}
              />
            </label>
            <label>
              <h3 className="text-white py-1">Price</h3>
              <input
                name="price"
                type="number"
                className="form-input rounded-md w-full px-2"
                value={formEdit.price}
                onChange={handleChange}
              />
            </label>
            <label>
              <h3 className="text-white py-1">Product Style</h3>
              <select
                name="product_style"
                className="form-input rounded-md w-full px-2"
                onChange={handleChange}
              >
                <option value="makanan">Makanan</option>
                <option value="minuman">Minuman</option>
                <option value="kosmetik">Kosmetik</option>
              </select>
            </label>
            <label>
              <h3 className="text-white py-1">Stock</h3>
              <input
                name="stock"
                type="number"
                className="form-input rounded-md w-full px-2"
                value={formEdit.stock}
                onChange={handleChange}
              />
            </label>
            <label>
              <h3 className="text-white py-1">Description</h3>
              <textarea
                name="desc"
                className="form-input rounded-md w-full px-2"
                onChange={handleChange}
              >
                {formEdit.desc}
              </textarea>
            </label>
            <label>
              <h3 className="text-white py-1">Image</h3>
              <input
                name="image"
                type="text"
                className="form-input rounded-md w-full px-2"
                value={formEdit.image}
                onChange={handleChange}
              />
            </label>
            <div className="text-white py-3 flex gap-4">
              <Button onClick={() => navigate("/table")} color="danger">
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

export default ChangeItem;
