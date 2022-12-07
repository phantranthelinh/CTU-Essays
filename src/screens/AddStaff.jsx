import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Add from "../components/staffs/Add";

const AddStaff = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Add />
      </main>
    </>
  );
};

export default AddStaff;
