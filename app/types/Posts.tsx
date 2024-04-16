export type PostType = {
  name: string;
  title: string;
  id: string;
  createAt: string;
  user: {
    name: string;
    image: string;
  };
  comments: {
    createAt: string;
    id: string;
    postId: string;
    userId: string;
  };
};
