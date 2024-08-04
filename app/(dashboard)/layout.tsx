export const metadata = {
  title: "NextJS",
  description: "generated by JavaScript",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      Dashboard Header
      <body>{children}</body>
    </html>
  );
}