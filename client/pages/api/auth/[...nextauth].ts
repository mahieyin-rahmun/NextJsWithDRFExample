import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";



const settings: InitOptions = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      return true;  // we will change this later on to communicate with the DRF backend
    },

    async jwt(token, user, account, profile, isNewUser) {
      return token;  // we will change this later on to communicate with the DRF backend
    },

    async session(session, user) {
      return session;  // we will change this later on to communicate with the DRF backend
    },
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, settings);
