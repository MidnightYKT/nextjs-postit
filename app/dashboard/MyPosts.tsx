"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthPosts } from "../types/AuthPosts";
import EditPost from "./EditPost";
import { Flex, Spin } from "antd";

const fetchAuthPosts = async () => {
  const response = await axios.get("/api/posts/authPost");
  return response.data;
};

export default function MyPosts({ session }) {
  const { data, isLoading } = useQuery<AuthPosts>({
    queryFn: fetchAuthPosts,
    queryKey: ["auth-posts"],
  });
  if (isLoading)
    return (
      <Flex
        align="center"
        gap="middle"
        className="h-screnn flex item-center justify-center"
      >
        <Spin size="large" />
      </Flex>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome back {session?.user?.name}!
      </h1>
      {data?.posts?.map((post) => (
        <EditPost
          id={post.id}
          key={post.id}
          avatar={data.image}
          name={data.name}
          title={post.title}
          comments={post.comments}
        />
      ))}
    </div>
  );
}
