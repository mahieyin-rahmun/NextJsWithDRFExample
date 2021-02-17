import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      {
        loading && <h2>Loading...</h2>
      }

      {!loading && !session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
          <pre>{!session && "User is not logged in"}</pre>
        </>
      )}
      {!loading && session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
          {
            session.accessToken && (
              <pre>User has access token</pre>
            )
          }
        </>
      )}
    </>
  );
}
