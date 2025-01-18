"use client";
import React, { useState } from "react";
import AddressAutocomplete from "./AddressAutoComplete";
import CategoryDropdown from "./CategoryDropdown";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateNewSchema } from "../_lib/validation";
import { z } from "zod";
import FileInput from "./FileInput";
import dynamic from "next/dynamic";
import { updateNew } from "../_lib/actions";
import { useRouter } from "next/navigation";

const MDEditor = dynamic(() => import("./MDEditor"), { ssr: false });

type SubCategory = {
  subCategoryId: number;
  subCategoryName: string | null;
};

type Category = {
  categoryId: number;
  categoryName: string | null;
  sub_categories: SubCategory[];
};
type Photo = {
  id: number;
  url: string | null;
  type: string | null;
  createdAt: string;
};

type NewsWithDetails = {
  newsId: number;
  newsTitle: string | null;
  newsDescription: string | null;
  createdAt: string; // ISO timestamp
  modifiedAt: string | null; // ISO timestamp or null if not modified
  street: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  latitude: number | null; // Nullable in case the location is not provided
  longitude: number | null; // Nullable in case the location is not provided
  userId: number | null;
  categoryId: { categoryId: number; categoryName: string | null } | null; // Supabase returns an array even for single relation
  subCategoryId: {
    subCategoryId: number;
    subCategoryName: string | null;
  } | null;
  photos: Photo[];
};
type NewsDetailProps = {
  newData: NewsWithDetails;
  categories: Category[] | null;
};

type UpdateNewsFormData = z.infer<typeof updateNewSchema>;

export default function EditNew({ newData, categories }: NewsDetailProps) {
  const [existingPhotos, setExistingPhotos] = useState<Photo[]>(newData.photos); // Photos from the database
  const [newFiles, setNewFiles] = useState<File[]>([]); // Newly added files
  const [photosToRemove, setPhotosToRemove] = useState<number[]>([]); // Track removed photo IDs
  const router = useRouter();

  // Track removed photos

  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<UpdateNewsFormData>({
    resolver: zodResolver(updateNewSchema),
    defaultValues: {
      title: newData.newsTitle || "",
      categoryId: Number(newData.categoryId?.categoryId) || undefined,
      subCategoryId: Number(newData.subCategoryId?.subCategoryId) || undefined,
      content: newData.newsDescription || "",
      selectedAddress: JSON.stringify({
        street: newData.street,
        city: newData.city,
        state: newData.state,
        country: newData.country,
      }),
      //   userId: newData.userId,
    },
  });

  const handleAddressSelect = (address: {
    street?: string;
    state?: string;
    country?: string;
    latitude: string;
    longitude: string;
  }) => {
    setValue("selectedAddress", JSON.stringify(address));
  };

  const onSubmit: SubmitHandler<UpdateNewsFormData> = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("categoryId", data.categoryId?.toString() || "");
    formData.append("subCategoryId", data.subCategoryId?.toString() || "");
    formData.append("content", data.content);
    formData.append("selectedAddress", data.selectedAddress);
    formData.append("userId", data.userId.toString());
    formData.append("photosToRemove", JSON.stringify(photosToRemove));

    newFiles.forEach((file) => {
      formData.append("image", file);
    });

    const result = await updateNew(newData.newsId, formData);

    if (result.success) {
      toast.success("News updated successfully!");
      router.push("/account/news");
    } else if (result.validationErrors) {
      setServerErrors(result.validationErrors);
    } else {
      toast.error(`Failed to update news: ${result.error}`);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="text-2xl py-4 px-6 bg-primary-700 text-white text-center font-bold uppercase">
          Edit News
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title</label>
            <input
              {...register("title")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter the title of the news"
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
            {serverErrors.title && (
              <p className="text-red-500 text-sm">{serverErrors.title}</p>
            )}
          </div>

          {/* Categories */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Choose Category
            </label>
            <CategoryDropdown
              categories={categories}
              registerCategory={register("categoryId", {
                required: "Category is required",
                valueAsNumber: true,
              })}
              registerSubCategory={register("subCategoryId", {
                valueAsNumber: true,
              })}
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

          {/* Address */}
          {/* {/* <div className="mb-4"> */}
          <div className="mb-4">
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
            <input type="hidden" {...register("selectedAddress")} />
            {errors.selectedAddress && (
              <p className="text-red-500 text-sm">
                {errors.selectedAddress.message}
              </p>
            )}
            {errors.selectedAddress && (
              <p className="text-red-500 text-sm">
                {serverErrors.selectedAddress}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Content
            </label>
            <MDEditor
              {...register("content")}
              value={watch("content")}
              onChange={(value) => setValue("content", value || "")}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content.message}</p>
            )}
            {serverErrors.content && (
              <p className="text-red-500 text-sm">{serverErrors.content}</p>
            )}
          </div>
          {newData.userId !== null && (
            <input
              type="hidden"
              value={newData.userId}
              {...register("userId", { valueAsNumber: true })} // Converts input value to a number
            />
          )}

          <div className="existing-photos grid grid-cols-3 gap-4">
            {existingPhotos.map((photo) => (
              <div key={photo.id} className="relative">
                <img
                  src={photo.url || ""}
                  alt="Preview"
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setPhotosToRemove((prev) => [...prev, photo.id]);
                    setExistingPhotos((prev) =>
                      prev.filter((p) => p.id !== photo.id)
                    );
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* File Upload */}
          <div className="mt-4">
            <FileInput
              name="image"
              onFilesChange={setNewFiles}
              files={newFiles}
            />
          </div>

          <div className="flex items-center justify-end mt-4 mb-4">
            <button
              type="submit"
              className={`bg-primary-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline ${
                isSubmitting ? "opacity-50" : ""
              }`}
            >
              {isSubmitting ? "Updating..." : "Update News"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
