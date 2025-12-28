import { Footer } from "@/components/footer";

export default function Layout({ children }: LayoutProps<"/[type]">) {
  return (
    <>
      {children}
      <div className="mx-auto max-w-3xl">
        <Footer />
      </div>
    </>
  );
}
