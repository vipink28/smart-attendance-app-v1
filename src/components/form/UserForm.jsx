import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";
import Button from "./Button";
import { api } from "../../api/api";

const UserForm = ({ isUpdate, data }) => {
  const roleOptions = [
    { value: "admin", text: "Admin" },
    { value: "teacher", text: "Teacher" },
    { value: "student", text: "Student" },
  ];

  const [formData, setFormData] = useState(null);
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/users", formData);
      alert("user added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="py-2">
      <h2 className="text-xl font-medium mb-6">
        {isUpdate ? "Update" : "Add"} User
      </h2>
      <form>
        {!isUpdate && (
          <CustomSelect
            label="Role"
            name="role"
            id="role"
            options={roleOptions}
            onChange={handleInput}
          />
        )}

        <CustomInput
          name="name"
          id="name"
          label="Name"
          value={data.name}
          onChange={handleInput}
        />
        {isUpdate ? (
          <>
            <CustomInput
              name="phone"
              id="phone"
              label="Phone"
              type="number"
              min="10"
              max="10"
              value={data.phone}
              onChange={handleInput}
            />

            <CustomInput
              name={data.role === "student" ? "studentId" : "employeeId"}
              id={data.role === "student" ? "studentId" : "employeeId"}
              label={data.role === "student" ? "Student Id" : "Employee Id"}
              value={data.role === "student" ? data.studentId : data.employeeId}
              onChange={handleInput}
            />
          </>
        ) : (
          <>
            <CustomInput
              name="email"
              id="email"
              label="Email"
              type="email"
              onChange={handleInput}
            />
            <CustomInput
              name="password"
              id="password"
              type="password"
              label="Password"
              onChange={handleInput}
            />
          </>
        )}
        {isUpdate ? (
          <Button onClick={handleAddUser}>Update User</Button>
        ) : (
          <Button onClick={handleAddUser}>Add User</Button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
