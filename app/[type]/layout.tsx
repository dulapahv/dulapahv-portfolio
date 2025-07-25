import Footer from '@/components/footer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <div className="mx-auto max-w-2xl space-y-4">
        <Footer />
      </div>
    </>
  );
}
