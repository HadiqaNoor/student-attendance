import { useNavigate } from "react-router-dom";

const StudentTable = ({ students, deleteStudent }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>Student List</h3>

      {students.length === 0 ? (
        <p>No students yet</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.roll}</td>
                <td>
                  <button onClick={() => deleteStudent(s.id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentTable;
