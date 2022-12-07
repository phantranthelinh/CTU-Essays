import React from 'react'
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Edit from "../components/staffTypes/Edit"
const StaffTypeEditScreen = ({match}) => {
  const staffTypeId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <Edit staffTypeId={staffTypeId} />
      </main>
    </>
  )
}

export default StaffTypeEditScreen