import FooterMenu from "./footer-menu";
import SocialLinks from "./social-links";
import Copyright from "./copyright";
import Developer from "./developer";
import FooterIntro from "./footer-intro";
import Footerdata from "@/data/footer.json";
import Menuitems from "@/data/menu.json";
import BackTopBtn from "./back-top-btn";
import { Container } from "@/components/styledcomps/container"; 

export default function Footer() {
  const importantlinks = Menuitems.menu.footer[0];
  const quicklinks = Menuitems.menu.footer[1];
  return (
    <footer className="relative bg-muted border-t-2 border-primary overflow-hidden">
      <Container width="marginx" animate={false}>
        <div className="grid md:grid-cols-4 gap-8 pt-20">
          <div className="md:col-span-2 mb-5 z-10">
            <FooterIntro footerdata={Footerdata} />
            <SocialLinks footerdata={Footerdata} />
          </div>
          <FooterMenu footermenu={importantlinks} />
          <FooterMenu footermenu={quicklinks} />
        </div>
        <Copyright footerdata={Footerdata} />
      </Container>
      <BackTopBtn />
      <Developer />
    </footer>
  );
}
