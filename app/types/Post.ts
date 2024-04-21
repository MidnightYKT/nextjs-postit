export type PostType = {
  name: string;
  title: string;
  id: string;
  createAt?: string;
  user: {
    name: string;
    image: string;
    email: string;
    id: string;
  };
  comments: {
    createAt: string;
    id: string;
    postId: string;
    userId: string;
    title: string;
    user: {
      email: string;
      id: string;
      image: string;
      name: string;
    };
  };
};
