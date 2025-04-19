import React, { useState } from 'react';
import { useUser } from '../Context';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MoodSlider from '../components/MoodSlider';
import ColorChoice from '../components/ColorChoice';
import ImageSelector from '../components/ImageSelector';

import '../styles/Student.css';

const StudentMainForm = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    mood: 50,
    color: '',
    image: '',
  });

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const nextPage = async() =>
  {
        localStorage.setItem('mood', formData.mood);
        localStorage.setItem('color', formData.color);
        localStorage.setItem('image', formData.image);
        navigate('/transition');
  };

  

  return (
    <div className="snt">
      
      <Card className="snt-card">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {step === 0 && (
              <CardHeader className="snt-card-header">
                <h1>Hello, {user.name}!</h1>
              </CardHeader>
            )}

            <CardBody className="snt-card-body">
              {step === 0 && (
                <MoodSlider
                  value={formData.mood}
                  onChange={(val) => setFormData((f) => ({ ...f, mood: val }))}
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

            <CardFooter className="snt-card-footer px-4 py-2">
              <div className="w-full flex justify-between items-center">
                {step > 0 ? (
                  <Button className="snt-button" onPress={handleBack}>
                    Back
                  </Button>
                ) : (
                  <span />
                )}

                {step < 2 ? (
                  <Button className="snt-button" onPress={handleNext}>
                    Next
                  </Button>
                ) : (
                  <Button className="snt-submit" onPress={nextPage}>
                    Submit
                  </Button>
                )}
              </div>
            </CardFooter>
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
};

export default StudentMainForm;
