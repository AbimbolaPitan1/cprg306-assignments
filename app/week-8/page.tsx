"use client";

import { useUserAuth } from "../_utils/auth-context";
import Link from "next/link";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <main>
      <h1>Shopping List App</h1>

      {!user ? (
        <button onClick={gitHubSignIn}>
          Login with GitHub
        </button>
      ) : (
        <div>
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>

          <button onClick={firebaseSignOut}>
            Logout
          </button>

          <br />

          <Link href="/week-8/shopping-list">
            Go to Shopping List
          </Link>
        </div>
      )}
    </main>
  );
}