"use client";
import React, { useState } from "react";
type FileUploadProps = {
  name: string;
  onFilesChange: (files: File[]) => void; // Callback to pass files to parent
};
export default function FileUpload({ name, onFilesChange }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const totalFiles = files.length + selectedFiles.length;

    if (totalFiles > 5) {
      setError("You can upload a maximum of 5 files.");
      return;
    }

    setError(null); // Clear any existing error
    const updatedFiles = [...files, ...selectedFiles];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleRemoveFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles); // Pass updated files to parent
  };

  return (
    <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
      <div className="grid gap-1">
        <svg
          className="mx-auto"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="File">
            <path
              id="icon"
              d="..." // Truncated for brevity
              fill="#4F46E5"
            />
          </g>
        </svg>
        <h2 className="text-center text-gray-400 text-xs leading-4">
          JPG smaller than 5MB
        </h2>
      </div>
      <div className="grid gap-2">
        <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">
          Drag and Drop your file here or
        </h4>
        <div className="flex items-center justify-center">
          <label>
            <input
              type="file"
              hidden
              name={name}
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="flex w-28 h-9 px-2 flex-col bg-primary-900 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">
              Choose File
            </div>
          </label>
        </div>
      </div>
      <div className="mt-4">
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <ul className="list-disc pl-6">
          {files.map((file, index) => (
            <li key={index} className="text-gray-600 text-sm">
              {file.name}{" "}
              <button
                type="button"
                className="text-red-500 ml-2"
                onClick={() => handleRemoveFile(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
