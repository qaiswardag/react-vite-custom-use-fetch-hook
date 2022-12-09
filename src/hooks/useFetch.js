import { useState, useEffect } from "react";
import { usePromise } from "./usePromise";

export const useFetch = function (url) {
  // data, isPending, error
  const [loadData, setLoadData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);
  // controller, signal, abort timeout, additional time out
  const controller = new AbortController();
  const signal = controller.signal;
  const abortTimeout = useState(null);
  const additionalTime = useState(false);

  useEffect(() => {
    const fetchData = async function () {
      try {
        setIsPending(true);
        const response = await fetch(url);

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
    };

    // invoke function
    fetchData();
  }, [url]);

  // return
  return {
    loadData,
    isPending,
    error,
  };
};

export default useFetch;
