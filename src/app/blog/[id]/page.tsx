export const revalidate = 3600; // revalidate the data at most every hour

const Page = async ({ params }: { params: { id: string } }) => {
  // const item = await getBlog(id);

  return (
    <div>
      <div>HI {params.id}</div>
    </div>
  );
};

export default Page;
