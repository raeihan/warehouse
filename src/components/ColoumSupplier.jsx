import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const columns = [
  {
    key: "logo_supplier",
    label: "Logo",
  },
  {
    key: "nama_supplier",
    label: "Nama Supplier",
  },
  {
    key: "no_hp",
    label: "No HP",
  },
  {
    key: "alamat",
    label: "Alamat",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function ColoumSupplier() {
  const [suppliers, setSuppliers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 3;

  React.useEffect(() => {
    const fetchSuppliers = async () => {
      const { data, error } = await supabase
        .from("supplier")
        .select("*");
      if (error) {
        console.log("Error fetching suppliers:", error.message);
      } else {
        setSuppliers(data);
      }
    };
    fetchSuppliers();
  }, []);

  const pages = Math.ceil(suppliers.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return suppliers.slice(start, end);
  }, [page, suppliers]);

  const deleteSupplierById = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await supabase
            .from("supplier")
            .delete()
            .eq("id_supplier", id)
            .select();
          if (data) {
            Swal.fire({
              title: "Deleted!",
              text: "Supplier has been deleted.",
              icon: "success",
            }).then(() => window.location.reload())
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table
      aria-label="Supplier Table with Pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="warning"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        {columns.map((col) => (
          <TableColumn key={col.key}>{col.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id_supplier}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "logo_supplier" ? (
                  <img
                    src={item.logo_supplier}
                    alt={item.nama_supplier}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                ) : columnKey === "action" ? (
                  <div className="relative flex items-center gap-5 p-2">
                    {/* Link to detail page */}
                    <Link to={`/detailsupplier/${item.id_supplier}`}>
                      <Tooltip content="View Supplier">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    <Link to={`/supplier/${item.id_supplier}`}>
                    <Tooltip content="Edit Supplier">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                    </Link>
                    <Tooltip color="danger" content="Delete Supplier">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => deleteSupplierById(item.id_supplier)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                ) : (
                  item[columnKey]
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
