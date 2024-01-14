import React from "react";
import StatCard from "./StatCard";

function AdminDashBoard() {
  return (
    <div className="p-4">
      {/* Add your admin dashboard content here */}
      <h1 className="text-3xl ">DashBoard</h1>
      <section className="flex flex-row justify-center items-center w-full gap-2 flex-wrap my-4">
        <StatCard statTitle="Products" statValue="10000" />
        <StatCard statTitle="Users" statValue="10000" />
        <StatCard statTitle="Xyz" statValue="10000" />
        <StatCard statTitle="Monthly Revenue" statValue="10000" />
        <StatCard statTitle="Annual Revenue" statValue="10000" />
      </section>
    </div>
  );
}

export default AdminDashBoard;
