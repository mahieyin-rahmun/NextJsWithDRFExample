import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { User } from "next-auth";
import { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";

import { AuthenticatedUser } from "../../../types";

const settings: InitOptions = {
  secret: process.env.SESSION_SECRET,
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user: AuthenticatedUser, account, profile) {
      // may have to switch it up a bit for other providers
      if (account.provider === "google") {
        // extract these two tokens
        const { accessToken, idToken } = account;

        // make a POST request to the DRF backend
        try {
          const response = await axios.post(
            // tip: use a seperate .ts file or json file to store such URL endpoints
            "http://127.0.0.1:8000/api/social/login/google/",
            {
              access_token: accessToken, // note the differences in key and value variable names
              id_token: idToken,
            },
          );

          // extract the returned token from the DRF backend and add it to the `user` object
          const { access_token, refresh_token } = response.data;
          user.accessToken = access_token;
          user.refreshToken = refresh_token;

          return true; // return true if everything went well
        } catch (error) {
          return false;
        }
      }
      return false;
    },

    async jwt(token, user: AuthenticatedUser, account, profile, isNewUser) {
      if (user) {
        const { accessToken, refreshToken } = user;

        // reform the `token` object from the access token we appended to the `user` object
        token = {
          ...token,
          accessToken,
          refreshToken,
        };

        // remove the tokens from the user objects just so that we don't leak it somehow
        delete user.accessToken;
        delete user.refreshToken;
      }

      return token;
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, settings);
