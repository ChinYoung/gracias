import { fetchStrapi } from "@/fns/fetchStrapi";
import { TStrapiBlogs, TStrapiRes } from "@/types/strapi.type";
import dayjs from "dayjs";
import Link from "next/link";

const Blog = async () => {
  const blogs = await fetchStrapi("blogs");
  const jsonData = await blogs.json<TStrapiRes<TStrapiBlogs[]>>();
  return (
    <div className="flex flex-col gap-4">
      {jsonData.data.map((blog) => (
        <div key={blog.id}>
          <Link href={`/blog/article?id=${blog.documentId}`}>
            <h2 className="font-serif text-lg">{blog.title}</h2>
            <p className="font-serif text-sm opacity-50">{dayjs(blog.createdAt).format("YYYY-MM-DD")}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blog;
