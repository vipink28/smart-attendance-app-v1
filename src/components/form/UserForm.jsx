import React, { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import CustomInput from "./CustomInput";
import Button from "./Button";
import { api } from "../../api/api";
import { showToast } from "../../helper/toast-utility";

const UserForm = ({ isUpdate, data, fetchUsers, onClose }) => {
  const init = {
    role: "",
    name: "",
    email: "",
    password: "",
  };

  const roleOptions = [
    { value: "admin", text: "Admin" },
    { value: "teacher", text: "Teacher" },
    { value: "student", text: "Student" },
  ];

  const [formData, setFormData] = useState(() => {
    if (data) {
      let roleProp = data.role === "student" ? "studentId" : "employeeId";
      return { ...init, [roleProp]: "", phone: "" };
    }
    return { ...init };
  });
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
      showToast("success", "User added successfully");
      fetchUsers(res.data.user.role);
      onClose(false);
    } catch (error) {
      console.log(error);
      showToast("error", "Failed to add user ");
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const res = await api.put(`/admin/users/${id}`, formData);
      showToast("success", "user updated successfully");
      fetchUsers(res.data.user.role);
      onClose(false);
    } catch (error) {
      console.log(error);
      showToast("error", "failed to udpate user");
    }
  };

  useEffect(() => {
    if (isUpdate && data) {
      setFormData((prev) => ({
        ...prev,
        ...data,
      }));
    }
  }, [isUpdate, data]);

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
            value={formData.role}
            options={roleOptions}
            onChange={handleInput}
          />
        )}

        <CustomInput
          name="name"
          id="name"
          label="Name"
          value={formData.name}
          onChange={handleInput}
        />
        {isUpdate ? (
          <>
            <CustomInput
              name="phone"
              id="phone"
              label="Phone"
              type="number"
              value={formData.phone}
              onChange={handleInput}
            />

            <CustomInput
              name={data.role === "student" ? "studentId" : "employeeId"}
              id={data.role === "student" ? "studentId" : "employeeId"}
              label={data.role === "student" ? "Student Id" : "Employee Id"}
              value={
                data.role === "student"
                  ? formData.studentId
                  : formData.employeeId
              }
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
              value={formData.email}
              onChange={handleInput}
            />
            <CustomInput
              name="password"
              id="password"
              type="password"
              label="Password"
              value={formData.password}
              onChange={handleInput}
            />
          </>
        )}
        {isUpdate ? (
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleUpdateUser(formData._id);
            }}
          >
            Update User
          </Button>
        ) : (
          <Button onClick={handleAddUser}>Add User</Button>
        )}
      </form>
    </div>
  );
};

export default UserForm;
