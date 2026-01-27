import { useEffect } from "react";
import api from "../api/axios";

const TestConnection = () => {
  useEffect(() => {
    api.get("/attendance/test")
      .then(res => console.log("CONNECTED:", res.data))
      .catch(err => console.error("ERROR:", err));
  }, []);

  return <h2>Check console 🔍</h2>;
};

export default TestConnection;
