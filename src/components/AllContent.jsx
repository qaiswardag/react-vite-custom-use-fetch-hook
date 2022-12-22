import React, { useEffect } from 'react';
import useFetch from '../hooks/useFetch';
import Spinner from './loaders/Spinner.jsx';
import Error from './errors/Errors';

function AllContent() {
  //
  // endpoints
  const endpoints = {
    posts: 'http://localhost:3000/posts',
    users: 'http://localhost:3000/users',
    products: 'http://127.0.0.1:50004/api/test-api',
  };

  // const {
  //   loadData: loadDataAddTeamMember,
  //   isPending: isPendingAddTeamMember,
  //   isError: isErrorAddTeamMember,
  // } = useFetch(
  //   "http://localhost:3000/users",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       name: "Lorem ipsum",
  //       job: "Account Manager",
  //     }),
  //   },
  //   {
  //     // additionalCallTime: 1000,
  //     // abortTimeoutTime: 2000,
  //   }
  // );
  //

  // posts
  // posts
  // posts
  // posts
  const {
    loadData: loadDataPosts,
    fetchedData: posts,
    isPending: isPendingPosts,
    isError: isErrorPosts,
    setIsError: setIsErrorPosts,
  } = useFetch(
    endpoints.posts,
    {},
    {
      isPending: true,
      additionalCallTime: 1000,
      abortTimeoutTime: 8000,
    }
  );

  // use effect
  useEffect(() => {
    (async function () {
      try {
        await loadDataPosts(
          endpoints.posts,
          {},
          { additionalCallTime: 1000, abortTimeoutTime: 8000 }
        );
      } catch (err) {
        console.log(`Error: ${err}`);
        setIsErrorPosts((prevError) => [
          `${err}. ${prevError ? prevError : ''}`,
        ]);
      }
    })();
  }, []);
  // posts
  // posts
  // posts
  // posts
  //
  //
  // users
  // users
  // users
  // users
  const {
    loadData: loadDataUsers,
    fetchedData: users,
    isPending: isPendingUsers,
    isError: isErrorUsers,
    setIsError: setIsErrorUsers,
  } = useFetch(
    endpoints.posts,
    {},
    {
      isPending: true,
      additionalCallTime: 1000,
      abortTimeoutTime: 8000,
    }
  );

  // use effect
  useEffect(() => {
    (async function () {
      try {
        await loadDataUsers(
          endpoints.users,
          {},
          { additionalCallTime: 300, abortTimeoutTime: 0 }
        );
      } catch (err) {
        setIsErrorUsers((prevError) => [
          `${err}.  ${prevError ? prevError : ''}`,
        ]);
      }
    })();
  }, []);
  // users
  // users
  // users
  // users
  //
  //
  //
  //
  //
  //
  // products
  // products
  // products
  // products
  const {
    loadData: loadDataProducts,
    fetchedData: products,
    isPending: isPendingProducts,
    isError: isErrorProducts,
    setIsError: setIsErrorProducts,
  } = useFetch();

  // use effect
  useEffect(() => {
    (async function () {
      try {
        await loadDataProducts(
          endpoints.products,
          {},
          { additionalCallTime: 500, abortTimeoutTime: 8000 }
        );
      } catch (err) {
        setIsErrorProducts((prevError) => [
          `${err}. ${prevError ? prevError : ''}`,
        ]);
      }
    })();
  }, []);
  // products
  // products
  // products
  // products
  //
  //
  //
  //
  // post method for adding team member
  const addTeamMember = function () {
    loadDataAddTeamMember();
  };

  return (
    <div className='border-2 border-yellow-800 py-8 px-4 mb-32 mx-6 bg-yellow-50 rounded'>
      <div className='mx-auto max-w-7xl pt-6 px-4 sm:px-6 md:py-6 lg:px-8 lg:py-6 flex grid grid-cols-3 gap-4'>
        {/*<button*/}
        {/*  onClick={addTeamMember}*/}
        {/*  className="bg-blue-500 text-white py-2 px-4 mb-10 mx-auto block rounded flex items-center"*/}
        {/*>*/}
        {/*  + Team member*/}
        {/*  {isPendingAddTeamMember && (*/}
        {/*    <svg*/}
        {/*      role="status"*/}
        {/*      className="inline ml-4 w-4 h-4 text-white animate-spin dark:text-gray-600"*/}
        {/*      viewBox="0 0 100 101"*/}
        {/*      fill="none"*/}
        {/*      xmlns="http://www.w3.org/2000/svg"*/}
        {/*    >*/}
        {/*      <path*/}
        {/*        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"*/}
        {/*        fill="currentColor"*/}
        {/*      />*/}
        {/*      <path*/}
        {/*        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"*/}
        {/*        fill="#1C64F2"*/}
        {/*      />*/}
        {/*    </svg>*/}
        {/*  )}*/}
        {/*</button>*/}

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
        <div className='bg-emerald-50 border-2 border-emerald-500 my-12 py-10 rounded relative'>
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
                <p>{user.job}</p>
              </div>
            ))}
          {isPendingUsers && <Spinner></Spinner>}
          {isErrorUsers && <Error error={isErrorUsers}></Error>}
        </div>
        {/* TEAM  END */}

        {/* PRODUCTS  START */}
        <div className='bg-red-50 border-2 border-red-400 my-12 py-10 rounded relative'>
          <h2 className='text-3xl font-bold tracking-tight text-red-400 sm:text-4xl text-center'>
            <span className='block'>Our Products</span>
          </h2>
          {!isErrorProducts &&
            products &&
            products.products.map((product) => (
              <div
                key={product.id}
                className='my-12 mx-10 pl-6 py-8 px-4 px-4 border-2 border border-gray-100 shaddow rounded bg-white'
              >
                <h2 className='text-xl my-2 mb-8 font-semibold'>
                  {product.name}
                </h2>
                <p>{product.short_description}</p>
              </div>
            ))}
          {isPendingProducts && <Spinner></Spinner>}
          {isErrorProducts && <Error error={isErrorProducts}></Error>}
        </div>
        {/* POSTS  END */}
      </div>
    </div>
  );
}

export default AllContent;
