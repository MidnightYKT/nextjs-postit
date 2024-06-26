import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession, unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).json({ message: "Please sign in" });

  if (req.method === "DELETE") {
    //Get Auth Users Posts
    try {
      const postId = req.body;
      const result = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      return res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: "Error has occured whilst making a post" });
    }
  }
}
