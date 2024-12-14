"use client";

import React, { useState } from "react";

type Suggestion = {
  display_name: string;
  lat: string; // Latitude provided by Nominatim API
  lon: string; // Longitude provided by Nominatim API
  address: {
    road?: string; // Street name
    house_number?: string; // Street number
    city?: string; // City name
    county?: string; // State name
    country?: string; // Country name
  };
};

type AddressAutocompleteProps = {
  onAddressSelect: (address: {
    street?: string;
    number?: string;
    city?: string;
    county?: string;
    country?: string;
    latitude: string;
    longitude: string;
  }) => void; // Callback to send the structured address data to the parent
};

export default function AddressAutocomplete({
  onAddressSelect,
}: AddressAutocompleteProps) {
  const [query, setQuery] = useState<string>(""); // User's input
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]); // List of suggestions

  const fetchSuggestions = async (input: string) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${input}&format=json&addressdetails=1`
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
    console.log("Selected Suggestion:", suggestion);
    // Extract relevant address details from the suggestion
    const structuredAddress = {
      street: suggestion.address.road || "", // Default to empty string if not provided
      number: suggestion.address.house_number || "",
      city: suggestion.address.city || "",
      state: suggestion.address.county || "",
      country: suggestion.address.country || "",
      latitude: suggestion.lat,
      longitude: suggestion.lon,
    };
    console.log("Structured Address:", structuredAddress);

    // Update the input value with the selected suggestion's display name
    setQuery(suggestion.display_name);

    // Send structured address data to the parent component
    onAddressSelect(structuredAddress);

    // Clear the suggestions
    setSuggestions([]);
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
