"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type PostProps = {
  id?: string;
};

type Comment = {
  postId?: string;
  title: string;
};

export default function AddComment({ id }: PostProps) {
  const [title, setTitle] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const queryClient = useQueryClient();

  let commentToastID: string;

  //Create a post
  const mutation = useMutation({
    mutationFn: async (data: Comment) => {
      await axios.post("/api/posts/addComment", { data });
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message, { id: "logout" });
      }
      setIsDisabled(false);
    },
    onSuccess: (data) => {
      toast.success("Added your comment 🔥", { id: "logout" });
      queryClient.invalidateQueries({ queryKey: ["Comment"] });
      setTitle("");
      setIsDisabled(false);
    },
  });

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    commentToastID = toast.loading("Adding your comment", { id: "logout" });
    setIsDisabled(true);
    mutation.mutate({ title, postId: id });
  };

  return (
    <form className="my-8" onSubmit={submitComment}>
      <h3>Add a comment</h3>
      <div className="flex flex-col my-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          type="text"
          name="title"
          className="p-4 text-lg rounded-md my-2"
        />
      </div>

      <div className="flex items-center justify-between gap-2">
        <p
          className={`font-bold text-sm ${
            title.length > 300 ? "text-red-700" : "text-gray-700"
          }`}
        >{`${title.length}/300`}</p>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Create a post🚀
        </button>
      </div>
    </form>
  );
}
