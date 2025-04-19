import React, { useEffect, useState } from "react";
import "../styles/Advisors.css";
import { useNavigate } from "react-router-dom";
import AdvisorCard from "../components/AdvisorCard";

const AdvisorPage = ({ advisorName }) => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const advisorId = 1; // TODO: Replace with dynamic advisor ID later

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE}/advisor/${advisorId}/students?page=${page}`
        );
        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error("Failed to fetch students:", err);
      }
    };
    fetchStudents();
  }, [page]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const goToStudentPage = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  return (
    <div className="advisor-container">
      <div className="advisor-header">
        <div className="advisor-name-box">{advisorName}</div>
        <div className="advisor-signout" onClick={handleSignOut}>
          Sign Out
        </div>
      </div>

      <div className="advisor-grid">
        <div className="advisor-section top-left">
          <h3 className="advisor-section-title">High Priority Students</h3>
          {students.length === 0 ? (
            <p>No recent scores found.</p>
          ) : (
            <>
              {students.map((student) => (
                <AdvisorCard
                  key={student.id}
                  student={student}
                  onClick={goToStudentPage}
                />
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <button className='adv-button' onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
                <button className='adv-button' onClick={() => setPage((p) => p + 1)}>Next</button>
              </div>
            </>
          )}
        </div>

        <div className="advisor-section top-right">
            <h3 className="advisor-section-title">Search Functions</h3>
            <input
                className="adv-input"
                type="text"
                className="search-input"
                placeholder="Search by name"
                value={searchQuery}
                onChange={async (e) => {
                    const q = e.target.value;
                    setSearchQuery(q);
                    if (q.trim()) {
                    const res = await fetch(`${import.meta.env.VITE_API_BASE}/advisor/${advisorId}/search-students?q=${q}`);
                    const data = await res.json();
                    setResults(data);
                    } else {
                    setResults([]);
                    }
                }}
                />
                {results.length > 0 && (
                <div className="search-dropdown">
                    {results.map((s) => (
                    <div key={s.id} className="search-option" onClick={() => navigate(`/student/${s.id}`)}>
                        {s.name}
                    </div>
                    ))}
                </div>
            )}
            <input
                className="adv-input"
                type="date"
                className="search-input"
                onChange={(e) => {
                    const selectedDate = e.target.value;
                    if (selectedDate) navigate(`/score/${selectedDate}`);
                }}
                placeholder="Search by date"
            />
            <input
                type="number"
                className="search-input"
                placeholder="Search by score value"
                onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                    const score = e.target.value;
                    if (!score.trim()) return;
                    navigate(`/score-by-value/${score}`);
                    }
                }}
            />


        </div>

        <div className="advisor-section bottom-left">
          <h3 className="advisor-section-title">Graph Settings</h3>
          <button className="adv-button">Single Variable</button>
          <button className="adv-button">Multiple Variables</button>
        </div>

        <div className="advisor-section bottom-right">
            <h3 className="advisor-section-title">Graph Display</h3>
          <div className="graph-placeholder">Currently None Selected</div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorPage;
