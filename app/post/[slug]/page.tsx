"use client";

import AddComment from "@/app/components/AddComment";
import Post from "@/app/components/Post";
import { PostType } from "@/app/types/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import moment from "moment";

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

  return (
    <div>
      <Post
        id={data.id}
        user={data.user}
        avatar={data.user.image}
        postTitle={data.title}
        comments={data.comments}
      />
      <AddComment id={data.id} />
      {data?.comments?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-3 lg:p-8 rounded-md">
          <div className="flex justify-between items-center gap-2">
            <div className="flex">
              <Image
                width={24}
                height={24}
                src={comment.user?.image}
                alt="avatar"
              />
              <h3 className="ml-2">{comment?.user?.name}</h3>
            </div>
            <h3>{moment(comment?.createdAt).format("LLL")}</h3>
          </div>
          <div className="py-4">{comment.title}</div>
        </div>
      ))}
    </div>
  );
}
