import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import React, { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Upload = ({onRefresh}) => {
  const [ringtone, setRingtone] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);
  const [ringtonePreview, setRingtonePreview] = useState(null);

  const ringtoneInputRef = useRef(null);

  const handleRingtoneChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("audio/")) {
      setRingtone(file);
      setRingtonePreview(URL.createObjectURL(file)); // Generate preview
    } else {
      toast.error("Please upload a valid audio file (MP3, WAV, etc.)");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!ringtone || !title || !description) {
      toast.error("Please complete all fields before uploading");
      return;
    }
    const loadingToast = toast.loading("Updating Ringtone details...");

   

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required");
      toast.dismiss(loadingToast); 
      return;
    }

    const formData = new FormData();
    formData.append("audioUrl", ringtone);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);
    

    try {
      const response = await axios.post(
        "https://capital-curve-apis.onrender.com/api/ringtone/upload-audio",
        formData,
        { headers: { "Content-Type": "multipart/form-data", token } }
      );
      

      if (response.data?.success) {
        toast.success("Ringtone uploaded successfully!");
        setRingtone(null);
        setRingtonePreview(null);
        setTitle("");
        setDescription("");
        setStatus("Active");
        onRefresh()
      } else {
        toast.error("Failed to upload ringtone");
      }
    } catch (error) {
      
      console.error("Upload Error:", error);
      toast.error("Error uploading ringtone");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <Toaster />
      <div className="col-span-5 h-fit w-full rounded-xl 2xl:col-span-12 p-2 ">

        <div className="flex flex-col items-center justify-center bg-lightPrimary dark:!bg-navy-700">
          <label
            htmlFor="ringtone-upload"
            className="flex h-full w-full rounded-xl border-[2px] flex-col items-center justify-center border-dashed border-gray-200 py-3 dark:!border-brandLinear lg:pb-0 cursor-pointer"
            onClick={() => ringtoneInputRef.current.click()}
          >
            {ringtonePreview ? (
              <audio controls className="w-full">
                <source src={ringtonePreview} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <MdFileUpload className="text-[80px] dark:text-brand-400 text-blueSecondary" />
                <h4 className="text-xl font-bold dark:text-brand-400 text-blueSecondary">
                  Upload Ringtone
                </h4>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  MP3, WAV, or other audio files are allowed
                </p>
              </div>
            )}
          </label>
          <input
            type="file"
            id="ringtone-upload"
            className="hidden"
            accept="audio/*"
            ref={ringtoneInputRef}
            onChange={handleRingtoneChange}
          />
        </div>

        <label className="block text-sm font-medium text-gray-700 mt-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 p-2"
          placeholder="Enter ringtone title"
        />

        <label className="block text-sm font-medium text-gray-700 mt-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 p-2"
          placeholder="Enter ringtone description"
          rows="4"
        />

        <div className="mt-4">
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-full rounded-xl py-[12px] text-base font-medium text-white transition duration-200 ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
              }`}
          >
            {loading ? "Uploading..." : "Upload Ringtone"}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Upload;
