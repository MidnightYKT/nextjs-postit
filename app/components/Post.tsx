"use client";

import Image from "next/image";
import Link from "next/link";

export default function Post({ id, avatar, user, postTitle, comments }: any) {
  let img: string = avatar || "";

  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className=" rounded-full"
          width={32}
          height={32}
          src={img}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{user?.name}</h3>
      </div>
      <div className="my-8">
        <p className=" break-all">{postTitle}</p>
      </div>
      <div className="flex gap-4 cursor-pointer items-center">
        <Link href={`/post/${id}`}>
          <p className="text-sm font-bold text-gray-700">
            {comments?.length} Comment
          </p>
        </Link>
      </div>
    </div>
  );
}
