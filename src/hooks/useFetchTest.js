import React, { useState, useEffect } from "react";
import { usePromise } from "./usePromise";

export const useFetchTest = function () {
  console.log("use fetch ran");
  // data, isPending, error
  const [loadData, setLoadData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  // controller, signal, abort timeout, additional time out
  const controller = new AbortController();
  const signal = controller.signal;
  const abortTimeout = useState(null);
  const additionalTime = useState(false);

  // url
  //const [url, setUrl] = useState(null);
  // fetch data method
  const [fetchData, setFetchData] = useState();

  useEffect(() => {
    setFetchData(async function (data = {}) {
      console.log("data obj er:", data);
      try {
        setIsPending(true);
        const response = await fetch(data.url);

        // throw error
        if (response.ok === false) {
          throw new Error(response.statusText);
        }
        const json = await response.json();

        // set data
        setLoadData(json);

        console.log("data is:", json);
        setError(false);
        setIsPending(false);
      } catch (err) {
        console.log("Error while fetching data:", err);
        setError(err);
        setIsPending(false);
      }
      // end method
    });

    // invoke function
    //fetchData();
  }, []);

  // return
  return {
    setFetchData,
    isPending,
    error,
  };
};

export default useFetchTest;
