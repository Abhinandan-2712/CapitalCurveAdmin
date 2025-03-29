import React, { useState, useEffect, useCallback } from "react";
import Card from "components/card";
import toast, { Toaster } from "react-hot-toast";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import axios from "axios";

function TradingRuleManagement() {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchTradingRulesManagement = useCallback(async () => {
    const loadingToast = toast.loading("Fetching Trading Rules...");
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.dismiss(loadingToast);
        toast.error("You are not logged in. Please log in again.");
        return;
      }

      const response = await axios.get(
        "https://capital-curve-apis.onrender.com/api/trading-rule/get-trading-rule",
        {
          headers: {
            "Content-Type": "application/json",
            token: token,
          },
        }
      );

      toast.dismiss(loadingToast);
      if (response.data.success) {
        setContent(response.data.result.tradingRule.content);
        toast.success("Trading rules loaded successfully!");
      } else {
        setError("Failed to fetch trading rules management.");
        toast.error("Failed to fetch trading rules management.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      setError("Failed to fetch trading rules management.");
      toast.error("Failed to fetch trading rules management.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTradingRulesManagement();
  }, [fetchTradingRulesManagement]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (content.trim().length < 50) {
      setIsLoading(false);
      setError("Content should be at least 50 characters long.");
      toast.error("Content should be at least 50 characters long.");
      return;
    }

    const loadingToast = toast.loading("Saving Trading Rules...");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.dismiss(loadingToast);
        setIsLoading(false);
        setError("You are not logged in.");
        toast.error("You are not logged in.");
        return;
      }

      const formdata = new FormData();
      formdata.append("content", content);

      const response = await axios.post(
        "https://capital-curve-apis.onrender.com/api/trading-rule/create-trading-rule",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      toast.dismiss(loadingToast);
      if (response.status === 200) {
        setSuccess("Content saved successfully.");
        toast.success("Content saved successfully.");
      } else {
        setError("An error occurred while trying to save the content.");
        toast.error("An error occurred while trying to save the content.");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while trying to save the content."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <Toaster />
      <div className="container mx-auto">
        <Card extra="w-full sm:overflow-auto px-6 py-6">
          <div className=" space-y-6">
            <header className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-navy-700 dark:text-white">
                Trading Rule Management
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
                  placeholder="Write your trading rules..."
                  modules={modules("t1")}
                  formats={formats}
                  className="scrollbar-thin scrollbar-thumb-blueSecondary dark:scrollbar-thumb-brand-400 dark:scrollbar-track-navy-800 scrollbar-track-white min-h-16 w-full overflow-y-auto rounded-md bg-lightPrimary dark:bg-navy-900 dark:text-white sm:overflow-auto"
                />
              </div>

              {/* {error && <div className="text-red-500">{error}</div>}
              {success && <div className="text-green-500">{success}</div>} */}

              <div className="px-6 py-6 text-right">
                <button
                  type="submit"
                  className="rounded-lg bg-blueSecondary px-6 py-2 text-white dark:bg-brand-400 hover:dark:bg-blue-600"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TradingRuleManagement;
