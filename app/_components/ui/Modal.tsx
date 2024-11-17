"use client";

import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/20/solid"; // Ensure correct path to heroicons
import { useOutsideClick } from "@/app/_hooks/useOutsideClick";

type ModalContextType = {
  open: (windowName: string) => void;
  close: () => void;
  openName: string;
};

// Create a typed context for the modal
const ModalContext = createContext<ModalContextType | undefined>(undefined);

type ModalProps = {
  children: ReactNode;
};

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState<string>("");

  const close = () => setOpenName("");
  const open = (windowName: string) => {
    console.log("Opening Modal:", windowName);
    setOpenName(windowName);
  };

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = {
  children: React.ReactElement; // Must be a single React element to clone
  opens: string;
};

function Open({ children, opens: opensWindowName }: OpenProps) {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("Modal.Open must be used within a ModalProvider");

  const { open } = context;

  return cloneElement(children, {
    onClick: () => {
      open(opensWindowName);
    },
  });
}

type WindowProps = {
  children: React.ReactElement; // Must be a single React element to clone
  name: string;
};

function Window({ children, name }: WindowProps) {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("Modal.Window must be used within a ModalProvider");

  const { openName, close } = context;
  const ref = useOutsideClick<HTMLDivElement>(close);

  if (openName !== name) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-[var(--backdrop-color)] backdrop-blur-sm z-[1000] transition-all duration-500">
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 rounded-lg shadow-lg p-8 transition-all duration-[50000ms]"
        ref={ref}
      >
        <button
          onClick={close}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
        {/* <div>{children}</div> */}
      </div>
    </div>,
    document.body
  );
}

// Attach sub-components to the Modal component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
