import React, { useState } from "react";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";
import Button from "./Button";
import { api } from "../../api/api";

const UserForm = () => {
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
      <h2 className="text-xl font-medium mb-6">Add User</h2>
      <form>
        <CustomSelect
          label="Role"
          name="role"
          id="role"
          options={roleOptions}
          onChange={handleInput}
        />
        <CustomInput
          name="name"
          id="name"
          label="Name"
          onChange={handleInput}
        />
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

        <Button onClick={handleAddUser}>Add User</Button>
      </form>
    </div>
  );
};

export default UserForm;
