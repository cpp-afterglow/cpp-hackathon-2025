//LoginForm.jsx
import { Card, CardBody, CardFooter, CardHeader, Input } from "@heroui/react";
import { Button } from "@heroui/react";
import "../styles/Login.css";

const LoginFormCard = ({ role, goBack }) => {
  return (
    <Card className="lin-card">
        <p className="back-button">
            <span
              className="text-blue-200 underline cursor-pointer hover:text-white"
              onClick={() => goBack()}
            >
               ← Back
            </span>
          </p>
        <CardHeader className="lin-card-body">
            <h2 className="lin-card-header">
            {role === 'student' ? 'Student' : 'Faculty'} Login
            </h2>
        </CardHeader>
      <CardBody className="lin-card-body">
        <Input
          isRequired
          className="lin-input"
          placeholder="Enter your name"
          label="Name"
          type="text"
        />
        <Input
          isRequired
          className="lin-input"
          placeholder="Enter your password"
          label="Password"
          type="password"
        />
      </CardBody>
      <CardFooter className="lin-card-body">
        <Button className="lin-submit">Login</Button>
      </CardFooter>
    </Card>
  );
};

export default LoginFormCard;