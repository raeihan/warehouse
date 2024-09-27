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
    try {
      const { data, error } = await supabase
        .from("product")
        .insert(formData)
        .select();
      if (data) {
        Swal.fire({
          title: "Add Succesfully",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log(error);
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
                    type="text"
                    radius="sm"
                    required
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
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
