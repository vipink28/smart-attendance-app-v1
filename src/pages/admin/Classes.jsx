import React, { useEffect, useState } from "react";
import Button from "../../components/form/Button";
import { Link } from "react-router";
import { showToast } from "../../helper/toast-utility";
import { api } from "../../api/api";

const Classes = () => {
  const [allClasses, setAllClasses] = useState(null);
  const fetchClasses = async () => {
    try {
      const res = await api.get("/admin/classes");
      setAllClasses(res.data.classes);
    } catch (error) {
      showToast("error", "Error fetching classes");
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div className="py-5">
      <div className="flex items-center justify-end p-5 bg-emerald-700 rounded-md">
        <Link to="/admin/class/add">Add Class</Link>
      </div>
      <div className="mt-5 bg-emerald-700 p-5 rounded-md">
        <h2 className="mb-10 font-bold text-lg">Classes</h2>
        <div className="grid grid-cols-3 gap-4">
          {allClasses ? (
            allClasses.map((item) => (
              <div key={item._id} className="p-6 rounded-md bg-emerald-900">
                <h3 className="font-bold text-lg mb-3 flex justify-between">
                  {item.name}{" "}
                  <span className="text-sm">
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </h3>
                <h5 className="italic mb-3">[{item.code}]</h5>
                <p>
                  Teacher: {item.teacher ? item.teacher.name : "Not assigned"}
                </p>
                <div className="flex items-center gap-4 mt-5">
                  <Link to={`/admin/class/view/${item._id}`}>View</Link>
                  <Link to={`/admin/class/edit/${item._id}`}>Edit</Link>
                </div>
              </div>
            ))
          ) : (
            <p>No classes to show</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Classes;
