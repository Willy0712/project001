"use client";
import React, { useState } from "react";
import { createNew } from "../_lib/actions";
import CategoryDropdown from "./CategoryDropdown";
import AddressAutocomplete from "./AddressAutoComplete";
import MDEditor from "./MDEditor";
import toast from "react-hot-toast";
import FileInput from "./FileInput";
import SpinnerOverlay from "./Spinner";
import { useFormStatus } from "react-dom";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

type SubCategory = {
  subCategoryId: number;
  subCategoryName: string | null;
};

type Category = {
  categoryId: number;
  categoryName: string | null;
  sub_categories: SubCategory[];
};

type UploadNewProps = {
  userId: number;
  categories: Category[] | null;
};

export default function UploadNew({ userId, categories }: UploadNewProps) {
  const { pending } = useFormStatus();
  const router = useRouter(); // Hook for redirection

  const [loading, setLoading] = useState(false);
  // State to track editor content
  const [content, setContent] = useState<string>("");
  const handleAddressSelect = (address: {
    street?: string;
    state?: string;
    country?: string;
    latitude: string;
    longitude: string;
  }) => {
    const addressInput = document.getElementById(
      "selectedAddress"
    ) as HTMLInputElement;
    if (addressInput) {
      addressInput.value = JSON.stringify(address);
    }
  };

  const handleSubmit = async (formData: FormData): Promise<void> => {
    setLoading(true); // Show spinner
    try {
      const result = await createNew(formData);

      if (result.success) {
        toast.success("News uploaded successfully!");
        router.push("/account/news");
      } else {
        toast.error(`Failed to upload news: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred!");
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-primary-700 text-white text-center font-bold uppercase">
          Upload news
        </div>
        <form className="py-4 px-6" action={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="title"
              type="text"
              placeholder="Enter the title of the new"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Choose category
            </label>
            <CategoryDropdown name="categoryId" categories={categories} />
          </div>

          <div className="mb-4">
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
          </div>
          {/* Hidden Input for the Selected Address */}
          <input type="hidden" id="selectedAddress" name="selectedAddress" />

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Content
            </label>
            <MDEditor name="content" value={content} onChange={setContent} />
          </div>
          <div className="mt-4">
            <FileInput name="image" />
          </div>
          <input type="hidden" name="userId" value={userId} />
          <div className="flex items-center justify-end mt-4 mb-4">
            <button
              disabled={pending}
              className="bg-primary-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Upload news
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
