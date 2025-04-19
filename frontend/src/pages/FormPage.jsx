// pages/FormPage.jsx
import { useState, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader, Textarea, Button } from "@heroui/react";
import "../styles/Login.css"; // reusing same background SORRY but faster i think!!
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const FormPage = ({ goBack }) => {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("VITE_API_BASE is:", import.meta.env.VITE_API_BASE);
  }, []);


  const handleSubmit = async () => {
    if (!text.trim()) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const today = new Date().toISOString().split("T")[0];

    const res = await fetch(`${import.meta.env.VITE_API_BASE}/submit-form`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: user.id,
        date: today,
        text,
        category: "neutral" 
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setSubmitted(true);
      localStorage.removeItem("user");

      setTimeout(() => {
        navigate("/"); 
      }, 1500);
    } else {
      alert(data.error || "Failed to submit");
    }
  };

  return (
    <div className="lin">
      <motion.div
        key="form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="lin-card" style={{ minHeight: "50vh" }}>
          <CardHeader className="lin-card-body">
            <h2 className="lin-card-header">Form Submission</h2>
          </CardHeader>
          <CardBody className="lin-card-body">
            {submitted ? (
              <p className="text-green-300 text-lg">Your journal was submitted, Thank you!</p>
            ) : (
                <textarea
                    className="lin-textarea"
                    placeholder="Write more details about how youre feeling or concerns about the future or what you expect..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            )}
          </CardBody>
          <CardFooter className="lin-card-body">
            {!submitted && (
              <Button className="lin-submit" onClick={handleSubmit} disabled={!text.trim()}>
                Submit
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default FormPage;
