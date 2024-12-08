"use client";
import React, { useState } from "react";

type Suggestion = {
  display_name: string;
};

export default function AddressAutocomplete() {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  const fetchSuggestions = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${input}&format=json`
    );
    const data: Suggestion[] = await response.json();
    setSuggestions(data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setQuery(suggestion.display_name); // Update the input value with the selected suggestion
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Type an address"
        className="border p-2 rounded w-full"
      />
      <ul className="bg-white border rounded mt-2">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="p-2 hover:bg-gray-100 cursor-pointer"
          >
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
