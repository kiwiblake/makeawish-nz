import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Loader2, CheckCircle, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";

import {
  giftInKindFormSchema,
  GiftInKindFormData,
  getFieldsForStep,
} from "./GiftInKindFormSchema";
import { FormStepIndicator } from "./FormStepIndicator";
import { DonorInfoStep } from "./steps/DonorInfoStep";
import { GiftDetailsStep } from "./steps/GiftDetailsStep";
import { LogisticsStep } from "./steps/LogisticsStep";
import { ReviewStep } from "./steps/ReviewStep";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface Props {
  useBasinUrl?: string;
  formTitle?: string;
  anchorId?: string;
}

const TOTAL_STEPS = 4;

export function GiftInKindForm({
  useBasinUrl = "https://usebasin.com/f/d3d78a10dc4c", // Using same endpoint as ContactForm for now
  formTitle = "Donate a Gift in Kind",
  anchorId = "donation-form",
}: Props) {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [submitStatus, setSubmitStatus] = React.useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm<GiftInKindFormData>({
    resolver: zodResolver(giftInKindFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      isOrganization: false,
      companyName: "",
      giftCategory: "",
      giftTitle: "",
      giftDescription: "",
      estimatedValue: "",
      quantity: "1",
      condition: "",
      location: "",
      region: "",
      deliveryPreference: "",
      availabilityNotes: "",
      receiveNewsletter: false,
      _honeypot: "",
    },
    mode: "onChange",
  });

  const { reset, handleSubmit, trigger } = form;
  const isSubmitting = submitStatus === "submitting";

  // Scroll to form section instead of top of page
  const scrollToForm = () => {
    const formElement = document.getElementById(anchorId);
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Validate current step fields before proceeding
  const validateAndProceed = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
      scrollToForm();
    }
  };

  const goBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    scrollToForm();
  };

  // Subscribe to newsletter via Campaign Monitor
  const subscribeToNewsletter = async (email: string, name: string) => {
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      if (response.ok) {
        console.log("Newsletter subscription successful");
      } else {
        console.error("Newsletter subscription failed");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    }
  };

  // Submit handler (UseBasin pattern from ContactForm)
  const onSubmit = async (values: GiftInKindFormData) => {
    // Only allow submission on the final step
    if (currentStep !== TOTAL_STEPS) {
      return;
    }

    // Honeypot check
    if (values._honeypot) {
      console.log("Bot submission detected");
      return;
    }

    setSubmitStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    try {
      const response = await fetch(useBasinUrl, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // If user opted in for newsletter, subscribe them via Campaign Monitor
        if (values.receiveNewsletter && values.email) {
          const fullName = `${values.firstName} ${values.lastName}`.trim();
          await subscribeToNewsletter(values.email, fullName);
        }

        setSubmitStatus("success");
        console.log("Gift in Kind submission success");
      } else {
        let errorText = `Submission failed. Status: ${response.status}`;
        try {
          const errorResult = await response.json();
          errorText = errorResult.message || errorText;
          console.error("UseBasin submission error details:", errorResult);
        } catch (jsonError) {
          console.error("Failed to parse UseBasin error JSON response:", jsonError);
        }
        setErrorMessage(errorText);
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission network/fetch error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected network error occurred."
      );
      setSubmitStatus("error");
    }
  };

  const handleStartOver = () => {
    reset();
    setCurrentStep(1);
    setSubmitStatus("idle");
    setErrorMessage(null);
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DonorInfoStep form={form} isSubmitting={isSubmitting} />;
      case 2:
        return <GiftDetailsStep form={form} isSubmitting={isSubmitting} />;
      case 3:
        return <LogisticsStep form={form} isSubmitting={isSubmitting} />;
      case 4:
        return <ReviewStep form={form} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <section id={anchorId} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-primary">
              {formTitle}
            </CardTitle>
            {submitStatus !== "success" && (
              <p className="text-center text-gray-600 pt-2">
                Complete the form below to donate a gift in kind to Make-A-Wish New Zealand
              </p>
            )}
          </CardHeader>
          <CardContent>
            {submitStatus === "success" ? (
              // Success State
              <div className="text-center py-8">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h3 className="mt-4 text-xl font-semibold">Thank You!</h3>
                <p className="mt-2 text-gray-600 max-w-md mx-auto">
                  Your gift donation has been submitted successfully. Our team will be in
                  touch soon to discuss the next steps.
                </p>
                <Button onClick={handleStartOver} className="mt-6" size="lg">
                  Submit Another Gift
                </Button>
              </div>
            ) : (
              // Form State
              <>
                <FormStepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

                <Form {...form}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={(e) => {
                      // Prevent Enter key from submitting form unless on final step
                      if (e.key === "Enter" && currentStep !== TOTAL_STEPS) {
                        e.preventDefault();
                      }
                    }}
                    className="space-y-6"
                  >
                    {renderStep()}

                    {/* Error Message */}
                    {submitStatus === "error" && errorMessage && (
                      <div className="flex items-center justify-center text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-3">
                        <AlertCircle className="mr-2 h-4 w-4 flex-shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between pt-6 border-t">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={goBack}
                        disabled={currentStep === 1 || isSubmitting}
                        className={currentStep === 1 ? "invisible" : ""}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                      </Button>

                      {currentStep < TOTAL_STEPS ? (
                        <Button
                          type="button"
                          onClick={validateAndProceed}
                          disabled={isSubmitting}
                        >
                          Next
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      ) : (
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            "Submit Donation"
                          )}
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default GiftInKindForm;
