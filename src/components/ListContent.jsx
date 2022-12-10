import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Spinner from "./loaders/Spinner.jsx";
import Error from "./errors/Errors";

function BlogList() {
  // // endpoints
  const endpoints = {
    posts: "http://localhost:3000/posts",
    users: "http://localhost:3000/users",
  };
  //
  // fetch list
  const {
    loadData: posts,
    isPending: isPendingPosts,
    isError: isErrorPosts,
  } = useFetch(
    endpoints.posts,
    {
      //method: "GET",
    },
    {
      additionalCallTime: 400,
      //abortTimeoutTime: 200
    }
  );
  // fetch list
  const {
    loadData: users,
    isPending: isPendingUsers,
    isError: isErrorUsers,
  } = useFetch(
    endpoints.users,
    {
      //method: "GET",
    },
    {
      additionalCallTime: 800,
      //abortTimeoutTime: 500,
    }
  );

  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20 bg-gray-50 flex grid grid-cols-2	 gap-4">
      <div className="bg-emerald-50 border-2 border-emerald-500 my-12 py-10 rounded relative">
        <h2 className="text-3xl font-bold tracking-tight text-emerald-500 sm:text-4xl text-center">
          <span className="block">All news posts</span>
        </h2>
        {posts &&
          posts.map((post) => (
            <div
              key={post.id}
              className="my-12 mx-10 pl-6 py-8 px-4 px-4 border-2 border border-gray-100 shaddow rounded bg-white"
            >
              <h2 className="text-xl my-2 mb-8 font-semibold">{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        {isPendingPosts && <Spinner></Spinner>}
        {isErrorPosts && <Error error={isErrorPosts}></Error>}
      </div>

      <div className="bg-red-50 border-2 border-red-400 my-12 py-10 rounded relative">
        <h2 className="text-3xl font-bold tracking-tight text-red-400 sm:text-4xl text-center">
          <span className="block">Our team</span>
        </h2>
        {users &&
          users.map((user) => (
            <div
              key={user.id}
              className="my-12 mx-10 pl-6 py-8 px-4 px-4 border-2 border border-gray-100 shaddow rounded bg-white"
            >
              <h2 className="text-xl my-2 mb-8 font-semibold">{user.name}</h2>
              <p>{user.job}</p>
            </div>
          ))}
        {isPendingUsers && <Spinner></Spinner>}
        {isErrorUsers && <Error error={isErrorUsers}></Error>}
      </div>
    </div>
  );
}

export default BlogList;
