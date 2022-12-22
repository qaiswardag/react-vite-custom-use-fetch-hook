export const usePromise = function (time) {
  // new promise
  return new Promise((resolve) => {
    return setTimeout(() => {
      resolve();
    }, time);
  });
};
