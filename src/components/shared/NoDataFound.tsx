const NoDataFound = ({ message = "No data found" }) => {
  return (
    <div className="inline-flex items-center justify-center gap-3">
      <p className="text-gray-600 dark:text-gray-300 text-lg text-center">{message}</p>
    </div>
  );
};

export default NoDataFound;
