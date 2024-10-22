import React from "react";

const LoadingBg = () => {
  return (
    <div className="bg-yellow-200">
      {loading ? (
        <div className="flex justify-center items-center h-full gap-4">
          <Spinner color="warning" />
          <p className="text-white flex flex-col">Wait a Second</p>
        </div>
      ) : (
        <ColoumEdit allBarang={allBarang} search={search} />
      )}
    </div>
  );
};

export default LoadingBg;
