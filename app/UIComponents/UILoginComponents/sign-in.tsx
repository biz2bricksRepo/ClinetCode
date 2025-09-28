import { handleSignIn } from "@/app/UILibraries/actions";
//https://authjs.dev/getting-started/authentication/oauth

export default function SignIn() {

      
    return (
        <form action={handleSignIn}  
        className="flex flex-col gap-4">
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Sign in with Google
            </button>
        </form>
    );
}