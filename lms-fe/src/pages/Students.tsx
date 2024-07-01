import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BookCard } from "../components/BookCard";
import { StudentCard } from "../components/StudentCard";



export const Students = () => {
  const [students, setStudents] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchstudents = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user`);
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          setStudents([]);
          console.error("Unexpected response format", response.data);
          setError("Failed to fetch students: Invalid response format");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchstudents();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />

            ))}
          </div>
        )}
      </div>
    </div>
  );
};
