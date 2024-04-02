import React from "react";
import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import BookTable from "../components/myHome/BookTable";
import Bookscard from "../components/myHome/Bookscard";
const Home = () => {
  const [Books, setBooks] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/Allbooks")
      .then((response) => {
        setBooks(() => response.data.books);
        setLoading(false);
      })
      .catch((error) => {
        console.log(`Error while fetching data Front end : ${error}`);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-32">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("table")}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Book - List</h1>
        <Link to="/createbook">
          <MdOutlineAddBox className="text-sky-700 text-4xl" />
        </Link>
      </div>
      {Loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BookTable Books={Books} />
      ) : (
        <Bookscard Books={Books} />
      )}
    </div>
  );
};

export default Home;
{
  /* <Route path="/deletebook/:id" element={<DeleteBook />} />
<Route path="/showbook/:id" element={<ShowBook />} />
<Route path="/editbook/:id" element={<EditBook />} /> */
}
