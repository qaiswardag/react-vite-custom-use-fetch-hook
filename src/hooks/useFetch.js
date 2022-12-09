import React, { useState, useEffect } from "react";
import { usePromise } from "./usePromise";

export const useFetch = function (
  options = {
    IsPending: true,
    abortTimeoutTime,
    additionalCallTime,
  },
  data = {}
) {
  // log
  console.log("use fetch method ran");

  // set abort timeout time to 8000 if not set
  if (options.abortTimeoutTime === undefined) {
    options.abortTimeoutTime = 8000;
  }

  // set response timeout to 0 if not set
  if (options.additionalCallTime === undefined) {
    options.additionalCallTime = 0;
  }

  // timer
  const timer = setTimeout(() => {
    controller.abort();
  }, options.abortTimeoutTime);

  // load data
  const [loadData, setLoadData] = useState(null);
  // pending
  const [isPending, setIsPending] = useState(false);
  // error
  const [isError, setIsError] = useState(false);

  // controller, signal, abort timeout, additional time out
  const controller = new AbortController();
  const signal = controller.signal;

  // set promise
  const promise = usePromise(options.additionalCallTime);

  useEffect(() => {
    // method
    const fetchData = async function () {
      // try
      try {
        // set pending
        setIsPending(true);

        // wait for additional response time
        await promise;

        // response
        const response = await fetch(data.url, data);

        // if loading time gets exceeded
        if (signal.aborted) {
          throw new Error(
            `Unable to fetch. The loading time has been exceeded.`
          );
        }

        // handle errors
        if (response.status !== 200 && response.status !== 201) {
          // throw new error with returned error messages
          throw new Error(`Unable to fetch. ${response.statusText}`);
        }

        // convert to json
        const json = await response.json();
        // set load data
        setLoadData(json);

        // set error
        setIsError(false);
        // set pending
        setIsPending(false);

        // catch errors
      } catch (err) {
        // set error
        setIsError(`Error fetching data: ${err.message}`);
        // set pending
        setIsPending(false);
      }
    };

    // inwoke fetch data
    fetchData();
  }, [options.url, options.abortTimeoutTime, options.additionalCallTime]);
  // return
  return {
    loadData,
    isPending,
    isError,
  };
};

export default useFetch;
