import { TrashIcon } from "@heroicons/react/20/solid";
import React, { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";
import toast from "react-hot-toast";

type DeleteNewProps = {
  id: number;
  onDelete: (newId: number) => void;
};

export default function DeleteWithId({ id, onDelete }: DeleteNewProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    toast(
      (t) => (
        <div className="p-4">
          <p className="text-lg">Are you sure you want to delete?</p>
          <div className="mt-3 flex gap-4 justify-center">
            <button
              onClick={() => {
                toast.dismiss(t.id); // Dismiss the toast
                onDelete(id); // Call the onDelete method
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)} // Dismiss the toast
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity, // Keeps the toast open until dismissed
      }
    );
  };
  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}
