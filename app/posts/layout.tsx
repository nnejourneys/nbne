export const metadata = {
  title: "Blog | North by North East",
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
