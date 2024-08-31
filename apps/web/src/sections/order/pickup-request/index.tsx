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
import AddressForm, { UserAddressData } from './PickupForm';
import Review from './Review';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

// step options
const steps = ['Order details', 'Review your order'];

// Helper function to render the content for each step
function getStepContent(
  step: number,
  handleNext: () => void,
  handleBack: () => void,
  setErrorIndex: (i: number | null) => void,
  userAddressData: UserAddressData,
  setUserAddressData: (d: UserAddressData) => void,
  closestOutlet: string,
  cost: string,
  userId: number
) {
  const stepContentStyle: CSSProperties = {
    padding: '5px', // consistent padding
  };

  switch (step) {
    case 0:
      return (
        <div style={stepContentStyle}>
          <AddressForm
            userId={userId}
            handleNext={handleNext}
            setErrorIndex={setErrorIndex}
            userAddressData={userAddressData}
            setUserAddressData={setUserAddressData}
          />
        </div>
      );
    case 1:
      return (
        <div style={stepContentStyle}>
          <Review
            userAddressData={userAddressData}
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
  const [userAddressData, setUserAddressData] = useState<UserAddressData>({});
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  const router = useRouter(); // Initialize useRouter for navigation

  const closestOutlet = 'Retrieving...'; // Replace with actual closest outlet logic
  const cost = 'Calculating...'; // Replace with actual cost calculation logic

  const userId = 1; // Replace with actual userId

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
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
              Your order number is #2001539 {/* Replace with dynamic transaction ID */}
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
            {getStepContent(activeStep, handleNext, handleBack, setErrorIndex, userAddressData, setUserAddressData, closestOutlet, cost, userId)}
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
