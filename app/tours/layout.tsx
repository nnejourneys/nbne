export const metadata = {
  title: "Tours | North by North East",
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
