import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
const DeleteBook = ({ allBooks }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleDeleteBook = () => {
    setLoading(true);

    axios
      .delete(`http://localhost:8080/Allbooks/${id}`)
      .then((response) => {
        console.log(response);
        setLoading(false);
        enqueueSnackbar("Book deleted with Success", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.log(`Error was found while deleting : ${error}`);
        enqueueSnackbar("Error found while saving ", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">Are You Sure You want to delete this book?</h3>

        <button
          className="p-4 bg-red-600 text-white m-8 w-full"
          onClick={() => handleDeleteBook()}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  );
};

export default DeleteBook;
