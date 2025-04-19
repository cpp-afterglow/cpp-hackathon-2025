import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/StudentPage.css";

const ScorePage = () => {
  const { date } = useParams();
  const [moods, setMoods] = useState([]);
  const [forms, setForms] = useState([]);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE}/advisor/date/${date}`);
      const data = await res.json();
      setMoods(data.moods);
      setForms(data.forms);
      setScores(data.scores);
    };
    fetchData();
  }, [date]);

  return (
    <div className="student-page-container">
      <div className="student-header-box">
        <h2>Data for {date}</h2>
        <p className="return-link" onClick={() => navigate("/advisor")}>Return to Advisor Page</p>
      </div>

      <div className="submission-column">
        <h3>Mood Submissions</h3>
        {moods.length ? moods.map((m, i) => (
          <div className="submission-card" key={i}>
            <p>Student ID: {m.student_id}</p>
            <p>Slider: {m.slider_value}</p>
            <p>Color: {m.color}</p>
            <p>Image: {m.image}</p>
          </div>
        )) : <p>No moods</p>}
      </div>

      <div className="submission-column">
        <h3>Form Submissions</h3>
        {forms.length ? forms.map((f, i) => (
          <div className="submission-card" key={i}>
            <p>Student ID: {f.student_id}</p>
            <p>Category: {f.category}</p>
            <p>{f.text}</p>
          </div>
        )) : <p>No forms</p>}
      </div>

      <div className="submission-column">
        <h3>Total Scores</h3>
        {scores.length ? scores.map((s, i) => (
          <div className="submission-card" key={i}>
            <p>Student ID: {s.student_id}</p>
            <p>Score: {s.daily_score}</p>
          </div>
        )) : <p>No scores</p>}
      </div>
    </div>
  );
};

export default ScorePage;
