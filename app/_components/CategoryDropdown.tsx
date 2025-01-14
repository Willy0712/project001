"use client";

import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type SubCategory = {
  subCategoryId: number;
  subCategoryName: string | null;
};

type Category = {
  categoryId: number;
  categoryName: string | null;
  sub_categories: SubCategory[];
};

type CategoryDropdownProps = {
  //name: string;
  categories: Category[] | null;
  registerCategory: UseFormRegisterReturn; // React Hook Form's `register` function for the category field
  registerSubCategory: UseFormRegisterReturn; // React Hook Form's `register` function for the subcategory field
};

export default function CategoryDropdown({
  categories,
  registerCategory,
  registerSubCategory,
}: CategoryDropdownProps) {
  const [subcategories, setSubcategories] = useState<SubCategory[]>([]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value, 10);

    const selectedCategory = categories?.find(
      (cat) => cat.categoryId === categoryId
    );
    setSubcategories(selectedCategory?.sub_categories || []);
  };

  return (
    <div className="mb-4 flex flex-row justify-between ">
      {/* Categories Dropdown */}
      <div>
        <select
          id="categories"
          //name={name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...registerCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Choose a category</option>
          {categories?.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName || "Unnamed Category"}
            </option>
          ))}
        </select>
      </div>
      {/* Subcategories Dropdown */}
      <div>
        <select
          id="subcategories"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...registerSubCategory}
          disabled={!subcategories.length}
        >
          <option value="">Choose a subcategory</option>
          {subcategories.map((subcategory) => (
            <option
              key={subcategory.subCategoryId}
              value={subcategory.subCategoryId}
            >
              {subcategory.subCategoryName || "Unnamed Subcategory"}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
