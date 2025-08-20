"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Container } from "../styledcomps/container";
import { Heading } from "../styledcomps/heading";
import { useActionState, useEffect, startTransition } from "react"; 
import { sendContactEmail } from "@/app/actions/contact";

const formSchema = z.object({
  fname: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z
    .string()
    .nonempty("Field is required")
    .email({ message: "Must be a valid email" }),
  subject: z.string().min(3, {
    message: "Please enter a subject.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: false,
    error: null,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fname: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // Handle success/error states with useEffect to avoid render-time mutations
  useEffect(() => {
    if (state.success) {
      toast(
        "Message successful! Thank you for your interest, we will get back to you as soon as possible."
      );
      form.reset();
    }
  }, [state.success, form]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  // Custom submit handler that validates before calling server action
  const handleSubmit = async (data: FormData) => {
    // Create FormData object for server action
    const formData = new FormData();
    formData.append("fname", data.fname);
    formData.append("email", data.email);
    formData.append("subject", data.subject);
    formData.append("message", data.message);
    
    // Call the server action using startTransition
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <Container>
      <Heading className="mb-10 lg:w-11/12" size="xs" fontweight="medium">
        Get in touch to discuss your next adventure in the Northeast. We look
        forward to hearing from you.
      </Heading>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="md:space-y-8">
          <div className="grid md:grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="fname"
              render={({ field }) => (
                <FormItem className="mb-3 md:mb-0">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      {...field}
                      className="bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-3 md:mb-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      {...field}
                      className="bg-muted"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem className="mb-3 md:mb-0">
                <FormLabel>Subject</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please enter a subject"
                    {...field}
                    className="bg-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="mb-3 md:mb-0">
                <FormLabel>Your message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Your message"
                    {...field}
                    className="resize-none bg-muted"
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Submit"}
          </Button>
        </form>
      </Form>
    </Container>
  );
}