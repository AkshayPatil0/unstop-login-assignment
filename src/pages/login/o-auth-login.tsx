import googleIcon from "@/assets/google.svg";
import facebookIcon from "@/assets/facebook.svg";

export default function OauthLogin() {
  return (
    <div className="mt-8 space-y-4">
      <button className="w-full border border-1 rounded-lg p-3 flex items-center justify-center gap-2 shadow-sm">
        <img src={googleIcon} /> Login with Google
      </button>
      <button className="w-full border border-1 rounded-lg p-3 flex items-center justify-center gap-2 shadow-sm">
        <img src={facebookIcon} /> Login with Facebook
      </button>
    </div>
  );
}
