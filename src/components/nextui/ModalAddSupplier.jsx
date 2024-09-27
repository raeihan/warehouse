import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { supabase } from "../../utils/SupaClient";
import Swal from "sweetalert2";

export default function ModalAddSupplier({ isOpen, onOpenChange }) {
  const [formData, setFormData] = useState({
    nama_supplier: "",
    no_hp: "",
    alamat: "",
    email: "",
    logo_supplier: "",
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
        .from("supplier")
        .insert(formData)
        .select();

      if (data) {
        Swal.fire({
          title: "Supplier added successfully",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      } else if (error) {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <div>
            <ModalHeader className="flex flex-col gap-1">
              Add Supplier
            </ModalHeader>
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <label>
                  Supplier Name
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="nama_supplier"
                    value={formData.nama_supplier}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Telp
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="no_hp"
                    value={formData.no_hp}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Address
                  <Textarea
                    radius="sm"
                    required
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Email
                  <Input
                    type="email"
                    radius="sm"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Supplier Logo
                  <Input
                    type="text"
                    radius="sm"
                    required
                    name="logo_supplier"
                    value={formData.logo_supplier}
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
