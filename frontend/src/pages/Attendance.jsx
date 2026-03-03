import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [positions, setPositions] = useState({});
  const [stars, setStars] = useState([]);
  const date = new Date().toISOString().split("T")[0];

  // Load students and attendance from localStorage
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    const savedAttendance = JSON.parse(localStorage.getItem("attendance")) || {};

    setStudents(savedStudents);
    setAttendance(savedAttendance);

    // Calculate stable grid positions
    const pos = {};
    const cols = 4;
    const spacingX = 18;
    const spacingY = 18;

    savedStudents.forEach((s, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      pos[s.id] = {
        top: 20 + row * spacingY + "%",
        left: 20 + col * spacingX + "%",
      };
    });

    setPositions(pos);
  }, []);

  // Save students whenever they change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Save attendance whenever it changes
  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);

  // Play sound based on status
  const playSound = (status) => {
    let audio;
    if (status === "Present") audio = new Audio("/click.mp3");
    else if (status === "Absent") audio = new Audio("/cross.mp3");

    if (audio) {
      audio.volume = 0.5;
      audio.play();
    }
  };

  // Handle click on a student
  const handleClick = (id) => {
    const currentStatus = attendance[date]?.[id];
    let newStatus = currentStatus;

    if (!currentStatus) newStatus = "Present";
    else if (currentStatus === "Present") newStatus = "Absent";
    else if (currentStatus === "Absent") return;

    const updated = {
      ...attendance,
      [date]: {
        ...(attendance[date] || {}),
        [id]: newStatus,
      },
    };

    setAttendance(updated);

    // Flying star only for Present
    if (newStatus === "Present") {
      const newStar = {
        id: Date.now(),
        left: positions[id]?.left || "50%",
      };

      setStars((prev) => [...prev, newStar]);

      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== newStar.id));
      }, 1500);
    }

    // Play sound
    playSound(newStatus);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: "url('/dragons.png')" }}
    >
      <Navbar />

      {students.map((s) => (
        <div
          key={s.id}
          onClick={() => handleClick(s.id)}
          className="absolute w-28 h-28 flex items-center justify-center 
                     rounded-full bg-white/80 backdrop-blur-md
                     shadow-xl cursor-pointer 
                     hover:scale-110 hover:shadow-2xl
                     transition duration-300"
          style={{
            top: positions[s.id]?.top,
            left: positions[s.id]?.left,
          }}
        >
          {attendance[date]?.[s.id] === "Present" ? (
            <span className="text-4xl animate-bounce">⭐</span>
          ) : attendance[date]?.[s.id] === "Absent" ? (
            <span className="text-4xl">❌</span>
          ) : (
            <span className="font-semibold text-gray-800 text-center px-2">
              {s.name}
            </span>
          )}
        </div>
      ))}

      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute text-4xl animate-fly"
          style={{ left: star.left, bottom: "0%" }}
        >
          ⭐
        </div>
      ))}

      <style>
        {`
        @keyframes flyUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-300px); opacity: 0; }
        }

        .animate-fly {
          animation: flyUp 1.5s ease-out forwards;
        }
        `}
      </style>
    </div>
  );
}
