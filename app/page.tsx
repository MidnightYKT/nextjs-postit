"use client";
import axios from "axios";
import CreatePost from "./components/AddPost";
import { useQuery } from "@tanstack/react-query";
import { Flex, Spin } from "antd";

import Post from "./components/Post";
import { PostType } from "./types/Posts";

//Fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPost");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["Posts"],
  });
  console.log(data, "data");
  if (error) return error;
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
    <main>
      <CreatePost />
      {data?.map((post) => (
        <Post
          comments={post.comments}
          key={post.id}
          user={post.user}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </main>
  );
}
