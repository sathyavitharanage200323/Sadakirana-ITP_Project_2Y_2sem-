// src/pages/Home.js (Updated)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchBooks } from '../services/bookService';

// Simple component for a single book item
const BookCard = ({ book }) => {
    return (
        <div style={{ border: '1px solid #eee', padding: '15px', margin: '10px', width: '250px' }}>
            <Link to={`/book/${book._id}`}>
                <img src={book.image} alt={book.title} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} />
                <h3>{book.title}</h3>
            </Link>
            <p>by {book.author}</p>
            <p><strong>${book.price.toFixed(2)}</strong></p>
            <p>Rating: {book.rating.toFixed(1)} ({book.numReviews} reviews)</p>
            <Link to={`/book/${book._id}`}>
                 <button style={{ width: '100%', padding: '8px' }}>View Details</button>
            </Link>
        </div>
    );
};

const Home = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks();
                setBooks(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load books. Please check server connection.');
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    if (loading) return <div>Loading Bookstore...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Welcome to the Sadakirana Bookstore</h1>
            {user ? (
                <p>Hello, **{user.name}**! Check out our latest selection.</p>
            ) : (
                <p>Please log in or register to access full features and place an order.</p>
            )}

            <h2>Featured Books</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Home;