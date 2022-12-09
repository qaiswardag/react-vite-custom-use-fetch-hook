import { useState } from "react";
import useFetch from "../hooks/useFetch";

function BlogList() {
  const { loadData } = useFetch("/data.json");

  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:py-16 lg:px-8 lg:py-20 bg-gray-50">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
        <span className="block">Ready to dive in?</span>
        <span className="block text-emerald-600">
          Start your free trial today.
        </span>
      </h2>

      {loadData &&
        loadData.map((post) => (
          <div
            key={post.id}
            className="my-12 mx-10 pl-10 py-12 px-4 border-2 border border-gray-100 shaddow rounded bg-white"
          >
            <h2 className="text-xl my-2 mb-8 font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
    </div>
  );
}

export default BlogList;
