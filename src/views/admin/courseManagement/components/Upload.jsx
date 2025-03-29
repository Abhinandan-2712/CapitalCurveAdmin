// import { MdFileUpload } from "react-icons/md";
// import Card from "components/card";
// import React, { useState, useRef, useEffect } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import axios from "axios";

// const Upload = () => {
//   const [videoUrl, setVideoUrl] = useState(null);
//   const [thumbnail, setThumbnail] = useState(null);
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("Active");
//   const thumbnailInputRef = useRef(null);
//   const videoInputRef = useRef(null);

//   // Handle video file change
//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("video/")) {
//       setVideoUrl(file);
//     } else {
//       toast.error("Please upload a valid video file");
//     }
//   };

//   // Handle text input validation
//   const handleTextKeyDown = (e) => {
//     if (!/[a-zA-Z\s]/.test(e.key) && !["Backspace", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)) {
//       toast.error("Please enter a valid character");
//       e.preventDefault();
//     }
//   };

//   // Handle thumbnail change
//   const handleThumbnailChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.type.startsWith("image/")) {
//       setThumbnail(file);
//     } else {
//       toast.error("Please upload a valid image file for the thumbnail");
//     }
//   };

//   // Clean up object URL for the thumbnail
//   useEffect(() => {
//     return () => {
//       if (thumbnail) {
//         URL.revokeObjectURL(thumbnail);

//       }
//       if (videoUrl) {
//         URL.revokeObjectURL(videoUrl);

//       }
//     };
//   }, [thumbnail, videoUrl]);

//   // Handle form submission
//   const handleUpload = async (e) => {
//     e.preventDefault();

//     if (!videoUrl || !thumbnail || !title || !description) {
//       toast.error("Please complete all fields before uploading");
//       return;
//     }

//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("Authentication required");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("videoUrl", videoUrl);
//     formData.append("thumbnail", thumbnail);
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("status", status);

//     try {
//       const response = await axios.post(
//         "https://capital-curve-apis.onrender.com/api/admin/upload-video",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data", token } }
//       );

//       if (response.data?.success) {
//         toast.success("Video uploaded successfully!");
//         setVideoUrl(null);
//         setThumbnail(null);
//         setTitle("");
//         setDescription("");
//         setStatus("Active");
//       } else {
//         toast.error("Failed to upload video");
//       }
//     } catch (error) {
//       console.error("Upload Error:", error);
//       toast.error("Error uploading video");
//     }
//   };

//   return (
//     <div>
//       <Toaster />
//       <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">

//         <div className="col-span-5 h-fit w-full rounded-xl 2xl:col-span-12 p-2">
//           {/* Video Upload Section */}
//           <div className="flex flex-col items-center justify-center bg-lightPrimary dark:!bg-navy-700">
//             <label htmlFor="video-upload" className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-brandLinear lg:pb-0 cursor-pointer">
//               <div onClick={() => videoInputRef.current.click()}>
//                 {
//                   videoUrl ? (
//                     <video src={URL.createObjectURL(videoUrl)} alt="Video" className="w-full h-64 object-cover" />
//                   ) : (
//                     <div>
//                       <MdFileUpload className="text-[80px] dark:text-brand-400 text-blueSecondary" />
//                       <h4 className="text-xl font-bold dark:text-brand-400 text-blueSecondary">Upload Video</h4>
//                       <p className="mt-2 text-sm font-medium text-gray-600">MP4, AVI, MKV files are allowed</p></div>)
//                 }
//               </div>

//             </label>
//             <input type="file" id="video-upload" className="hidden" onChange={handleVideoChange} accept="video/*" />
//           </div>

//           {/* Thumbnail Upload Section */}
//           <div className="mt-6">
//             <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
//             <div className="flex bg-lightPrimary dark:!bg-navy-700 min-h-20 w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-brandLinear lg:pb-0 cursor-pointer"
//               onClick={() => thumbnailInputRef.current.click()}>
//               {thumbnail ? (
//                 <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" className="w-full h-64 object-cover" />
//               ) : (
//                 <div className="text-center text-gray-600">Drag & drop a thumbnail image here, or click to select one</div>
//               )}
//               <input type="file" id="thumbnail-upload" ref={thumbnailInputRef} className="hidden" onChange={handleThumbnailChange} accept="image/*" />
//             </div>
//           </div>

//           {/* Title Input */}
//           <label className="block text-sm font-medium text-gray-700 mt-2">Title</label>
//           <input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={handleTextKeyDown}
//             className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 p-2" placeholder="Enter video Title" />

//           {/* Description Textarea */}
//           <label className="block text-sm font-medium text-gray-700 mt-2">Description</label>
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)}
//             className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 p-2"
//             placeholder="Enter video description" rows="4" />

//           {/* Upload Button */}
//           <div className="mt-4">
//             <button onClick={handleUpload}
//               className="w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
//               Upload Video
//             </button>
//           </div>
//         </div>
//       </Card>

//     </div>
//   );
// };

// export default Upload;

import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import React, { useState, useRef, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Upload = ({onRefresh}) => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(false);
  const thumbnailInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Handle video selection
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid video file");
    }
  };

  // Handle thumbnail selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      toast.error("Please upload a valid image file for the thumbnail");
    }
  };

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (videoPreview) URL.revokeObjectURL(videoPreview);
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    };
  }, [videoPreview, thumbnailPreview]);

  // Handle form submission
  const handleUpload = async (e) => {
    e.preventDefault();

    // Show loading toast
    const loadingToast = toast.loading("Uploading course details...");

    if (!videoFile || !thumbnailFile || !title || !description) {
      toast.dismiss(loadingToast);
      toast.error("Please complete all fields before uploading.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.dismiss(loadingToast);
      toast.error("Authentication required.");
      return;
    }

    console.log("Inut", videoFile, thumbnailFile, title, description, status)

    const formData = new FormData();
    formData.append("videoUrl", videoFile);
    formData.append("thumbnail", thumbnailFile);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("status", status);



    try {
      const response = await axios.post(
        "https://capital-curve-apis.onrender.com/api/admin/upload-video",
        formData,
        { headers: { "Content-Type": "multipart/form-data", token } }
      );
      // console.log(response);
      // console.log(formData);

      if (response.data?.succes) {
        toast.success(response.data.message || "Video uploaded successfully!");
        onRefresh()
        // Reset form fields after successful upload
        setVideoFile(null);
        setVideoPreview(null);
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setTitle("");
        setDescription("");
        setStatus("Active");
      } else {
        toast.error(response.data.message || "Failed to upload video.");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Error uploading video.";
      console.error("Upload Error:", error);
      toast.error(errorMessage);
    } finally {
      toast.dismiss(loadingToast);
    }
  };


  return (
    <div>
      <Toaster />
      <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">

        <div className="col-span-5 h-fit w-full rounded-xl 2xl:col-span-12 p-2">
          {/* Video Upload Section */}
          <div className="flex flex-col items-center justify-center bg-lightPrimary dark:!bg-navy-700">
            <label htmlFor="video-upload" className="flex h-full w-full  rounded-xl border-[2px] flex-col items-center justify-center border-dashed border-gray-200 py-3 dark:!border-brandLinear lg:pb-0 cursor-pointer " onClick={() => videoInputRef.current.click()}>
              {videoPreview ? (
                <video className="w-full h-64 object-cover rounded-lg">
                  <source src={videoPreview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <MdFileUpload className="text-[80px] dark:text-brand-400 text-blueSecondary" />
                  <h4 className="text-xl font-bold dark:text-brand-400 text-blueSecondary">Upload Video</h4>
                  <p className="mt-2 text-sm font-medium text-gray-600">MP4, AVI, MKV files are allowed</p>
                </div>
              )}

            </label>
            <input type="file" id="video-upload" className="hidden" ref={videoInputRef} onChange={handleVideoChange} accept="video/*" />
          </div>

          {/* Thumbnail Upload Section */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
            <div className="flex bg-lightPrimary dark:!bg-navy-700 min-h-20 w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-brandLinear lg:pb-0 cursor-pointer"
              onClick={() => thumbnailInputRef.current.click()}>
              {thumbnailPreview ? (
                <img src={thumbnailPreview} alt="Thumbnail" className="w-full h-64 object-cover rounded-lg" />
              ) : (
                <div className="text-center text-gray-600">Drag & drop a thumbnail image here, or click to select one</div>
              )}
              <input type="file" id="thumbnail-upload" ref={thumbnailInputRef} className="hidden" onChange={handleThumbnailChange} accept="image/*" />
            </div>
          </div>

          {/* Title Input */}
          <label className="block text-sm font-medium text-gray-700 mt-2">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)}
            className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 p-2"
            placeholder="Enter video title" />

          {/* Description Textarea */}
          <label className="block text-sm font-medium text-gray-700 mt-2">Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)}
            className="block w-full text-sm bg-transparent border dark:border-white/10 bg-lightPrimary dark:bg-navy-700 rounded-xl focus:outline-none dark:text-white text-gray-500 p-2"
            placeholder="Enter video description" rows="4" />

          {/* Upload Button */}
          <div className="mt-4">
            <button onClick={handleUpload} disabled={loading}
              className={`w-full rounded-xl py-[12px] text-base font-medium text-white transition duration-200 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-brand-500 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"}`}>
              {loading ? "Uploading..." : "Upload Video"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Upload;
