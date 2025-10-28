"use server";

import { ContactEmail } from "@/components/emails/contact-email";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  fname: z.string().min(3, "Name must be at least 3 characters."),
  email: z.string().email("Must be a valid email"),
  subject: z.string().min(3, "Please enter a subject."),
  message: z.string().min(5, "Message must be at least 5 characters."),
});

export async function sendContactEmail(
  prevState: { success: boolean; error: string | null },
  formData: FormData
) {
  try {
    // Honeypot check - if filled, reject silently
    const website = formData.get("website");
    if (website && website !== "") {
      return {
        success: false,
        error: "Please check your form data and try again.",
      };
    }

    // Validate form data
    const validatedFields = contactSchema.safeParse({
      fname: formData.get("fname"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Please check your form data and try again.",
      };
    }

    const { fname, email, subject, message } = validatedFields.data;

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [`${process.env.RESEND_FROM_EMAIL!}`, "mohansky@gmail.com", "nnejourneys@gmail.com"],
      subject: `Contact Form: ${subject}`,
      react: ContactEmail({
        name: fname,
        email,
        subject,
        message,
      }),
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Failed to send message. Please try again later.",
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

