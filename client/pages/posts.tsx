import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import { withAuth } from "../constants/HOCs";
import { TPost } from "../constants/Types";
import Link from "next/link";
import { isEqual } from "lodash";

function Posts(props) {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [fetchingPosts, setFetchingPosts] = useState<boolean>(false);
  const { session } = props;

  useEffect(() => {
    if (!session) {
      return;
    }

    async function getPosts() {
      setFetchingPosts(true);
      const response = await fetch("http://127.0.0.1:8000/api/posts", {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${session?.accessToken}`,
        }),
      });

      if (response.ok) {
        const postData: TPost[] = await response.json();

        if (!isEqual(posts, postData)) {
          setPosts(postData);
        }
      }

      setFetchingPosts(false);
    }

    // initiate the post fetching mechanism once
    getPosts();
    const intervalId = setInterval(() => getPosts(), 10 * 1000);

    // useEffect cleanup
    return () => clearInterval(intervalId);
  }, [session]);

  return (
    <div>
      <h2>Fetched at {JSON.stringify(new Date())}</h2>
      <Link href="/">Back to homepage</Link>
      {posts.map((post) => (
        <Post key={post.title} post={post} />
      ))}
    </div>
  );
}

export default withAuth(3 * 60)(Posts);
