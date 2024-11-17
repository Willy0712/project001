"use client";
import React from "react";
import Modal from "./ui/Modal";
import Button from "./Button";
import Login from "./Login";

export default function LoginModal() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="login">
          <Button>Login</Button>
        </Modal.Open>
        <Modal.Window name="login">
          <Login />
        </Modal.Window>
      </Modal>
    </div>
  );
}
