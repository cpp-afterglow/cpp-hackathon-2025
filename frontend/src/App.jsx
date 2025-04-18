import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState("...");

  useEffect(() => {
    fetch("http://localhost:5003/")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>CPP Hackathon 2025</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;

