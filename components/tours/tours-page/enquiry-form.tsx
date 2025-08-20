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
import { useActionState, useEffect } from "react";
import { sendEnquiryEmail } from "@/app/actions/enquiry";

const formSchema = z.object({
  title: z.string().optional(),
  fname: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z
    .string()
    .nonempty("Field is required")
    .email({ message: "Must be a valid email" }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
});

type EnquiryFormData = z.infer<typeof formSchema>;

interface EnquiryFormProps {
  title?: string;
}

export default function EnquiryForm({ title }: EnquiryFormProps) {
  const [state, formAction, isPending] = useActionState(sendEnquiryEmail, {
    success: false,
    error: null,
  });

  const form = useForm<EnquiryFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: title,
      fname: "",
      email: "",
      message: "",
    },
  });

  // Handle success/error states
  useEffect(() => {
    if (state.success) {
      toast(
        "Message successful! Thank you for your interest, we will get back to you as soon as possible."
      );
      form.reset({ title }); // Reset but keep the title
    }
  }, [state.success, form, title]);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state.error]);

  // Wrapper action that validates first
  const clientAction = async (browserFormData: FormData) => {
    // Get form values for validation
    const values = {
      title: browserFormData.get("title") as string,
      fname: browserFormData.get("fname") as string,
      email: browserFormData.get("email") as string,
      message: browserFormData.get("message") as string,
    };

    // Validate using the schema
    const result = formSchema.safeParse(values);
    
    if (!result.success) {
      // Set form errors if validation fails
      result.error.errors.forEach((error) => {
        const fieldName = error.path[0] as keyof EnquiryFormData;
        form.setError(fieldName, {
          type: "manual",
          message: error.message,
        });
      });
      return; // Don't proceed to server action
    }

    // Clear any previous errors
    form.clearErrors();
    
    // If validation passes, call the server action
    formAction(browserFormData);
  };

  return (
    <div className="my-1 ml-1 lg:w-1/2">
      <Form {...form}>
        <form action={clientAction} className="md:space-y-8">
          <input id="title" name="title" type="hidden" value={title} />
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
                      name="fname"
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
                      name="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                    name="message"
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
    </div>
  );
}