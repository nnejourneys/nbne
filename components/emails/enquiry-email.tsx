import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface EnquiryEmailProps {
  title?: string;
  name: string;
  email: string;
  message: string;
}

export const EnquiryEmail = ({
  title,
  name,
  email,
  message,
}: EnquiryEmailProps) => {
  const previewText = title 
    ? `New enquiry about ${title} from ${name}` 
    : `New enquiry from ${name}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>
            {title ? `Enquiry: ${title}` : "New Enquiry"}
          </Heading>
          
          <Section style={section}>
            <Text style={label}>From:</Text>
            <Text style={value}>{name}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>
          </Section>

          {title && (
            <Section style={section}>
              <Text style={label}>Enquiry About:</Text>
              <Text style={value}>{title}</Text>
            </Section>
          )}

          <Hr style={hr} />

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageText}>{message}</Text>
          </Section>

          <Hr style={hr} />
          
          <Text style={footer}>
            This enquiry was sent through your website enquiry form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "580px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
  padding: "0 48px",
};

const section = {
  padding: "0 48px",
  marginBottom: "16px",
};

const label = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px",
};

const value = {
  color: "#333",
  fontSize: "16px",
  margin: "0 0 16px",
};

const messageText = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 48px",
};