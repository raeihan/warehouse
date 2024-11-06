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
import Login from "./auth/Login";
import AuthAdmin from "./auth/AuthAdmin";
import Profile from "./pages/item/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/table" element={<TableBarang />} />

        <Route path="/supplier" element={<Supplier />} />
        <Route path="/allproduct" element={<AllProduct />} />
        <Route path="/detail/:id" element={<ItemDetail />} />
        <Route path="/detailsupplier/:id" element={<SupplierDetail />} />
        <Route path="/supplier/:id" element={<ChangeSupplier />} />

        <Route element={<AuthAdmin />}>
          <Route path="/edit/:id" element={<ChangeItem />} />
          <Route path="/item/:id" element={<ChangeItem />} />
          <Route path="/add-items" element={<AddItems />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
