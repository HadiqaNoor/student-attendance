import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-4 flex justify-between items-center">
      {/* Left */}
      <h1 className="text-lg font-semibold">
        Student Attendance 
      </h1>

      {/* Right */}
      <div className="flex items-center gap-6 text-sm">
        <Link to="/dashboard" className="hover:text-blue-300">
          Dashboard
        </Link>

        <Link to="/attendance" className="hover:text-blue-300">
          Attendance
        </Link>

        <Link to="/attendance-report" className="hover:text-blue-300">
          Attendance Report
        </Link>
      </div>
    </div>
  );
}
