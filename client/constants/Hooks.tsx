import { Session } from "next-auth";
import { useEffect } from "react";
import useSwr, { mutate } from "swr";

// ### Failed approach using useState() ###
// export function useAuth(refreshInterval?: number): [Session, boolean] {
//   /*
//     custom hook that keeps the session up-to-date by refreshing it

//     @param {number} refreshInterval: The refresh/polling interval in seconds. default is 20.
//     @return {tuple} A tuple of the Session and boolean
//   */
//   const [session, setSession] = useState<Session>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   useEffect(() => {
//     async function fetchSession() {
//       let sessionData: Session = null;
//       setLoading(true);

//       const session = await getSession({});

//       if (session && Object.keys(session).length > 0) {
//         sessionData = session;
//       }

//       setSession((_) => sessionData);
//       setLoading(false);
//     }

//     refreshInterval = refreshInterval || 20;

//     fetchSession();
//     const interval = setInterval(() => fetchSession(), refreshInterval * 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return [session, loading];
// }

const sessionUrl = "/api/auth/session";

async function fetchSession(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch session from ${url}`);
  }

  const session: Session = await response.json();

  if (!session || Object.keys(session).length === 0) {
    return null;
  }

  return session;
}

// ### useSwr() approach works for now ###
export function useAuth(refreshInterval?: number) {
  /*
    custom hook that keeps the session up-to-date by refreshing it

    @param {number} refreshInterval: The refresh/polling interval in seconds. default is 20.
    @return {object} An object of the Session and boolean loading value
  */
  const { data, error } = useSwr(sessionUrl, fetchSession, {
    revalidateOnFocus: true,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    const intervalId = setInterval(
      () => mutate(sessionUrl),
      (refreshInterval || 20) * 1000,
    );

    return () => clearInterval(intervalId);
  }, []);

  return {
    session: data,
    loading: !data && !error,
  };
}
