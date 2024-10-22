import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

export default function ModalAddBarang({ isOpen, onOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",
    product_style: "",
    stock: "",
    desc: "",
    image: "",
  });
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const { data, error } = await supabase
    //     .from("product")
    //     .insert(formData)
    //     .select();
    //   if (data) {
    //     Swal.fire({
    //       title: "Add Succesfully",
    //       icon: "success",
    //     }).then(() => {
    //       window.location.reload();
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    try {
      const { data: uploadImage, error: uploadError } = await supabase.storage
        .from("imageProduct")
        .upload(`product/${formData.image.name}`, formData.image, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw uploadError;
      }
      if (uploadImage) {
        const imageUrl = supabase.storage
          .from("imageProduct")
          .getPublicUrl(`product/${formData.image.name}`).data.publicUrl;
        const updatedFormData = {
          ...formData,
          image: imageUrl,
        };

        const { data, error } = await supabase.from("product").insert(updatedFormData).select()

        if (error) {
          throw error;
        }
        if (data) {
          Swal.fire({
            title: "Input Success",
            text: "Data success to input",
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Data was error to input",
        icon: "error",
      });
    }
  };

  const itemType = [
    {
      key: "makanan",
      value: "Makanan",
    },
    {
      key: "minuman",
      value: "Minuman",
    },
    {
      key: "kosmetik",
      value: "Kosmetik",
    },
  ];

  const handleImage = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Add Product
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <label>
                  Product Name
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Price
                  <Input
                    type="number"
                    radius="sm"
                    required
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Product Style
                  <Select
                    required
                    radius="sm"
                    name="product_style"
                    onChange={handleChange}
                  >
                    {itemType.map((item) => (
                      <SelectItem key={item.key} value={item.value}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </Select>
                </label>
                <label>
                  Stock
                  <Input
                    type="number"
                    radius="sm"
                    required
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Descriptions
                  <Textarea
                    radius="sm"
                    required
                    name="desc"
                    value={formData.desc}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Image
                  <Input
                    type="file"
                    required
                    name="image"
                    onChange={handleImage}
                    className="w-full border border-black p-2 rounded-md"
                  />
                </label>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" type="submit">
                  Add
                </Button>
              </ModalFooter>
            </form>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
