import React, { useState, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress'; // Shadcn Progress
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  id: string;
  name: string;
  content: ReactNode;
  isCompleted?: boolean; // Optional: for visual feedback
}

interface JointAccountStepperProps {
  steps: Step[];
  initialStep?: number;
  onFinish?: () => void; // Callback when the last step is completed
  // Styling props if needed
  stepIndicatorType?: 'progress' | 'dots' | 'tabs';
}

const JointAccountStepper: React.FC<JointAccountStepperProps> = ({
  steps,
  initialStep = 0,
  onFinish,
  stepIndicatorType = 'progress',
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    steps.reduce((acc, step, index) => ({ ...acc, [step.id]: step.isCompleted || (index < initialStep) }), {})
  );

  console.log("Rendering JointAccountStepper, current step:", currentStep);

  const totalSteps = steps.length;
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    setCompletedSteps(prev => ({ ...prev, [steps[currentStep].id]: true }));
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else if (onFinish) {
      onFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="w-full space-y-6">
      {/* Step Indicator */}
      {stepIndicatorType === 'progress' && (
        <div>
          <div className="flex justify-between mb-1 text-sm">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span className="font-medium">{steps[currentStep].name}</span>
          </div>
          <Progress value={progressPercentage} className="w-full h-2" />
        </div>
      )}

      {stepIndicatorType === 'tabs' && (
        <div className="flex border-b">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => completedSteps[step.id] || index <= currentStep ? setCurrentStep(index) : null} // Allow navigation to completed/current steps
              className={cn(
                "py-2 px-4 text-sm font-medium text-center border-b-2",
                index === currentStep
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300",
                !(completedSteps[step.id] || index <= currentStep) && "cursor-not-allowed opacity-50"
              )}
              disabled={!(completedSteps[step.id] || index <= currentStep)}
            >
              {step.name}
              {completedSteps[step.id] && index < currentStep && <Check className="inline-block ml-1 h-4 w-4 text-green-500" />}
            </button>
          ))}
        </div>
      )}

      {/* Current Step Content */}
      <div className="p-1 min-h-[200px]"> {/* Added min-h for consistent layout */}
        {steps[currentStep].content}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button onClick={handleNext}>
          {isLastStep ? 'Finish' : 'Next'}
          {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
          {isLastStep && <Check className="ml-2 h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};

export default JointAccountStepper;