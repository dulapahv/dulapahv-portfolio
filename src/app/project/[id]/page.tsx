const Page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <div>HI {params.id}</div>
    </div>
  );
};

export default Page;
