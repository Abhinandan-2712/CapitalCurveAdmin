import React, { useState } from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";

function Add() {
  const [userInfo, setUserInfo] = useState({
    title: "",
    description: "",
    information: "",
  });
  
  const [isError, setError] = useState(null);

  const onChangeValue = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onDescriptionChange = (value) => {
    setUserInfo({ ...userInfo, description: value });
  };

  const addDetails = async (event) => {
    event.preventDefault();
    setError(null);

    if (userInfo.description.trim().length < 50) {
      setError("Required: Add description with a minimum length of 50 characters.");
      return;
    }
    
    // Submit form data logic here
    console.log("Form Submitted", userInfo);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={addDetails} className="space-y-6">
        <div>
          {/* <label htmlFor="title" className="font-bold text-navy-900 dark:text-white">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={userInfo.title}
            onChange={onChangeValue}
            className="w-full p-2 rounded bg-lightPrimary dark:bg-navy-900 dark:text-white focus:ring-0"
            placeholder="Title"
            required
            autoComplete="off"
          /> */}
        </div>
        
        <div>
          <label htmlFor="description" className="font-bold text-navy-900 dark:text-white">Description</label>
          <div className="w-full  bg-lightPrimary dark:bg-navy-900 dark:text-white">
            <EditorToolbar toolbarId="t1" />
          </div>
          <div className="w-full  bg-lightPrimary dark:bg-navy-900 dark:text-lightPrimary h-40">
            <ReactQuill
              id="description"
              className="w-full h-40"
              theme="snow"
              value={userInfo.description}
              onChange={onDescriptionChange}
              placeholder="Write something awesome..."
              modules={modules("t1")}
              formats={formats}
            />
          </div>
        </div>
        
        {isError && <div className="text-red-500">{isError}</div>}
        
        <div className="text-right">
          <button type="submit" className="px-6 py-2 bg-blueSecondary dark:bg-brand-400 text-white rounded-lg hover:dark:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;
