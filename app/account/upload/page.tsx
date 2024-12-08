import AddressAutocomplete from "@/app/_components/AddressAutoComplete";
import CategoryDropdown from "@/app/_components/CategoryDropdown";
import { getCategoriesWithSubcategories } from "@/app/_lib/services/data-service";
import React from "react";

export default async function Page() {
  const categories = await getCategoriesWithSubcategories();
  console.log(categories);
  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="text-2xl py-4 px-6 bg-primary-700 text-white text-center font-bold uppercase">
        Upload news
      </div>
      <form className="py-4 px-6" action="" method="POST">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Enter the title of the new"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">
            Choose category
          </label>
          <CategoryDropdown categories={categories} />
        </div>

        <div className="mb-4">
          <AddressAutocomplete />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Time</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time"
            type="time"
            placeholder="Select a time"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Service</label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="service"
            name="service"
          >
            <option value="">Select a service</option>
            <option value="haircut">Haircut</option>
            <option value="coloring">Coloring</option>
            <option value="styling">Styling</option>
            <option value="facial">Facial</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Message</label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            placeholder="Enter any additional information"
          ></textarea>
        </div>
        <div className="flex items-center justify-center mb-4">
          <button
            className="bg-primary-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Upload news
          </button>
        </div>
      </form>
    </div>
  );
}
