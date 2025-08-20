import { Button } from "@/components/ui/button";

interface EmailInfo {
  link: string;
  name: string;
}

interface FooterData {
  copyright: string;
  email: EmailInfo;
}

interface CopyrightProps {
  footerdata: FooterData;
}

export default function Copyright({ footerdata }: CopyrightProps) {
  return (
    <>
      <div className="pt-5 pb-5 md:pb-10 relative text-center md:text-start">
        <p className="me-1 text-foreground">
          © {new Date().getFullYear()} {footerdata.copyright}
          <a href={footerdata.email.link} title={footerdata.email.name}>
            <Button variant="link" className="text-foreground">
              {footerdata.email.name}
            </Button>
          </a>
        </p>
      </div>
    </>
  );
}
