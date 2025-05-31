import Breadcrumb from '@/components/breadcrumb';

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <Breadcrumb />
      {children}
    </div>
  );
}
