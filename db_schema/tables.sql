/* Created 5/18/20 */ 
/* Recreated Users table 5/26/20 */

-- CREATE DATABASE goodreads_reviews; -- copy and paste this into psql terminal

CREATE TABLE users (
    userID SERIAL PRIMARY KEY, 
    firstName VARCHAR NOT NULL, 
    lastName VARCHAR NOT NULL, 
    email VARCHAR UNIQUE NOT NULL, 
    password VARCHAR NOT NULL
);

-- SELECT * FROM books WHERE LOWER(isbn) LIKE :query OR LOWER(author) LIKE :query

/* This way can lead to SQL injections and hackers. */
-- SELECT * FROM users
--     WHERE (username = username)
--     AND (password = password);


    /* Imported this into the Adminer */
CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    isbn VARCHAR UNIQUE NULL,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year SMALLINT NOT NULL
);

-- ALTER TABLE books ALTER year INTEGER NOT NULL 
-- SELECT data type FROM books

/* Created 5/18/20 */
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    book_id INTEGER REFERENCES books,
    rating SMALLINT NOT NULL CONSTRAINT Invalid_Rating CHECK (rating <= 5 AND rating >= 1),
    comment VARCHAR
);


