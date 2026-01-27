import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function StudentDetail() {
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  // 🔹 Load student, attendance & saved image
  useEffect(() => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const att = JSON.parse(localStorage.getItem("attendance")) || {};

    const foundStudent = students.find(
      (s) => String(s.id) === String(id)
    );

    setStudent(foundStudent);
    setAttendance(att);

    // ✅ Load saved image for this student
    const savedImage = localStorage.getItem(`studentImage-${id}`);
    if (savedImage) {
      setImagePreview(savedImage);
    }
  }, [id]);

  if (!student) {
    return <p className="p-6">Student not found</p>;
  }

  // 🔹 Attendance summary
  const summary = { present: 0, absent: 0 };

  Object.keys(attendance).forEach((date) => {
    const status = attendance[date][student.id];
    if (status === "Present") summary.present++;
    if (status === "Absent") summary.absent++;
  });

  const total = summary.present + summary.absent;

  // 🔹 Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);

      // ✅ Save image per student
      localStorage.setItem(`studentImage-${id}`, reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Student Detail
        </h2>

        {/* 🔹 Student Info */}
        <div className="bg-white rounded shadow p-6 mb-6 flex flex-col items-center">
          {/* Image */}
          <div className="relative w-48 h-48 mb-4">
            <img
              src={imagePreview || "/default-avatar.png"}
              alt="Student"
              className="w-full h-full object-cover rounded-full shadow-lg"
            />

            {/* Change Image Button */}
            <label className="absolute bottom-0 right-0 bg-blue-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-600 flex items-center gap-1 shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0 0l-3-3m3 3l3-3m-3-6V6m0 0l3 3m-3-3l-3 3"
                />
              </svg>
              Change
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <p className="text-lg font-medium">
            <b>Name:</b> {student.name}
          </p>
          <p className="text-lg font-medium">
            <b>Roll:</b> {student.roll}
          </p>
        </div>

        {/* 🔹 Attendance Summary */}
        <div className="bg-white rounded shadow p-6 mb-6 flex justify-around">
          <p>
            <b>Total Days:</b> {total}
          </p>
          <p className="text-green-600 font-semibold">
            <b>Present:</b> {summary.present}
          </p>
          <p className="text-red-600 font-semibold">
            <b>Absent:</b> {summary.absent}
          </p>
        </div>

        {/* 🔹 Attendance History */}
        <h3 className="text-2xl font-bold mb-4">
          Attendance History
        </h3>

        {Object.keys(attendance).length === 0 ? (
          <p>No attendance data</p>
        ) : (
          <table className="w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-200">
              <tr className="text-center">
                <th className="p-2">Date</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {Object.entries(attendance).map(
                ([date, record]) =>
                  record[student.id] && (
                    <tr
                      key={date}
                      className="text-center border-b"
                    >
                      <td className="p-2">{date}</td>
                      <td
                        className={`p-2 font-semibold ${
                          record[student.id] === "Present"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {record[student.id]}
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
