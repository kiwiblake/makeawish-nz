import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  heading: string;
  buttonText?: string;
  placeholderText?: string;
  backgroundColor?: string;
  buttonColor?: string;
}

export function NewsletterSignup({
  heading,
  buttonText = "Subscribe",
  placeholderText = "Your email address",
  backgroundColor = "bg-destructive",
  buttonColor = "bg-blue-700 hover:bg-blue-800",
}: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    if (!name || !email) {
      setStatus("error");
      setMessage("Please enter both your name and a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "An unexpected error occurred.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("A network error occurred. Please try again.");
    }
  };

  return (
    <section className={`py-12 md:py-20 ${backgroundColor}`}>
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold text-white md:text-4xl">{heading}</h2>
        <form
          className="mx-auto mt-8 max-w-lg"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === "submitting" || status === "success"}
              className="flex-grow bg-white text-gray-900 placeholder:text-gray-500"
              aria-label="Your name"
              required
            />
            <Input
              type="email"
              placeholder={placeholderText}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "submitting" || status === "success"}
              className="flex-grow bg-white text-gray-900 placeholder:text-gray-500"
              aria-label="Email address"
              required
            />
            <Button
              type="submit"
              className={`${buttonColor} text-white`}
              disabled={status === "submitting" || status === "success"}
            >
              {status === "submitting" ? "Subscribing..." : buttonText}
            </Button>
          </div>
          {status === "success" && (
            <p className="mt-4 text-center text-white">
              You've been successfully subscribed
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center text-yellow-300">{message}</p>
          )}
        </form>
      </div>
    </section>
  );
}
