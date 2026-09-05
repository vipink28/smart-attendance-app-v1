import React from "react";
import { useParams } from "react-router";
import ClassForm from "../../components/form/ClassForm";

const Class = () => {
  //useParams()
  const { action } = useParams();

  return (
    <div>
      <div className="mt-10 flex flex-col justify-center items-center">
        <ClassForm />
      </div>
    </div>
  );
};

export default Class;
