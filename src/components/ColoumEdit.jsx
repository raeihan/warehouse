import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "./icons/EyeIcon";
import { EditIcon } from "./icons/EditIcon";
import { DeleteIcon } from "./icons/DeleteIcon";
import useFormatRupiah from "../hooks/useFormatRupiah";
import useTruncateText from "../hooks/useTruncateText";
import { Link } from "react-router-dom";
import { supabase } from "../utils/SupaClient";
import Swal from "sweetalert2";

const columns = [
  {
    key: "image",
    label: "Image",
  },
  {
    key: "product_name",
    label: "Product_name",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "product_style",
    label: "Product_style",
  },
  {
    key: "stock",
    label: "Stock",
  },
  {
    key: "desc",
    label: "Description",
  },
  {
    key: "action",
    label: "Action",
  },
];

export default function ColumnEdit({ allBarang }) {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 3;

  const pages = Math.ceil(allBarang.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return allBarang.slice(start, end);
  }, [page, allBarang]);

  const { formatRupiah } = useFormatRupiah();

  const { truncateText } = useTruncateText();

  const deleteProductById = async (id) => {
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
            .from("product")
            .delete()
            .eq("id", id)
            .select();
          if (data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
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
      aria-label="Example table with client side pagination"
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
          <TableRow key={item.nama_barang}>
            {(columnKey) => (
              <TableCell key={columnKey}>
                {columnKey === "image" ? (
                  <img
                    src={getKeyValue(item, columnKey)}
                    alt={getKeyValue(item, "product_name")}
                    className="h-16 w-16 object-cover rounded-lg"
                  />
                ) : columnKey === "action" ? (
                  <div className="relative flex items-center gap-5 p-2">
                    <Link to={`/detail/${item.id}`}>
                      <Tooltip content="Detail Barang">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    <Link to={`/item/${item.id}`}>
                      <Tooltip content="Edit Barang">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Tooltip>
                    </Link>
                    <Tooltip color="danger" content="Hapus Barang">
                      <span
                        className="text-lg text-danger cursor-pointer active:opacity-50"
                        onClick={() => deleteProductById(item.id)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                ) : columnKey === "price" ? (
                  formatRupiah(getKeyValue(item, columnKey))
                ) : columnKey === "product_style" ? (
                  <span className="capitalize">
                    {getKeyValue(item, columnKey)}
                  </span>
                ) : columnKey === "desc" ? (
                  truncateText(getKeyValue(item, columnKey), 25)
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
