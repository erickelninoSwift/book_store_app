import React from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";
const CreateBook = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitBook = async () => {
    const newBook = {
      title: title,
      author: author,
      publishedYear: publishedYear,
    };

    setLoading(true);
    axios
      .post("http://localhost:8080/Allbooks", newBook)
      .then((response) => {
        console.log(response);
        enqueueSnackbar("Book was created succesfully ", {
          variant: "success",
        });
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(`Error was found ${error}`);
        enqueueSnackbar(`Error :${error}`, { variant: "error" });
        setLoading(false);
      });

    console.log(newBook);
  };

  return (
    <div className="p-10 my-20">
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <h1 className="text-3xl my-4">Create Book</h1> <BackButton />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2  w-full "
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Publish Year</label>
              <input
                type="number"
                value={publishedYear}
                onChange={(e) => setPublishedYear(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2  w-full "
              />
            </div>
            <button
              className="p-2 bg-sky-300 m-8"
              onClick={() => handleSubmitBook()}
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateBook;
