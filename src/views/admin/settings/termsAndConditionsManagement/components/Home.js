
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "components/card";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import toast, { Toaster } from "react-hot-toast";

function TermsAndConditions() {
  const [content, setContent] = useState("");

  const fetchTermsAndConditions = useCallback(async () => {
    const loadingToast = toast.loading("Fetching Terms and Conditions...");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.dismiss(loadingToast);
        toast.error("You are not logged in. Please log in again.");
        return;
      }

      const response = await axios.get(
        "https://capital-curve-apis.onrender.com/api/tnc/get-terms-and-conditions",
        {
          headers: {
            "Content-Type": "application/json",
            token,
          },
        }
      );

      toast.dismiss(loadingToast);
      if (response.data.success) {
        setContent(response.data.result.content);
        toast.success("Terms and Conditions loaded successfully!");
      } else {
        toast.error("Failed to fetch terms and conditions");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error fetching data");
    }
  }, []);

  useEffect(() => {
    fetchTermsAndConditions();
  }, [fetchTermsAndConditions]);

  const handleContentChange = (value) => setContent(value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (content.trim().length < 50) {
      toast.error("Content must be at least 50 characters.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in. Please log in again.");
      return;
    }

    const loadingToast = toast.loading("Updating Terms and Conditions...");
    try {
      const formdata = new FormData();
      formdata.append("content", content);

      const response = await axios.post(
        "https://capital-curve-apis.onrender.com/api/tnc/create-terms-and-conditions",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token,
          },
        }
      );

      toast.dismiss(loadingToast);
      response.status === 200
        ? toast.success("Terms and Conditions updated successfully!")
        : toast.error("Failed to update. Try again.");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || "Update failed.");
    }
  };

  return (
    <div className="App">
      <Toaster />
      <div className="container mx-auto">
        <Card extra="w-full sm:overflow-auto px-6 py-6">
          <div className="space-y-6">
            <header className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
                Terms And Conditions
              </h1>
            </header>
            <form
              onSubmit={handleSubmit}
              className="rounded-sm border border-gray-600 bg-lightPrimary dark:border-gray-700 dark:bg-navy-900 dark:text-white"
            >
              <div className="border-b border-gray-600 dark:border-gray-700">
                <EditorToolbar toolbarId="t1" />
              </div>
              <div>
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Write your terms and conditions..."
                  modules={modules("t1")}
                  formats={formats}
                  className="scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-800 scrollbar-track-white min-h-16 w-full overflow-y-auto rounded-md bg-lightPrimary dark:bg-navy-900 dark:text-white sm:overflow-auto"
                />
              </div>
              <div className="px-6 py-6 text-right">
                <button
                  type="submit"
                  className="rounded-lg bg-blueSecondary px-6 py-2 text-white dark:bg-brand-400 hover:dark:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TermsAndConditions;
