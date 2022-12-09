function Error(error) {
  return (
    <div
      className="p-4 my-8 mx-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
      role="alert"
    >
      <span className="font-medium">{error.error}</span>
    </div>
  );
}

export default Error;
