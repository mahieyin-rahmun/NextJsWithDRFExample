import axios from "axios";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken, encode } from "next-auth/jwt";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.JWT_SECRET;

  try {
    const decodedToken: any = await getToken({ req, secret });

    const response = await axios.post(
      "http://127.0.0.1:8000/api/auth/token/refresh/",
      {
        refresh: decodedToken.refreshToken,
      },
    );

    // how to modify the encoded token saved as cookie
    const { access, refresh } = response.data;

    const newToken = {
      ...decodedToken,
      accessToken: access,
      refreshToken: refresh,
    };

    const encodedToken = await encode({ secret, token: newToken });

    res.setHeader(
      "Set-Cookie",
      serialize("next-auth.session-token", encodedToken, {
        path: "/",
        httpOnly: true,
        domain: "127.0.0.1",
        maxAge: 24 * 60 * 60,
        sameSite: "lax",
      }),
    );

    res.status(200);
    return res.end();
  } catch (err) {
    return res.status(err.response.status).json(err.response.data);
  }
}
