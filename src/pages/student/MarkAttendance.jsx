import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../../api/api";
import { showToast } from "../../helper/toast-utility";

const MarkAttendance = () => {
  const { tokenid } = useParams();
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const getGeoLocation = () => {
    return new Promise((resolve, reject) => {
      if (!("geolocation" in navigator)) {
        reject(new Error("Geolocation is not supported by this browser."));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          reject(
            new Error(`Error Code: ${error.code}, Message: ${error.message}`),
          );
        },
      );
    });
  };

  const markAttendance = async () => {
    const { lat, lng } = await getGeoLocation();
    const requestBody = {
      token: tokenid,
      lat: lat,
      lng: lng,
    };

    try {
      const res = await api.post("/attendance/scan", requestBody);
      setAttendanceStatus(res.data);
      showToast("Success", "Attendance Marked");
    } catch (error) {
      showToast("Error", "Failed to mark attendance");
    }
  };

  useEffect(() => {
    if (tokenid) {
      markAttendance();
    }
  }, [tokenid]);

  if (!tokenid)
    return (
      <div className="py-10">
        <p>Please scan the class QR Code with your mobile phone's camera</p>
      </div>
    );

  return (
    <div className="py-10">
      <div className="flex flex-col justify-center items-center">
        {attendanceStatus && (
          <div className="w-lg">
            <h2>{attendanceStatus.message}</h2>
            <p>{attendanceStatus.record.status}</p>
            <p>{attendanceStatus.record.markedAt}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkAttendance;
