import React from "react";
import { TPost } from "../constants/Types";

type TPostProps = {
  post: TPost;
};

function Post(props: TPostProps) {
  const {
    post: { userId, postId, body, title },
  } = props;

  return (
    <div>
      <h3>Post Title: {title}</h3>
      <em>by User {userId}</em>
      <h5>{body}</h5>
      <hr />
    </div>
  );
}

export default Post;
