import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    useEffect(() => {
        axios
            .get('/api/jokes')
            .then((res) => {
                setJokes(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    });

    const [jokes, setJokes] = useState([]);
    return (
        <>
            <h1>Nomi and Fullstack</h1>
            <p>JOKES: {jokes.length}</p>
            {jokes.map((joke) => (
                <div key={joke.id}>
                    <h1>{joke.title}</h1>
                    <p>{joke.content}</p>
                </div>
            ))}
        </>
    );
}

export default App;
