import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AttendanceReport() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
 const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);


  useEffect(() => {
    const savedStudents =
      JSON.parse(localStorage.getItem("students")) || [];
    const savedAttendance =
      JSON.parse(localStorage.getItem("attendance")) || {};

    setStudents(savedStudents);
    setAttendance(savedAttendance);
  }, []);

    const getStatus = (id) => {
      if (!date) return "Not Marked";

      const storedAttendance =
        JSON.parse(localStorage.getItem("attendance")) || {};

      return storedAttendance[date]?.[id] || "Not Marked";

    };


  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Attendance Report
        </h2>

        {/* Date Picker */}
        <div className="mb-6">
          <label className="mr-2 font-semibold">
            Select Date:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded shadow p-4">
          {students.length === 0 ? (
            <p>No students found</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Roll</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Status</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="text-center">
                    <td className="p-2 border">
                      {s.roll}
                    </td>
                    <td className="p-2 border">
                      {s.name}
                    </td>
                    <td className="p-2 border">
                      {getStatus(s.id) === "Present" && (
                        <span className="text-green-600 font-semibold">
                          Present
                        </span>
                      )}

                      {getStatus(s.id) === "Absent" && (
                        <span className="text-red-600 font-semibold">
                          Absent
                        </span>
                      )}

                      {getStatus(s.id) === "Not Marked" && (
                        <span className="text-gray-500">
                          Not Marked
                        </span>
                      )}
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
