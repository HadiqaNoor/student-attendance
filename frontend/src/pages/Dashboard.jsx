import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const today = new Date().toISOString().split("T")[0];

  // ✅ Load localStorage data
  useEffect(() => {
    const loadData = () => {
      setStudents(JSON.parse(localStorage.getItem("students")) || []);
      setAttendance(JSON.parse(localStorage.getItem("attendance")) || {});
    };

    loadData();
    window.addEventListener("storage", loadData);

    return () => window.removeEventListener("storage", loadData);
  }, []);

  // ✅ Test backend connection
  useEffect(() => {
    api
      .get("/attendance/test")
      .then((res) => console.log("CONNECTED:", res.data))
      .catch((err) => console.error("ERROR:", err));
  }, []);

  // ✅ Counts
  const presentCount = Object.values(attendance[today] || {}).filter(
    (s) => s === "Present"
  ).length;

  const absentCount = Object.values(attendance[today] || {}).filter(
    (s) => s === "Absent"
  ).length;

  const totalStudents = students.length;

  const attendancePercentage =
    totalStudents === 0
      ? 0
      : Math.round((presentCount / totalStudents) * 100);

  // ✅ Delete student
  const deleteStudent = (id) => {
    const updatedStudents = students.filter((s) => s.id !== id);
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    const att = JSON.parse(localStorage.getItem("attendance")) || {};
    Object.keys(att).forEach((date) => {
      delete att[date]?.[id];
    });
    localStorage.setItem("attendance", JSON.stringify(att));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Welcome 👋</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Stat title="Total Students" value={totalStudents} color="blue" />
          <Stat title="Present Today" value={presentCount} color="green" />
          <Stat title="Absent Today" value={absentCount} color="red" />
          <Stat title="Attendance %" value={`${attendancePercentage}%`} color="purple" />
        </div>

        <div className="bg-white rounded shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Student List</h3>

            <button
              onClick={() => navigate("/students")}
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              + Add Student
            </button>
          </div>

          {students.length === 0 ? (
            <p>No students found</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">Roll</th>
                  <th className="p-2">Name</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-b">
                    <td className="p-2">{s.roll}</td>
                    <td className="p-2">{s.name}</td>
                    <td className="p-2 space-x-2">
                      <button
                        onClick={() => navigate(`/students/${s.id}`)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

// ✅ Small reusable stat card
function Stat({ title, value, color }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-gray-500 font-bold italic">{title}</h3>
      <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
    </div>
  );
}
