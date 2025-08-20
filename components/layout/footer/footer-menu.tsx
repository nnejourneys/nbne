import { Button } from "@/components/ui/button";

interface MenuItem {
  href: string;
  title: string;
}

interface FooterMenuData {
  title: string;
  items: MenuItem[];
}

interface FooterMenuProps {
  footermenu: FooterMenuData;
}

export default function FooterMenu({ footermenu }: FooterMenuProps) {
  return ( 
      <div className="basis-1/2 md:basis-1/6">
        <h6 className="font-bold mb-4 text-foreground">
          {footermenu.title}
        </h6>
        <ul className="ps-0">
          {footermenu.items.map((item, index) => (
            <li key={index} className="-ms-3 group max-w-fit">
              <a href={item.href} title={item.title}>
                <Button variant="link">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-foreground group-hover:text-primary"
                  >
                    <path
                      d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <p className="text-foreground group-hover:text-primary">
                    {item.title}
                  </p>
                </Button>
              </a>
            </li>
          ))}
        </ul>
      </div> 
  );
}