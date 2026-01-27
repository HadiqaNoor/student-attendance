import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // load students + attendance
  useEffect(() => {
    const savedStudents =
      JSON.parse(localStorage.getItem("students")) || [];
    const savedAttendance =
      JSON.parse(localStorage.getItem("attendance")) || {};

    setStudents(savedStudents);
    setAttendance(savedAttendance);
  }, []);

  const markAttendance = (id, status) => {
    const updated = {
      ...attendance,
      [date]: {
        ...(attendance[date] || {}),
        [id]: status,
      },
    };

    setAttendance(updated);
    localStorage.setItem("attendance", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Attendance
          </h1>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-3 md:mt-0 px-4 py-2 border rounded shadow-sm"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3">Roll No</th>
                <th className="p-3">Name</th>
                <th className="p-3 text-center">Attendance</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="p-4 text-center text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{s.roll}</td>
                    <td className="p-3 font-medium">{s.name}</td>

                    <td className="p-3 text-center space-x-2">
                      <button
                        onClick={() =>
                          markAttendance(s.id, "Present")
                        }
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Present
                      </button>

                      <button
                        onClick={() =>
                          markAttendance(s.id, "Absent")
                        }
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Absent
                      </button>
                    </td>

                    <td className="p-3 text-center">
                      {attendance[date]?.[s.id] ? (
                        <span
                          className={`px-2 py-1 rounded text-white text-sm ${
                            attendance[date][s.id] === "Present"
                              ? "bg-green-600"
                              : "bg-red-600"
                          }`}
                        >
                          {attendance[date][s.id]}
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          Not marked
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
