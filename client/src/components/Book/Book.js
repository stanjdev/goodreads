import React from 'react';
import { Link } from "react-router-dom";

export default function Book({ book }) {
  return (
    <tr>
        <td className="isbnCol">{book.isbn}</td>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.year}</td>
        <td><Link to={{ pathname: `/details/${book.book_id}`, state: {results: book} }}>Details</Link></td>
    </tr>
  )
};