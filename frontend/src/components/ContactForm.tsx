import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"; // Added icons
import React from "react";

// Define the form schema using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." })
    .max(500, { message: "Message cannot exceed 500 characters." }),
  _moreinfo: z.string().optional(), // Honeypot field
});

export type ContactFormData = z.infer<typeof formSchema>;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface Props {
  formTitle?: string;
  formDescription?: string;
  useBasinUrl?: string;
}

export function ContactForm({
  formTitle = "Contact Us",
  formDescription = "Fill out the form below and we\'ll get back to you.",
  useBasinUrl = "https://usebasin.com/f/d3d78a10dc4c",
}: Props) {
  const [submitStatus, setSubmitStatus] = React.useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      _moreinfo: "",
    },
  });

  const { reset, control, handleSubmit } = form; // Destructure form methods

  const onSubmit = async (values: ContactFormData) => {
    if (values._gotcha) {
      console.log("Bot submission detected, but letting UseBasin handle it.");
    }

    setSubmitStatus("submitting");
    setErrorMessage(null);

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
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
        setSubmitStatus("success");
        // Don't reset form immediately, wait for user action
        console.log("UseBasin submission success");
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
        console.error("Submission failed response:", response);
      }
    } catch (error) {
      console.error("Submission network/fetch error:", error);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected network error occurred."
      );
      setSubmitStatus("error");
    }
  };

  const handleSendAnother = () => {
    reset(); // Reset form fields
    setSubmitStatus("idle"); // Set status back to idle
    setErrorMessage(null);
  };

  const isSubmitting = submitStatus === "submitting";

  return (
    <Card className="w-full max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">
          {formTitle}
        </CardTitle>
        {submitStatus !== "success" && (
           <p className="text-center text-gray-600 dark:text-gray-400 pt-2">
            {formDescription}
          </p>
        )}
      </CardHeader>
      <CardContent>
        {submitStatus === "success" ? (
          // Success State
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h3 className="mt-4 text-xl font-semibold">Message Sent!</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Thank you for contacting us. We'll get back to you soon.
            </p>
            <Button onClick={handleSendAnother} className="mt-6" size="lg">
              Send another message
            </Button>
          </div>
        ) : (
          // Idle, Submitting, or Error State
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Honeypot Field (Visually Hidden) */}
              <FormField
                control={control}
                name="_moreinfo"
                render={({ field }) => (
                  <FormItem
                    className="absolute left-[-5000px]"
                    aria-hidden="true"
                  >
                    <FormControl>
                      <Input type="text" {...field} autoComplete="off" tabIndex={-1} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your Name"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Subject</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Subject of your message"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How can we help you?"
                        {...field}
                        rows={5}
                        className="resize-none"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button Area */}
              <div className="space-y-2">
                 <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  {/* Error Message Area */}
                  {submitStatus === "error" && errorMessage && (
                    <div className="flex items-center justify-center text-sm text-red-600 bg-red-100 border border-red-300 rounded-md p-3">
                      <AlertCircle className="mr-2 h-4 w-4" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
              </div>

            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}

export default ContactForm;
