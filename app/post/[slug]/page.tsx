"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

export default function PostDetail(url: URL) {
  const { data, isLoading } = useQuery<PostType[]>({
    queryKey: ["detail-post"],
    queryFn: () => fetchDetails(url.params.slug),
  });
  if (isLoading) return "Loading...";
  console.log(data);

  return (
    <div>
      <Post
        id={data.id}
        user={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        comments={data.comments}
      />
      <AddComment id={data.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment.user?.image}
              alt="avatar"
            />
            <h3>{comment?.user?.name}</h3>
            <h3>{comment?.createdAt}</h3>
          </div>
          <div className="py-4">{comment.title}</div>
        </div>
      ))}
    </div>
  );
}
