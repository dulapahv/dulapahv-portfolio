import { Navbar } from "@/ui/navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <Navbar />
    </>
  );
}
