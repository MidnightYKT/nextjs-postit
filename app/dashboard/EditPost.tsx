"use client";

import Image from "next/image";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

export default function EditPost({ avatar, name, title, comments, id }) {
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div>
        <Image width={32} height={32} src={avatar} alt="avatar" />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8">
        <h3 className="break-all">{title}</h3>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm font-bold text-gray-700">
          {comments?.length} Comments
        </p>
        <button className="text-sm font-bold text-red-500">Delete</button>
      </div>
    </div>
  );
}
