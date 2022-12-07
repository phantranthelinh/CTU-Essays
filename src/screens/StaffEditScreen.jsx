import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Edit from "../components/staffs/Edit";
const StaffEditScreen = ({match}) => {
  const staffId = match.params.id
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Edit staffId={staffId} />
      </main>
    </>
  );
};

export default StaffEditScreen;
