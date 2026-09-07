import React, { useState } from "react";
import CustomInput from "./CustomInput";
import CustomSelect from "./CustomSelect";
import Button from "./Button";
import { showToast } from "../../helper/toast-utility";
import { api } from "../../api/api";
import { XCircle } from "lucide-react";

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
  const initSlot = { day: "Mon", startTime: "09:00", endTime: "10:30" };

  const [formData, setFormData] = useState(null);
  // schedule = [{day:"",startTime:"", endTime:""}, {day:"",startTime:"", endTime:""}]

  const [schedule, setSchedule] = useState([initSlot]);

  // formData - {name: "React JS Batch 12",code: "RJS-12", location: { lat: 30.9010, lng: 75.8573 }}

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "lat" || name === "lng") {
        return {
          ...prev,
          location: {
            ...prev.location,
            [name]: value,
          },
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleAddSchedule = (e) => {
    e.preventDefault();
    if (schedule.length < 7) {
      setSchedule((prev) => {
        return [...prev, initSlot];
      });
    }
  };
  // schedule = [{day}, {day}, {day}, {day}]
  const handleRemoveSlot = (index) => {
    const filteredSchedule = schedule.filter((item, i) => i !== index);
    setSchedule(filteredSchedule);
  };

  // array[1] = "abc"

  const updateSlot = (i, field, value) => {
    const next = [...schedule];
    next[i] = { ...next[i], [field]: value };
    // 0 = {day:"mon", startTime:"09:00", endTime:"10:00"}
    setSchedule(next);
  };

  const handleAddClass = async (e) => {
    e.preventDefault();
    let requestBody = { ...formData, schedule: schedule };
    try {
      await api.post("/admin/classes", requestBody);
      showToast("success", "Class added successfully");
    } catch (error) {
      showToast("error", "Something went wrong");
    }
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
          {schedule.map((slot, i) => (
            <div key={i} className="grid grid-cols-4 gap-4">
              <CustomSelect
                label="Day"
                name="day"
                id="day"
                options={days}
                value={slot.day}
                onChange={(e) => updateSlot(i, "day", e.target.value)}
              />
              <CustomInput
                type="time"
                label="Start Time"
                id="startTime"
                name="startTime"
                value={slot.startTime}
                onChange={(e) => updateSlot(i, "startTime", e.target.value)}
              />
              <CustomInput
                type="time"
                label="End Time"
                id="endTime"
                name="endTime"
                value={slot.endTime}
                onChange={(e) => updateSlot(i, "endTime", e.target.value)}
              />
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => handleRemoveSlot(i)}
              >
                <XCircle />
              </button>
            </div>
          ))}
          <Button
            disabled={schedule.length > 7 ? true : false}
            onClick={handleAddSchedule}
          >
            Add Schedule
          </Button>
        </div>
        <hr className="mb-4 border-emerald-500" />
        <Button onClick={handleAddClass}>Add Class</Button>
      </form>
    </div>
  );
};

export default ClassForm;
