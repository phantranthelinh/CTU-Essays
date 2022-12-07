import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Add from "../components/staffTypes/Add";

const AddStaffType = () => {
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

export default AddStaffType;
