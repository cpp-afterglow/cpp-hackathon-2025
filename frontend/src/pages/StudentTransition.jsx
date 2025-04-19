import { useNavigate } from "react-router-dom";
import "../styles/Transition.css"; // Optional new file if needed

const StudentTransition = () => {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/journal");
  };

  const handleNo = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="transition-container">
      <div className="transition-box">
        <h2 className="transition-header">
          Would you like to fill out an optional journal entry with more information?
        </h2>
        <p className="transition-subtext">
          This can be any current thoughts, more detailed feelings (good or bad ones), or future worries </p>
        <div className="transition-buttons">
          <button className="lin-button" onClick={handleYes}>Yes</button>
          <button className="lin-button" onClick={handleNo}>No</button>
        </div>
      </div>
    </div>
  );
};

export default StudentTransition;
