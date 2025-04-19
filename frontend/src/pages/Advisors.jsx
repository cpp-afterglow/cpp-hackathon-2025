import React from "react";
import "../styles/Advisors.css";
import { useNavigate } from "react-router-dom";


const AdvisorPage = ({ advisorName }) => {

    const navigate = useNavigate();

    const handleSignOut = () => {
      localStorage.clear();
      navigate("/");
    };
    
    return (
    <div className="advisor-container">
      <div className="advisor-header">
        <div className="advisor-name-box">
            {advisorName}
        </div>
        <div className="advisor-signout" onClick={handleSignOut}>
            Sign Out
        </div>
    </div>


      <div className="advisor-grid">
        <div className="advisor-section top-left">
          <h3>High Priority Students</h3>
          <ul>
            {/* Replace with actual data */}
            <li>Jane Doe (Score: 95)</li>
            <li>John Smith (Score: 92)</li>
          </ul>
        </div>

        <div className="advisor-section top-right">
          <h3>Search Functions</h3>
          <input type="text" placeholder="Search by name" />
          <input type="date" />
          <input type="number" placeholder="Search by score value" />
        </div>

        <div className="advisor-section bottom-left">
          <h3>Graphs and Comparison Settings</h3>
          <button>Single Variable</button>
          <button>Multiple Variables</button>
        </div>

        <div className="advisor-section bottom-right">
          <h3>Graph Display</h3>
          {/* Future graph component goes here */}
          <div className="graph-placeholder">No graph selected</div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorPage;
