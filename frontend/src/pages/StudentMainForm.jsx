import React, { useState } from 'react';
import { useUser } from '../Context';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import MoodSlider from '../components/MoodSlider';
import ColorChoice from '../components/ColorChoice';
import ImageSelector from '../components/ImageSelector';

import '../styles/Student.css';

const StudentMainForm = () => {
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    mood: 50,
    color: '',
    image: '',
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    fetch('/api/mood', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle response
      });
  };

  if (!user) {
    return <div>Please log in to access this page.</div>;
  }

  return (
    <div className="snt">
      <Card className='snt-card'>
        <CardHeader className='snt-card-header'>
          <h1>Hello, {user.name}!</h1>
        </CardHeader>
        <CardBody className='lin-card-body'>
          {step === 0 && (
            <MoodSlider
              value={formData.mood}
              onChange={(val) => setFormData(f => ({ ...f, mood: val }))}
            />
          )}
          {step === 1 && (
            <ColorChoice
              selectedColor={formData.color}
              onSelect={(color) => setFormData({ ...formData, color })}
            />
          )}
          {step === 2 && (
            <ImageSelector
              selectedImage={formData.image}
              onSelect={(image) => setFormData({ ...formData, image })}
            />
          )}

        </CardBody>
        <CardFooter className='snt-card-footer px-4 py-2'>
        <div className="w-full flex justify-between items-center">
    {step > 0 
      ? <Button className='snt-button' onPress={handleBack}>Back</Button> 
      : <span /> }

    {step < 2 
      ? <Button className='snt-button' onPress={handleNext}>Next</Button> 
      : <Button className='snt-submit' onPress={handleSubmit}>Submit</Button>}
  </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentMainForm;
