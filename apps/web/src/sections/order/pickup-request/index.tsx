'use client';

import { useState, ReactNode, CSSProperties } from 'react';
import { useRouter } from 'next/navigation';

// material-ui
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import AddressForm, {UserAddressData, ClosestOutletAddressData, initialUserAddressData, initialClosestOutletData} from './PickupForm';
import Review from './ReviewOrder';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import instance from 'utils/axiosIntance';
import axios from 'axios';

// step options
const steps = ['Order details', 'Review your order'];

// Helper function to render the content for each step
function getStepContent(
  step: number,
  handleNext: () => void,
  handleBack: () => void,
  setErrorIndex: (i: number | null) => void,
  chosenAddress: UserAddressData,
  setChosenAddress: (d: UserAddressData) => void,
  closestOutlet: ClosestOutletAddressData,
  setClosestOutlet: (d: ClosestOutletAddressData) => void,
  cost: string,
  setCost: (d: string) => void,
  userId: number
) {
  const stepContentStyle: CSSProperties = {
    padding: '5px',
  };

  switch (step) {
    case 0:
      return (
        <div style={stepContentStyle}>
          <AddressForm
            userId={userId}
            handleNext={handleNext}
            setErrorIndex={setErrorIndex}
            chosenAddress={chosenAddress}
            setChosenAddress={setChosenAddress}
            closestOutlet= {closestOutlet}
            setClosestOutlet= {setClosestOutlet}
            cost = {cost}
            setCost = {setCost}
          />
        </div>
      );
    case 1:
      return (
        <div style={stepContentStyle}>
          <Review
            chosenAddress={chosenAddress}
            closestOutlet={closestOutlet}
            cost={cost}
          />
        </div>
      );
    default:
      throw new Error('Unknown step');
  }
}

export default function PickupRequest() {
  const [activeStep, setActiveStep] = useState(0);
  const [chosenAddress, setChosenAddress] = useState<UserAddressData>(initialUserAddressData);
  const [closestOutlet, setClosestOutlet] = useState<ClosestOutletAddressData>(initialClosestOutletData);
  const [cost, setCost] = useState<string>('Calculating...');
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  const router = useRouter(); // Initialize useRouter for navigation

  const userId = 1; // REPLACE with actual userId

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      try {
        const response = await instance().post('/order/pickup-request', {
        // const response = await axios.post('http://localhost:8000/api/order/pickup-request', {
          user_id: userId,
          user_address_id: chosenAddress.user_address_id, // Assuming address holds the selected address ID
          nearestOutlet: closestOutlet.closest_outlet_id, // Assuming closestOutlet holds the outlet ID
        });

        if (response.status === 201) {
          // Proceed to the next step
          setActiveStep(activeStep + 1);
          setErrorIndex(null);
        } else {
          // Handle error cases
          setErrorIndex(activeStep);
        }
      } catch (error) {
        console.error('Failed to create pickup request:', error);
        setErrorIndex(activeStep);
      }
    } else {
      setActiveStep(activeStep + 1);
      setErrorIndex(null);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <MainCard title="Pickup Request">
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, direction: "row", maxWidth: '600px', mx: 'auto'}}>
        {steps.map((label, index) => {
          const labelProps: { error?: boolean; optional?: ReactNode } = {};

          if (index === errorIndex) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for your order.
            </Typography>
            <Typography variant="subtitle1">
              We are processing your laundry pickup request.
            </Typography>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  onClick={() => router.push('/order/order-status')} // Navigate to order status
                  sx={{ my: 3, ml: 1 }}
                >
                  Go to Order Status
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <>
            {getStepContent(activeStep, handleNext, handleBack, setErrorIndex, chosenAddress, setChosenAddress, closestOutlet, setClosestOutlet, cost, setCost, userId)}
            {activeStep === steps.length - 1 && (
              <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <AnimateButton>
                  <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </AnimateButton>
              </Stack>
            )}
          </>
        )}
      </>
    </MainCard>
  );
}
