import Footer from '@/components/footer';

export default function Layout(props: LayoutProps<'/contact'>) {
  return (
    <>
      {props.children}
      <div className="mx-auto max-w-2xl">
        <Footer />
      </div>
    </>
  );
}
