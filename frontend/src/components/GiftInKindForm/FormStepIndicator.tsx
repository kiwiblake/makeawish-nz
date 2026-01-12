import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: "Your Details" },
  { number: 2, label: "Gift Info" },
  { number: 3, label: "Logistics" },
  { number: 4, label: "Review" },
];

export function FormStepIndicator({ currentStep }: Props) {
  return (
    <div className="mb-8">
      {/* Progress bar */}
      <div className="relative mb-6">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        />

        {/* Step circles */}
        <div className="relative flex justify-between">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div
                key={step.number}
                className="flex flex-col items-center"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 border-2",
                    isCompleted
                      ? "bg-primary border-primary text-white"
                      : isCurrent
                      ? "bg-white border-primary text-primary"
                      : "bg-white border-gray-300 text-gray-400"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={cn(
                    "text-xs mt-2 hidden sm:block font-medium",
                    isCurrent ? "text-primary" : isCompleted ? "text-gray-700" : "text-gray-400"
                  )}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile step indicator */}
      <div className="sm:hidden text-center text-sm text-gray-600">
        Step {currentStep} of {steps.length}: <span className="font-medium">{steps[currentStep - 1]?.label}</span>
      </div>
    </div>
  );
}

export default FormStepIndicator;
