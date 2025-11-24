import { Footer } from '@/components/footer';

export default function Layout({ children }: LayoutProps<'/contact'>) {
  return (
    <>
      {children}
      <div className="mx-auto max-w-3xl">
        <Footer />
      </div>
    </>
  );
}
