"use client";
import React, { useState } from "react";
import { createNew } from "../_lib/actions";
import CategoryDropdown from "./CategoryDropdown";
import AddressAutocomplete from "./AddressAutoComplete";
import MDEditor from "./MDEditor";
import toast from "react-hot-toast";
import FileInput from "./FileInput";
import { useRouter } from "next/navigation";
import { uploadNewsSchema } from "../_lib/validation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";

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

type UploadNewsFormData = z.infer<typeof uploadNewsSchema>;

export default function UploadNew({ userId, categories }: UploadNewProps) {
  const [files, setFiles] = useState<File[]>([]); // State to track uploaded files
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const { register, handleSubmit, setValue, formState, watch } =
    useForm<UploadNewsFormData>({
      resolver: zodResolver(uploadNewsSchema),
      defaultValues: { userId, content: "" }, // Pre-fill userId
    });

  const { errors, isSubmitting } = formState;
  const router = useRouter();

  const handleAddressSelect = (address: {
    street?: string;
    state?: string;
    country?: string;
    latitude: string;
    longitude: string;
  }) => {
    setValue("selectedAddress", JSON.stringify(address));
  };

  const onSubmit: SubmitHandler<UploadNewsFormData> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("categoryId", data.categoryId.toString());
    formData.append("subCategoryId", data.subCategoryId?.toString() || "");
    formData.append("content", data.content);
    formData.append("selectedAddress", data.selectedAddress);
    formData.append("userId", data.userId.toString());

    // Append multiple files
    files.forEach((file) => {
      formData.append("image", file);
    });

    const result = await createNew(formData);

    if (result.success) {
      toast.success("News uploaded successfully!");
      router.push("/account/news");
    } else if (result.validationErrors) {
      setServerErrors(result.validationErrors);
    } else {
      toast.error(`Failed to upload news: ${result.error}`);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-primary-700 text-white text-center font-bold uppercase">
          Upload News
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="py-4 px-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              disabled={isSubmitting}
              {...register("title")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter the title of the news"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            {serverErrors.title && (
              <p className="text-red-500 text-sm">{serverErrors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Choose Category
            </label>
            <CategoryDropdown
              categories={categories}
              registerCategory={register("categoryId", {
                required: "Category is required",
              })}
              registerSubCategory={register("subCategoryId")}
            />
            {errors.categoryId && (
              <p className="text-red-500 text-sm">
                {errors.categoryId.message}
              </p>
            )}
            {serverErrors.categoryId && (
              <p className="text-red-500 text-sm">{serverErrors.categoryId}</p>
            )}
          </div>

          <div className="mb-4">
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
            <input type="hidden" {...register("selectedAddress")} />
            {errors.selectedAddress && (
              <p className="text-red-500 text-sm">
                {errors.selectedAddress.message}
              </p>
            )}
            {serverErrors.selectedAddress && (
              <p className="text-red-500 text-sm">
                {serverErrors.selectedAddress}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Content
            </label>
            <MDEditor
              value={watch("content")}
              {...register("content")}
              onChange={(value) => setValue("content", value || "")}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
            {serverErrors.content && (
              <p className="text-red-500 text-sm">{serverErrors.content}</p>
            )}
          </div>

          <div className="mt-4">
            <FileInput name="image" onFilesChange={setFiles} />
          </div>

          <input type="hidden" value={userId} {...register("userId")} />

          <div className="flex items-center justify-end mt-4 mb-4">
            <button
              disabled={isSubmitting}
              className={`bg-primary-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline ${
                isSubmitting ? "opacity-50" : ""
              }`}
              type="submit"
            >
              {isSubmitting ? "Uploading..." : "Upload News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
