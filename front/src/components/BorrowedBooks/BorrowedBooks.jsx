import React, { useState, useEffect } from "react";
import { DataContext } from "../../context/DataContext";

const BorrowedBooks = ({ persona_id }) => {
  const { getBooksByPerson } = React.useContext(DataContext);

  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function fetchData() {
      setBooks(await getBooksByPerson(persona_id));
    }
    fetchData();
  }, [persona_id]);

  return (
    <>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => {
            return <li key={book.id}>{book.nombre}</li>;
          })}
        </ul>
      ) : (
        <div>None</div>
      )}
    </>
  );
};

export default BorrowedBooks;
