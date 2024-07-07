import { useState } from "react";

export const BookCard = ({ book,showDetails,toggleDetails }) => {
  const {
    accessionNo,
    author,
    edition,
    title,
    pages,
    volume,
    publisher,
    source,
    billdate,
    cost,
    rack,
  } = book;
  // const [showDetails, setShowDetails] = useState(false);

  // const toggleDetails = () => {
  //   setShowDetails(!showDetails);
  // };

  return (
    <div className="p-4 shadow-md shadow-slate-300 cursor-pointer pb-4 max-w-screen-lg rounded-lg w-60  ">
      <div className="bg-slate-200 rounded-xl w-18 p-2 m-2 ">
        <h1 className="font-extrabold text-center">Title: {title}</h1>
        <h1 className="font-extrabold text-center"> Author: {author}</h1>
      </div>
      <div onClick={toggleDetails} className="w-8 h-8 relative left-36 p-2 flex items-center justify-center">
        <span className="font-bold text-nowrap ">
        {showDetails ? "Hide Details" : "Show Details"}
          </span>
      </div>

      {showDetails && (
        <div className="bg-white hover:shadow-lg top-50% left-50% p-8 z-50 border-2 shadow-md hover:shadow-slate-600 shadow-slate-400 rounded-sm  absolute"
        >
            <div className="shadow-lg  p-2 rounded-lg">

          <h1 className="font-bold">Accesion no: {accessionNo}</h1>
          <h1 className="font-extrabold">Edition: {edition}</h1>
          <h1 className="font-extrabold">Pages: {pages}</h1>
          <h1 className="font-extrabold">Volume: {volume}</h1>
          <h1 className="font-extrabold">Publisher: {publisher}</h1>
          <h1 className="font-extrabold">Source: {source}</h1>
          <h1 className="font-extrabold">Bill Date: {billdate}</h1>
          <h1 className="font-extrabold">Cost: {cost}</h1>
          <h1 className="font-extrabold">Rack: {rack}</h1>j
            </div>
          <button className="absolute top-2 right-2 border-none bg-white px-2 py-2 rounded-md hover:bg-yellow-200 cursor-pointer"
           
            onClick={toggleDetails}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
