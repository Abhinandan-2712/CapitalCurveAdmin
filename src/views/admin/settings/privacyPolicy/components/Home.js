import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "components/card";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import toast, { Toaster } from "react-hot-toast";

function PrivacyAndPolicy() {
  const [content, setContent] = useState("");

  const fetchPrivacyPolicy = useCallback(async () => {
    const loadingToast = toast.loading("Fetching Privacy Policy...");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.dismiss(loadingToast);
        toast.error("You are not logged in. Please log in again.");
        return;
      }

      const response = await axios.get(
        "https://capital-curve-apis.onrender.com/api/privacy-policy/get-privacy-policy",
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      toast.dismiss(loadingToast);
      if (response.data.success) {
        setContent(response.data.result.content);
        toast.success("Privacy Policy loaded successfully!");
      } else {
        toast.error("Failed to fetch Privacy Policy.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Error fetching Privacy Policy!");
    }
  }, []);

  useEffect(() => {
    fetchPrivacyPolicy();
  }, [fetchPrivacyPolicy]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (content.trim().length < 50) {
      toast.error("Content must be at least 50 characters!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in. Please log in again.");
      return;
    }

    const loadingToast = toast.loading("Updating Privacy Policy...");
    try {
      const formdata = new FormData();
      formdata.append("content", content);

      const response = await axios.post(
        "https://capital-curve-apis.onrender.com/api/privacy-policy/create-privacy-policy",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      toast.dismiss(loadingToast);
      response.status === 200
        ? toast.success("Privacy Policy updated successfully!")
        : toast.error("Failed to update. Try again!");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || "Update failed!");
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
                Privacy And Policy
              </h1>
            </header>

            <form
              onSubmit={handleSubmit}
              className="rounded-sm border border-gray-600 bg-lightPrimary dark:border-gray-700 dark:bg-navy-900 dark:text-white"
            >
              <div className="border-b border-gray-600 dark:border-gray-700">
                <EditorToolbar toolbarId="t1" />
              </div>

              <ReactQuill
                theme="snow"
                value={content}
                onChange={handleContentChange}
                placeholder="Write your Privacy Policy..."
                modules={modules("t1")}
                formats={formats}
                className="min-h-16 rounded-md bg-lightPrimary dark:bg-navy-900 dark:text-white"
              />

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

export default PrivacyAndPolicy;
