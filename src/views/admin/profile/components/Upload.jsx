import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import React from "react";
import InputField from "components/fields/InputField";

const Upload = () => {
  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">







        {/* <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Upload Video
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Provide the required details to upload your video!
        </p>

        
        <InputField
          variant="auth"
          extra="mb-3"
          label="Video Title*"
          placeholder="Enter video title"
          id="video-title"
          type="text"
        />

        
        <TextareaField
          variant="auth"
          extra="mb-3"
          label="Description*"
          placeholder="Write a short description of the video"
          id="description"
        />

        
        <div className="mb-6 flex h-[150px] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-lightPrimary hover:cursor-pointer dark:border-navy-700 dark:bg-navy-800">
          <div className="text-4xl text-brand-500">
            <IoCloudUploadOutline />
          </div>
          <h5 className="text-sm font-medium text-navy-700 dark:text-white">
            Drag and drop your video or click to upload
          </h5>
          <input type="file" id="video-upload" className="hidden" />
        </div>

        
        <InputField
          variant="auth"
          extra="mb-3"
          label="Tags"
          placeholder="e.g., tutorial, cooking, travel"
          id="tags"
          type="text"
        />

        
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              I agree to the terms and conditions
            </p>
          </div>
        </div>

       
        <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          Upload Video
        </button>
      </div>
    </div> */}




<div className="flex flex-col items-center justify-center">
          <label
            htmlFor="file-upload"
            className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0 cursor-pointer"
          >
            <MdFileUpload className="text-[80px] dark:text-brand-400 text-blueSecondary " />
            <h4 className="text-xl font-bold dark:text-brand-400 text-blueSecondary">
              Upload File
            </h4>
            <p className="mt-2 text-sm font-medium text-gray-600">
              PNG, JPG, and GIF files are allowed
            </p>
          </label>
          <input
            type="file"
            id="file-upload"
            // onChange={handleFileChange}
            className="hidden"
          />
        </div>





        

      </div>

      <div className="col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white px-3 pb-4 dark:!bg-navy-800">
        <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
          Complete Your Profile
        </h5>
        <InputField
          variant="auth"
          label="Video Title*"
          placeholder="Enter video title"
          id="video-title"
          type="text"
        />
        {/* <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="file-upload"
            className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0 cursor-pointer"
          >
            <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
            <h4 className="text-xl font-bold text-brand-500 dark:text-white">
              Upload File
            </h4>
            <p className="mt-2 text-sm font-medium text-gray-600">
              PNG, JPG, and GIF files are allowed
            </p>
          </label>
          <input
            type="file"
            id="file-upload"
            // onChange={handleFileChange}
            className="hidden"
          />
        </div> */}
        {/* <textf */}
        {/* <input type="file" id="video-upload"  /> */}

        <p className="leading-1 mt-2 text-base font-normal text-gray-600">
          Stay on the pulse of distributed projects with an anline whiteboard to
          plan, coordinate and discuss
        </p>
        <button
          href=" "
          className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
        >
          Publish now
        </button>
      </div>
    </Card>
  );
};

export default Upload;
