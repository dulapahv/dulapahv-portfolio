import { getManyBlog } from "@/data/get-blog";

export const revalidate = 3600; // revalidate the data at most every hour

const Page = () => {
  // const item = await getBlog(id);

  return (
    <div>
      <div>All Blog</div>
    </div>
  );
};

export default Page;
