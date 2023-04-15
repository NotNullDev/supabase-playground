import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { userStore } from "../stores/userStore";

const AuthButton = () => {
  const session = userStore((state) => state.session);

  return (
    <>
      {session && (
        <>
          <button
            className="px-4 py-2 hover:bg-slate-900 w-min whitespace-nowrap rounded-md active:scale-95"
            onClick={async () => {
              await supabase.auth.signOut();
            }}
          >
            Logout
          </button>
        </>
      )}
      {!session && (
        <>
          <button
            className="px-4 py-2 hover:bg-slate-900 w-min whitespace-nowrap rounded-md active:scale-95"
            onClick={async () => {
              const user = await supabase.auth.signInWithOAuth({
                provider: "google",
              });
            }}
          >
            Login
          </button>
        </>
      )}
    </>
  );
};

export const Header = () => {
  return (
    <div className="p-4 flex justify-between items-center">
      <Link to={"/"}>
        <button className="active:scale-95 transition-all">
          Supabase playground
        </button>
      </Link>
      <div className="flex gap-10 items-center">
        <Link to={"/user"}>User</Link>
        <AuthButton />
      </div>
    </div>
  );
};
