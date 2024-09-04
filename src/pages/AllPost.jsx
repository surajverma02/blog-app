import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import services from "../services/appwriteConfig";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    services.getAllPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full">
        <Container>
          <div className="mx-auto max-w-2xl py-52 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              No post yet <br /> or <br /> Refresh Page
            </h1>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
