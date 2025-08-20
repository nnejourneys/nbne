"use server";

import { EnquiryEmail } from "@/components/emails/enquiry-email";
import { Resend } from "resend"; 
import * as z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const enquirySchema = z.object({
  title: z.string().optional(),
  fname: z.string().min(3, "Name must be at least 3 characters."),
  email: z.string().email("Must be a valid email"),
  message: z.string().min(5, "Message must be at least 5 characters."),
});

export async function sendEnquiryEmail(
  prevState: { success: boolean; error: string | null },
  formData: FormData
): Promise<{ success: boolean; error: string | null }> {
  try {
    // Validate form data
    const validatedFields = enquirySchema.safeParse({
      title: formData.get("title"),
      fname: formData.get("fname"),
      email: formData.get("email"),
      message: formData.get("message"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Please check your form data and try again.",
      };
    }

    const { title, fname, email, message } = validatedFields.data;

    // Send email using Resend
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [`${process.env.RESEND_FROM_EMAIL!}`, "mohansky@gmail.com"],
      subject: title ? `Enquiry: ${title}` : "New Enquiry",
      react: EnquiryEmail({
        title,
        name: fname,
        email,
        message,
      }),
      replyTo: email,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        success: false,
        error: "Failed to send enquiry. Please try again later.",
      };
    }

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    console.error("Enquiry form error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}