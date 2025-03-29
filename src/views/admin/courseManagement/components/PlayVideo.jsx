import React from "react";
import toast from "react-hot-toast";

const PlayVideo = ({ isOpen, videoUrl, onClose }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400 w-[90%] max-w-3xl">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4 text-center">
          Play Video
        </h2>

        <div className="flex justify-center items-center  ">
          {videoUrl?.includes("youtube.com") || videoUrl?.includes("vimeo.com") ? (
            <iframe
              className=" min-h-[400px] "
              src={videoUrl}
              title="Video Player"
              frameBorder="0"
              allowFullScreen
             
            ></iframe>
          ) : (
            <video
              // width="100%"
              // height="400px"
              className="auto max-w-96 min-h-[400px] h-auto"
              controls
              onError={() => toast.error("Failed to load video")}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md text-gray-700 dark:bg-gray-600 dark:text-white hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
