// import { useState, useEffect } from "react";
// import { usePromise } from "./usePromise";
//
export const useFetch = function (
  url,
  fetchOptions = {},
  customFetchOptions = {
    isPending,
    abortTimeoutTime,
    additionalCallTime,
  }
) {
  //   // set "abort timeout" time to 8000 ms if not set
  //   if (customFetchOptions.abortTimeoutTime === undefined) {
  //     customFetchOptions.abortTimeoutTime = 8000;
  //   }
  //
  //   // set "additional call time" timeout to 0 if not set
  //   if (customFetchOptions.additionalCallTime === undefined) {
  //     customFetchOptions.additionalCallTime = 0;
  //   }
  //
  //   // controller, signal, abort timeout, additional time out
  //   const controller = new AbortController();
  //
  //   // abort
  //   const timer = setTimeout(() => {
  //     controller.abort();
  //   }, customFetchOptions.abortTimeoutTime);
  //
  //   // load data
  //   const [fetchedData, setFetchedData] = useState(null);
  //   // pending
  //   const [isPending, setIsPending] = useState(false);
  //   // error
  //   const [isError, setIsError] = useState(false);
  //
  //   // signal
  //   const signal = controller.signal;
  //
  //   // set promise
  //   const promise = usePromise(customFetchOptions.additionalCallTime);
  //
  //   useEffect(() => {
  //     // method
  //     const loadData = async function () {
  //       // try
  //       try {
  //         // set pending
  //         setIsPending(true);
  //
  //         // wait for additional response time. additional time is set when calling the method
  //         await promise;
  //
  //         // response
  //         const response = await fetch(url, fetchOptions);
  //
  //         // if loading time gets exceeded
  //         if (signal.aborted) {
  //           throw new Error(
  //             `Unable to fetch. The loading time has been exceeded.`
  //           );
  //         }
  //
  //         // check if response is ok
  //         if (response.status !== 200 && response.status !== 201) {
  //           // throw new error with returned error messages
  //           throw new Error(`Unable to fetch. ${response.statusText}`);
  //         }
  //
  //         // set variable for content type.
  //         // application/json or text/html
  //         const contentType = response.headers.get("content-type");
  //
  //         // check if request is application/json in the request header
  //         if (contentType.includes("application/json")) {
  //           // convert to json
  //           const json = await response.json();
  //           // set fetched data
  //           setFetchedData(json);
  //         }
  //
  //         // set error
  //         setIsError(false);
  //         // set pending
  //         setIsPending(false);
  //
  //         // clear timeout
  //         clearTimeout(timer);
  //
  //         // catch
  //       } catch (err) {
  //         // abort fetch
  //         if (err.name === "AbortError") {
  //           setIsError("Error fetching data: The fetch was aborted.");
  //         }
  //         // handle errors
  //         if (err.name !== "AbortError") {
  //           // clear timeout
  //           clearTimeout(timer);
  //           // set error
  //           setIsError(`Error fetching data: ${err.message}`);
  //           // set pending
  //           setIsPending(false);
  //         }
  //
  //         // end catch
  //       }
  //     };
  //
  //     // invoke fetch data
  //     loadData();
  //
  //     // end of useEffect method
  //   }, [url]);
  //
  //   // return
  //   return {
  //     fetchedData,
  //     isPending,
  //     isError,
  //   };
};
//
export default useFetch;
