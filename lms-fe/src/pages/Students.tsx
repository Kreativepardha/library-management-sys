import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { StudentCard } from "../components/StudentCard";
import { Loading } from "../components/Loading";

export const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const token = getToken();
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/student`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data && Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          setStudents([]);
          console.error("Unexpected response format", response.data);
          setError("Failed to fetch students: Invalid response format");
        }
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.err) {
          setError(`Failed to fetch students: ${err.response.data.err.reason.type}`);
        } else {
          setError("Failed to fetch students: Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <div className="p-6">
        {loading ? (
          <Loading />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <StudentCard key={student._id} student={student} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
