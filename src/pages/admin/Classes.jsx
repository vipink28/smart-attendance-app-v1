import React from "react";
import Button from "../../components/form/Button";
import { Link } from "react-router";

const Classes = () => {
  return (
    <div className="py-5">
      <div className="flex items-center justify-end p-5 bg-emerald-700 rounded-md">
        <Link to="/admin/class/add">Add Class</Link>
      </div>
      <div className="mt-5 bg-emerald-700 p-5 rounded-md">List</div>
    </div>
  );
};

export default Classes;
