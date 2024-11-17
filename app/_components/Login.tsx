import React from "react";
import SignInButton from "./SignInButton";
export const metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function Login() {
  return (
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
      <div className="relative bg-white rounded-lg shadow">
        <div className="p-5">
          <div className="text-center">
            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
              Login to your account
            </p>
          </div>

          <SignInButton
            signInImageSource="https://authjs.dev/img/providers/google.svg"
            signInText="Sign in with Google"
          />
        </div>
      </div>
    </div>
  );
}
