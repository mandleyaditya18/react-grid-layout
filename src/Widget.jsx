import React from "react";

const Widget = ({ id, item }) => {
  return (
    <div id={id} className="flex justify-center items-center h-full w-full">
      <h1 className="font-semibold text-2xl">{item.content}</h1>
    </div>
  );
};

export default Widget;
