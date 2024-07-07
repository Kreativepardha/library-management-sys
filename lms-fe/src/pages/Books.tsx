import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { BookCard } from "../components/BookCard";
import { Loading } from "../components/Loading";
import { Pagination } from "../components/Pagination";

export const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [booksPerPage] = useState(10);
  const [openCardIndex, setOpenCardIndex] = useState(null);

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const toggleDetails = (index) => {
    setOpenCardIndex(openCardIndex === index ? null : index);
  };
  const fetchBooks = useCallback(async (page: number) => {
    const token = getToken();
    console.log(token)
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`${BACKEND_URL}/api/v1/book`, {
        headers: {
          Authorization: token,
        },
        params: { page, limit: booksPerPage, search }, 
      });

      // console.log('Backend Response:', response.data);

      setBooks(response.data.books); 
      setPageCount(response.data.totalPages);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch books. Please try again later.");
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [booksPerPage, search]);

  useEffect(() => {
    fetchBooks(page);
  }, [fetchBooks, page]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="search-div p-4">
        <input
          type="text"
          placeholder="Search books by title"
          value={search}
          onChange={handleSearchChange}
          className="w-full p-2 shadow-md border-t-2  shadow-gray-300 rounded mt-20"
        />
      </div>
      <div className="p-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book,index) => (
              <BookCard key={book._id} book={book}
                showDetails={index === openCardIndex}
                toggleDetails={() => toggleDetails(index)}
              />
            ))
          ) : (
            !loading && <p className="text-center font-bold text-red-600">No books found</p>
          )}
        </div>
        {loading && <Loading />}
        {!loading && pageCount > 1 && (
          <div className="flex justify-center items-center align-middle mt-32 bottom-0  relative">
            <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
          </div>
        )}
      </div>
    </div>
  );
};
