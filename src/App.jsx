import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TableBarang from "./pages/TableBarang";
import ItemDetail from "./pages/item/ItemDetail";
import AddItems from "./pages/item/AddItems";
import ChangeItem from "./pages/item/ChangeItem";
import Supplier from "./pages/Supplier";
import ChangeSupplier from "./pages/item/ChangeSupplier";
import SupplierDetail from "./pages/item/SupplierDetail";
import AllProduct from "./pages/AllProduct";


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/table" element={<TableBarang/>} />
        <Route path="/supplier" element={<Supplier/>} />
        <Route path="/allproduct" element={<AllProduct/>} />
        <Route path="/detail/:id" element={<ItemDetail/>} />
        <Route path="/detailsupplier/:id" element={<SupplierDetail/>} />
        <Route path="/add-items" element={<AddItems />} />
        <Route path="/item/:id" element={<ChangeItem />} />
        <Route path="/supplier/:id" element={<ChangeSupplier />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
