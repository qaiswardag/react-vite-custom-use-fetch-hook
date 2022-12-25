import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Spinner from './loaders/Spinner.jsx';
import Error from './errors/Errors';

function AllContent() {
  //
  // endpoints
  const endpoints = {
    posts: 'https://jsonplaceholder.typicode.com/posts',
    users: 'https://jsonplaceholder.typicode.com/users',
  };
  // posts
  const {
    loadData: loadDataPosts,
    fetchedData: posts,
    isPending: isPendingPosts,
    isError: isErrorPosts,
    setIsError: setIsErrorPosts,
  } = useFetch();

  // use effect
  useEffect(() => {
    (async function () {
      try {
        await loadDataPosts(
          endpoints.posts,
          {},
          { additionalCallTime: 300, abortTimeoutTime: 8000 }
        );
      } catch (err) {
        setIsErrorPosts((prevError) => [
          `${err}. ${prevError ? prevError : ''}`,
        ]);
      }
    })();
  }, []);
  // posts
  // users
  const {
    loadData: loadDataUsers,
    fetchedData: users,
    isPending: isPendingUsers,
    isError: isErrorUsers,
    setIsError: setIsErrorUsers,
  } = useFetch();

  // use effect
  useEffect(() => {
    (async function () {
      try {
        await loadDataUsers(
          endpoints.users,
          {},
          { additionalCallTime: 600, abortTimeoutTime: 8000 }
        );
      } catch (err) {
        setIsErrorUsers((prevError) => [
          `${err}.  ${prevError ? prevError : ''}`,
        ]);
      }
    })();
  }, []);
  // users

  return (
    <div className='border-2 border-yellow-800 py-8 px-4 mb-32 mx-6 bg-yellow-50 rounded'>
      <div className='mx-auto max-w-7xl pt-6 px-4 sm:px-6 md:py-6 lg:px-8 lg:py-6 flex grid grid-cols-2 gap-4'>
        {/* POSTS  START */}
        <div className='bg-emerald-50 border-2 border-emerald-500 my-12 py-10 rounded relative'>
          <h2 className='text-3xl font-bold tracking-tight text-emerald-500 sm:text-4xl text-center'>
            <span className='block'>All news posts</span>
          </h2>
          {!isErrorPosts &&
            posts &&
            Array.isArray(posts) &&
            posts.map((post) => (
              <div
                key={post.id}
                className='my-12 mx-10 pl-6 py-8 px-4 px-4 border-2 border border-gray-100 shaddow rounded bg-white'
              >
                <h2 className='text-xl my-2 mb-8 font-semibold'>
                  {post.title}
                </h2>
                <p>{post.body}</p>
              </div>
            ))}
          {isPendingPosts && <Spinner></Spinner>}
          {isErrorPosts && <Error error={isErrorPosts}></Error>}
        </div>
        {/* POSTS  END */}

        {/* TEAM  START */}
        <div className='bg-yellow-100 border-2 border-emerald-500 my-12 py-10 rounded relative'>
          <h2 className='text-3xl font-bold tracking-tight text-emerald-500 sm:text-4xl text-center'>
            <span className='block'>Team</span>
          </h2>
          {!isErrorUsers &&
            users &&
            Array.isArray(users) &&
            users.map((user) => (
              <div
                key={user.id}
                className='my-12 mx-10 pl-6 py-8 px-4 px-4 border-2 border border-gray-100 shaddow rounded bg-white'
              >
                <h2 className='text-xl my-2 mb-8 font-semibold'>{user.name}</h2>
                <p>{user.email}</p>
              </div>
            ))}
          {isPendingUsers && <Spinner></Spinner>}
          {isErrorUsers && <Error error={isErrorUsers}></Error>}
        </div>
        {/* TEAM  END */}
      </div>
    </div>
  );
}

export default AllContent;
