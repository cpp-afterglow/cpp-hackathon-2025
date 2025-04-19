//CreateAcc.jsx
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { Button } from "@heroui/react";
import {Input} from "@heroui/input";

const CreateAccountCard = ({goBack}) => {
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
          Create Account
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
        <Input
          isRequired
          className="lin-input"
          placeholder="Enter your password"
          label="Confirm Password"
          type="password"
        />
      </CardBody>
      <CardFooter className="lin-card-body">
      <Button className="lin-submit">Register</Button>
      </CardFooter>
    </Card>
  );
};

export default CreateAccountCard;
