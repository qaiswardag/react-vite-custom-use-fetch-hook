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
  // is pending, is error, fetched data
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fetchedData, setFetchedData] = useState(null);

  // controller, signal, abort timeout, additional time out
  const controller = new AbortController();
  const signal = controller.signal;

  // method
  const loadData = async function () {
    // set "is pending"
    if (customFetchOptions.isPending === undefined) {
      customFetchOptions.isPending = true;
    }
    // set "additional call time" timeout to 0 if not set
    if (customFetchOptions.additionalCallTime === undefined) {
      customFetchOptions.additionalCallTime = 0;
    }
    // set "abort timeout" time to 8000 ms if not set
    if (customFetchOptions.abortTimeoutTime === undefined) {
      customFetchOptions.abortTimeoutTime = 8000;
    }

    // abort
    const timer = setTimeout(() => {
      controller.abort();
    }, customFetchOptions.abortTimeoutTime);

    // try
    try {
      setIsPending(customFetchOptions.isPending);
      // set promise
      const promise = usePromise(customFetchOptions.additionalCallTime);

      // wait for additional response time. additional time is set when calling the method
      await promise;

      // if loading time gets exceeded
      if (signal.aborted) {
        setIsError(false);
        setIsPending(false);
        clearTimeout(timer);
        return Promise.reject(Error(`The loading time has been exceeded.`));
      }

      // response
      const response = await fetch(url, fetchOptions);

      // check if response is ok. if not throw error
      if (response.status !== 200 && response.status !== 201) {
        // throw new error with returned error messages
        throw new Error(`Unable to fetch. ${response.statusText}`);
      }

      // set variable for content type application/json
      const contentType = response.headers.get("content-type");
      // check if request is application/json in the request header
      if (contentType.includes("application/json")) {
        // convert to json
        const json = await response.json();
        // set fetched data
        setFetchedData(json);
      }

      setIsError(false);
      setIsPending(false);
      clearTimeout(timer);

      // response
      return response;

      // catch
    } catch (err) {
      // clear timeout
      clearTimeout(timer);
      // set pending
      setIsPending(false);
      // response;
      const response = await fetch(url, fetchOptions);

      // abort fetch
      if (err.name === "AbortError") {
        setIsError("Error fetching data: The fetch was aborted.");
      }
      // handle errors
      if (err.name !== "AbortError") {
        // set variable for content type application/json
        const contentType = response.headers.get("content-type");
        // check if request is application/json in the request header
        if (contentType.includes("application/json")) {
          // collect errors and convert errors to json
          const collectingErrorsJson = await response.json();

          // check if fetched data is a string
          if (typeof collectingErrorsJson === "string") {
            setIsError(
              `Error fetching data: ${err.message}. ${collectingErrorsJson}`
            );
          }

          // check if fetched data is an object
          if (Array.isArray(collectingErrorsJson)) {
            setIsError(
              `Error fetching data: ${err.message}. ${collectingErrorsJson.join(
                " "
              )}`
            );
          }

          // check if fetched data is an object
          if (
            typeof collectingErrorsJson === "object" &&
            !Array.isArray(collectingErrorsJson) &&
            collectingErrorsJson !== null
          ) {
            // convert errors received as object to array
            const errorsReceived = Object.values(collectingErrorsJson);

            setIsError(
              `Error fetching data: ${err.message}. ${errorsReceived.join(" ")}`
            );
          }

          // end if content type is application/json
        }

        // check if request is application/json in the request header
        if (!contentType.includes("application/json")) {
          setIsError(`Error fetching data: ${err.message}`);
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
