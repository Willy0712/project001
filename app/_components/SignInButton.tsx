// import { signInAction } from "../_lib/actions";

import { signInAction } from "../_lib/actions";

type SignInButtonProps = {
  signInImageSource: string;
  signInText: string;
};

function SignInButton({ signInImageSource, signInText }: SignInButtonProps) {

  return (
    <form action={signInAction}>
      <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
        <img src={signInImageSource} alt="Google logo" height="24" width="24" />

        <span>{signInText}</span>
      </button>
    </form>
  );
}

export default SignInButton;
