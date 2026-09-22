import React, { useEffect, useState } from "react";
import { showToast } from "../../helper/toast-utility";
import { api } from "../../api/api";

const StudentDashboard = () => {
  const [timetable, setTimeTable] = useState(null);
  const fetchTimeTable = async () => {
    try {
      const res = await api.get("/student/timetable");
      setTimeTable(res.data);
    } catch (error) {
      showToast("error", "Failed to fetch timetable.");
    }
  };

  useEffect(() => {
    fetchTimeTable();
  }, []);

  return (
    <div>
      {timetable && (
        <>
          <h1>Today: {timetable.today}</h1>
          <div className="py-5 grid col-span-3">
            {timetable?.clasess?.length === 0 ? (
              <p>No class for today</p>
            ) : (
              timetable.classes.map((cls) => (
                <div key={cls.classId} className="p-3">
                  <h2>{cls.name}</h2>
                  <h2>{cls.teacher.name}</h2>
                  <p>{cls.liveSessionId ? "Live" : "Closed"}</p>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentDashboard;
