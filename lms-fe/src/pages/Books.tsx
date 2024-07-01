import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BookCard } from "../components/BookCard";

type Book = {
  id: string;
  title: string;
  author: string;
  // Add other relevant fields as needed
};

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/book`);
        if (Array.isArray(response.data)) {
          setBooks(response.data);
        } else {
          setBooks([]);
          console.error("Unexpected response format", response.data);
          setError("Failed to fetch books: Invalid response format");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
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
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
