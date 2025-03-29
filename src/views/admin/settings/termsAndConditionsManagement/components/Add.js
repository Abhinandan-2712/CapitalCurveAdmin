import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

function Add({ existingPosts, addNewPost }) {
  const [content, setContent] = useState("");
  const [isError, setError] = useState("");
  const [message, setMessage] = useState("");

  const onContentChange = (value) => {
    setContent(value);
  };

  const addDetails = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (content.trim().length < 50) {
      setError(
        "Required: Add description with a minimum length of 50 characters."
      );
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in. Please log in to add details.");
        return;
      }

      const formdata = new FormData();
      formdata.append("content", content);

      const response = await axios.post(
        "https://capital-curve-apis.onrender.com/api/tnc/create-terms-and-conditions",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      if (response.status === 200) {
        setMessage("Details added successfully!");
        addNewPost(content); // Directly add new content to existing list
        setContent(""); // Clear editor
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to submit. Try again later."
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={addDetails} className="space-y-6">
        <div>
          <label
            htmlFor="content"
            className="font-bold text-navy-900 dark:text-white"
          >
            Description
          </label>
          <div className="rounded-md bg-lightPrimary dark:bg-navy-900 dark:text-white">
            <EditorToolbar toolbarId="t1" />
            <div className="h-40 w-full">
              <ReactQuill
                id="content"
                theme="snow"
                value={content}
                onChange={onContentChange}
                placeholder="Write something awesome..."
                modules={modules("t1")}
                formats={formats}
              />
            </div>
          </div>
        </div>

        {isError && <div className="text-red-500">{isError}</div>}
        {message && <div className="text-green-500">{message}</div>}

        <div className="text-right">
          <button
            type="submit"
            className="rounded-lg bg-blueSecondary px-6 py-2 text-white dark:bg-brand-400 hover:dark:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
