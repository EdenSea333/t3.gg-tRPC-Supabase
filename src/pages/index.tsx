import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import  SignIn  from "./signin";

export default function Home2() {
  const user = useUser();

  return (
    <div>
      <SignIn/>
      <h1>index.js</h1>
      <h1> user: {user?.id} </h1>
    </div>
  );
}
