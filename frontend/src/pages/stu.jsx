import { useState, useEffect } from "react";
import StudentForm from "../components/studentForm.jsx";
import StudentTable from "../components/studentTaable.jsx";

export default function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("students"));
    if (saved) setStudents(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="page">
      <h2>Students</h2>
      <StudentForm addStudent={addStudent} />
      <StudentTable students={students} deleteStudent={deleteStudent} />
    </div>
  );
}
