# Next.js + NextAuth + Django Rest Framework Social Authentication Example

This repository contains the code for a two-part article series that deals with connecting a Django Rest Framework backend with a Next.js + Next-Auth client with Social Authentication. In this example, we use OAuth with Google, but this can be extended to any arbitrary number of Providers.


The articles:

[Part 1](https://mahieyin-rahmun.medium.com/how-to-configure-social-authentication-in-a-next-js-next-auth-django-rest-framework-application-cb4c82be137).
- The basics
- Getting access token


[Part 2](https://mahieyin-rahmun.medium.com/part-2-how-to-configure-social-authentication-in-a-next-js-183984761e97)
- Using the refresh token to refresh access tokens
- Pitfalls of useSession() hook and its workaround (as of Apr 30, 2021)
- Custom HOC to reduce code repetition.

The branches of this repository are named, accordingly, `part-1` and `part-2`. The `main` branch contains all the changes of both parts merged together into a single, working application.
