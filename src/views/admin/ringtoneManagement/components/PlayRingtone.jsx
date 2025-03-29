import React from "react";
import toast from "react-hot-toast";

const PlayRingtone = ({ isOpen, audioUrl, onClose }) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  const isVideoUrl = (url) => {
    return /(youtube\.com|youtu\.be|vimeo\.com)/.test(url);
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white dark:bg-navy-900 p-6 rounded-lg border border-blueSecondary dark:border-brand-400 w-[90%] max-w-3xl">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4 text-center">
          Play Audio
        </h2>

        <div className="flex justify-center items-center">
          {isVideoUrl(audioUrl) ? (
            <iframe
              className="w-full min-h-[400px]"
              src={audioUrl}
              title="Audio Player"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <audio
              controls
              className="w-full"
              onError={() => toast.error("Failed to load audio")}
            >
              <source src={audioUrl} type="audio/mpeg" />
              <source src={audioUrl} type="audio/ogg" />
              <source src={audioUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-600 hover:dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-md"
            aria-label="Close audio modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayRingtone;
