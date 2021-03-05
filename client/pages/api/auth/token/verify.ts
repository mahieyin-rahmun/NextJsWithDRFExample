import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.JWT_SECRET;

  try {
    const decodedToken: any = await getToken({ req, secret });

    const response = await axios.post(
      "http://127.0.0.1:8000/api/auth/token/verify/",
      {
        token: decodedToken.accessToken,
      },
    );

    return res.status(response.status).json(response.data);
  } catch (err) {
    return res.status(err.response.status).json(err.response.data);
  }
}
