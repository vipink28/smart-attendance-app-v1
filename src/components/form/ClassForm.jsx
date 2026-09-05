import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import Button from "./Button";

const ClassForm = () => {
  const days = [
    { value: "Mon", text: "Mon" },
    { value: "Tue", text: "Tue" },
    { value: "Wed", text: "Wed" },
    { value: "Thu", text: "Thu" },
    { value: "Fri", text: "Fri" },
    { value: "Sat", text: "Sat" },
    { value: "Sun", text: "Sun" },
  ];
  const [formData, setFormData] = useState(null);
  // formData - {name: "React JS Batch 12",code: "RJS-12", location: { lat: 30.9010, lng: 75.8573 }}

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 rounded-md bg-emerald-900 border border-emerald-400 w-full max-w-lg ">
      <h2 className="font-semibold mb-6">Add Class</h2>
      <form>
        <CustomInput
          label="Name"
          id="name"
          name="name"
          onChange={handleInput}
        />
        <CustomInput
          label="Code"
          id="code"
          name="code"
          onChange={handleInput}
        />
        <div className="flex gap-4">
          <CustomInput
            label="Latitude"
            id="lat"
            name="lat"
            onChange={handleInput}
          />
          <CustomInput
            label="Longitude"
            id="lng"
            name="lng"
            onChange={handleInput}
          />
        </div>
        <div className="py-6">
          <p className="mb-4">Schedule</p>
          <div className="flex gap-4">
            <CustomSelect label="Day" name="day" id="day" options={days} />
            <CustomInput label="Start Time" id="startTime" name="startTime" />
            <CustomInput label="End Time" id="endTime" name="endTime" />
          </div>
          <Button>Add Schedule</Button>
        </div>
        <hr className="mb-4 border-emerald-500" />
        <Button>Add Class</Button>
      </form>
    </div>
  );
};

export default ClassForm;
