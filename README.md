# Authentication and Testing Sprint Challenge

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This challenge allows you to practice the concepts and techniques learned over the past sprint and apply them in a concrete project. This sprint explored **Authentication and Testing**. During this sprint, you studied **authentication, JSON web tokens, unit testing, and backend testing**. In your challenge this week, you will demonstrate your mastery of these skills by creating **a dad jokes app**.

This is an individual assessment. All work must be your own. All projects will be submitted to Codegrade for automated review. You will also be given feedback by code reviewers on Monday following the challenge submission. For more information on the review process [click here.](https://www.notion.so/bloomtech/How-to-View-Feedback-in-CodeGrade-c5147cee220c4044a25de28bcb6bb54a)

You are not allowed to collaborate during the sprint challenge.

## Project Setup

- [X] Run `npm install` to install your dependencies.
- [X] Build your database executing `npm run migrate`.
- [ ] Run tests locally executing `npm test`.

## Project Instructions

Dad jokes are all the rage these days! In this challenge, you will build a real wise-guy application.

Users must be able to call the `[POST] /api/auth/register` endpoint to create a new account, and the `[POST] /api/auth/login` endpoint to get a token.

We also need to make sure nobody without the token can call `[GET] /api/jokes` and gain access to our dad jokes.

We will hash the user's password using `bcryptjs`, and use JSON Web Tokens and the `jsonwebtoken` library.

### MVP

Your finished project must include all the following requirements (further instructions are found inside each file):

- [X] An authentication workflow with functionality for account creation and login, implemented inside `api/auth/auth-router.js`.
- [X] Middleware used to restrict access to resources from non-authenticated requests, implemented inside `api/middleware/restricted.js`.
- [X] A minimum of 2 tests per API endpoint, written inside `api/server.test.js`.

**IMPORTANT Notes:**

- Do not exceed 2^8 rounds of hashing with `bcryptjs`.
- If you use environment variables make sure to provide fallbacks in the code (e.g. `process.env.SECRET || "shh"`).
- You are welcome to create additional files but **do not move or rename existing files** or folders.
- Do not alter your `package.json` file except to install extra libraries. Do not update existing packages.
- The database already has the `users` table, but if you run into issues, the migration is available.
- In your solution, it is essential that you follow best practices and produce clean and professional results.
- Schedule time to review, refine, and assess your work and perform basic professional polishing.

## Submission format

- [ ] Submit via Codegrade by pushing commits to your `main` branch on Github.
- [ ] Check Codegrade before the deadline to compare its results against your local tests.
- [ ] Check Codegrade on the days following the Sprint Challenge for reviewer feedback.
- [ ] New commits will be evaluated by Codegrade if pushed _before_ the sprint challenge deadline.

## Interview Questions

Be prepared to demonstrate your understanding of this week's concepts by answering questions on the following topics.

1. Differences between using _sessions_ or _JSON Web Tokens_ for authentication.

Sessions provide a way to persist data across requests. When using sessions, each client will have a unique session stored on the server.

The basic workflow when using a combination of cookies and sessions for authentication is:

Client sends credentials
Server verifies credentials
Server creates a session for the client
Server produces and sends back a cookie
Client stores the cookie
Client sends the cookie on every request
Server verifies that the cookie is valid
Server provides access to resource

JSON Web Tokens (JWT) are a way to transmit information between parties in the form of a JSON object. The JSON information is most commonly used for authentication and information exchange.

Ultimately, a JWT is a string that has three parts separated by a period (.). Those are:

-The header
-The payload
-The signature

2. What does `bcryptjs` do to help us store passwords in a secure manner?

Bcryptjs features include:

-Password hashing function
-Implements salting both manually and automatically.
-Accumulative hashing rounds

Having an algorithm that hashes the information multiple times (rounds) means an attacker needs to have the hash, know the algorithm used, and how many rounds were used to generate the hash in the first place.

3. How are unit tests different from integration and end-to-end testing?

The tests we write for endpoints are called integration tests because they test how different parts of the system work together. 

This is different from the unit tests we use to verify the correctness of one part of the system in isolation.

4. How does _Test Driven Development_ change the way we write applications and tests?

Test driven development is the process of writing tests before code. In theory, you can write much higher quality code when you start with the end (the tests) in mind. You might be familiar with similar philosophies in teaching (backward planning) -- or from the famous book "7 Habits of Highly Effective People" (starting with the end in mind).
