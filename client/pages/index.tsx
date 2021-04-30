import { signOut } from "next-auth/client";
import Link from "next/link";
import { withAuth } from "../constants/HOCs";

function Home(props) {
  const { session } = props;
  return (
    session && (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        {session.accessToken && <pre>User has access token</pre>}
        <Link href="/posts">Go to posts</Link>
      </>
    )
  );
}

export default withAuth(3 * 60)(Home);
