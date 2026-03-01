import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const StudentForm = ({ addStudent }) => {
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Validation FIRST
    if (!name || !roll) {
      alert("Fill all fields");
      return;
    }

   
    addStudent({
      id: Date.now(),
      name,
      roll,
      photo: "/umme.jpg" 
    });

    // ✅ Clear form
    setName("");
    setRoll("");
  };

  return (

   
    <form onSubmit={handleSubmit} className="card">
      <h3>Add Student</h3>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Roll Number"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />

      <button type="submit">Add</button>
    </form>

  );
};

export default StudentForm;
