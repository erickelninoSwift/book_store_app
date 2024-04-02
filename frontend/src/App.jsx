import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";

const App = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [allBooks, setAllbooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/Allbooks")
      .then((response) => {
        setAllbooks(() => response.data.books);
      })
      .catch((erro) => {
        console.log(erro);
      });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/createbook" element={<CreateBook />} />
      <Route
        path="/deletebook/:id"
        element={<DeleteBook allBooks={allBooks} />}
      />
      <Route path="/showbook/:id" element={<ShowBook allBooks={allBooks} />} />
      <Route path="/editbook/:id" element={<EditBook allBooks={allBooks} />} />
    </Routes>
  );
};

export default App;
