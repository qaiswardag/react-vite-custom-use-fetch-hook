import { useState } from "react";
import { usePromise } from "./usePromise";

export const useFetch = function (
  url,
  fetchOptions = {},
  customFetchOptions = {
    isPending,
    additionalCallTime,
    abortTimeoutTime,
  }
) {
  // set "abort timeout" time to 8000 ms if not set
  if (customFetchOptions.abortTimeoutTime === undefined) {
    customFetchOptions.abortTimeoutTime = 80;
  }

  // set "additional call time" timeout to 0 if not set
  if (customFetchOptions.additionalCallTime === undefined) {
    customFetchOptions.additionalCallTime = 200;
  }

  // controller, signal, abort timeout, additional time out
  const controller = new AbortController();

  // abort
  const timer = setTimeout(() => {
    controller.abort();
  }, customFetchOptions.abortTimeoutTime);

  // load data
  const [fetchedData, setFetchedData] = useState(null);
  // pending
  const [isPending, setIsPending] = useState(false);
  // error
  const [isError, setIsError] = useState(false);

  // signal
  const signal = controller.signal;

  // set promise
  const promise = usePromise(customFetchOptions.additionalCallTime);

  // method
  const loadData = async function () {
    // try
    try {
      // set pending
      setIsPending(true);

      // wait for additional response time. additional time is set when calling the method
      await promise;

      // if loading time gets exceeded
      if (signal.aborted) {
        throw new Error(`Unable to fetch. The loading time has been exceeded.`);
      }

      // response
      const response = await fetch(url, fetchOptions);

      // check if response is ok
      if (response.status !== 200 && response.status !== 201) {
        // throw new error with returned error messages
        throw new Error(`Unable to fetch. ${response.statusText}`);
      }

      // set variable for content type.
      // application/json
      const contentType = response.headers.get("content-type");

      // check if request is application/json in the request header
      if (contentType.includes("application/json")) {
        // convert to json
        const json = await response.json();
        // set fetched data
        setFetchedData(json);
      }

      // set error
      setIsError(false);
      // set pending
      setIsPending(false);
      // clear timeout
      clearTimeout(timer);
      // response
      return response;

      // catch
    } catch (err) {
      // clear timeout
      clearTimeout(timer);
      // set pending
      setIsPending(false);
      // response
      const response = await fetch(url, fetchOptions);

      // abort fetch
      if (err.name === "AbortError") {
        setIsError("Error fetching data: The fetch was aborted.");
      }
      // handle errors
      if (err.name !== "AbortError") {
        // set variable for content type.
        // application/json
        const contentType = response.headers.get("content-type");
        // check if request is application/json in the request header
        if (contentType.includes("application/json")) {
          // json
          const json = await response.json();

          // check if fetched data is a string
          if (typeof json === "string") {
            setIsError(`Error fetching data: ${err.message}. ${json}`);
          }

          // check if fetched data is an object. If true insert all values into error.value
          if (Array.isArray(json)) {
            setIsError(`Error fetching data: ${err.message} ${json.join(" ")}`);
          }

          // check if fetched data is an object. If true insert all values into error.value
          if (
            typeof json === "object" &&
            !Array.isArray(json) &&
            json !== null
          ) {
            const errorsReceived = Object.values(json);

            setIsError(
              `Error fetching data: ${err.message} ${errorsReceived.join(" ")}`
            );
          }

          // set fetched data as we are receiving json in the fetch
          setFetchedData(json);

          // end if content type is application/json
        }

        // check if request is application/json in the request header
        if (!contentType.includes("application/json")) {
          setIsError(`Error fetching data: ${err.message}`);
          // set fetched data
        }
      }

      // response
      return response;
      // end catch
    }

    // end fetch data method
  };

  // return
  return {
    loadData,
    fetchedData,
    isPending,
    isError,
  };

  // end of use fetch method
};

export default useFetch;
