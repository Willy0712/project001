"use client";

import React from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type MDEditorProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
};

export default function MDEditor({ name, value, onChange }: MDEditorProps) {
  return (
    <>
      <SimpleMDE
        value={value}
        onChange={onChange}
        options={{
          spellChecker: true,
          placeholder: "Describe your news...",
          autofocus: true,
          status: false, // Remove status bar for cleaner UI
        }}
      />
      <input type="hidden" name={name} value={value} />
    </>
  );
}
