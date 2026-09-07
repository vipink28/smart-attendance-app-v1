import React from "react";
import { Navigate, useParams } from "react-router";
import ClassForm from "../../components/form/ClassForm";

const Class = () => {
  //useParams()
  const { action } = useParams();

  return (
    <div>
      <div className="mt-10 flex flex-col justify-center items-center">
        {action === "add" ? (
          <ClassForm />
        ) : action === "edit" ? (
          <ClassForm />
        ) : action === "view" ? (
          <div>View</div>
        ) : (
          <div>No data</div>
        )}
      </div>
    </div>
  );
};

export default Class;
