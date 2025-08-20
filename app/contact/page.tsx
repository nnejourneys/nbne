import React from "react";
import Contacts from "@/components/page-sections/contacts";
import ContactForm from "@/components/page-sections/contact-form";
import { Container } from "@/components/styledcomps/container";

export default function Contact() {
  return (
    <Container width="marginxy">
      <div className="grid lg:grid-cols-2 gap-2">
        <div>
          <Contacts />
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
