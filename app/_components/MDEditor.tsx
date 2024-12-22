"use client";

import React, { forwardRef } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

type MDEditorProps = {
  name: string;
  value: string;
  onChange: (value: string) => void;
};

const MDEditor = forwardRef<HTMLDivElement, MDEditorProps>(
  ({ value, onChange, name }, ref) => (
    <div ref={ref}>
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
    </div>
  )
);
MDEditor.displayName = "MDEditor"; // Set a display name for better debugging

export default MDEditor;
