import { Footer } from '@/components/footer';

export default function Layout({ children }: LayoutProps<'/contact'>) {
  return (
    <>
      {children}
      <div className="mx-auto max-w-2xl">
        <Footer />
      </div>
    </>
  );
}
