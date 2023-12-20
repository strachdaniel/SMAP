# UniEdu SPA Client Documentation

This is the client-side of UniEdu, an application that connects all the backend microservices into one. The frontend is built using Next.js 13, SWR, and Recoil.

## Installation

1. Create a folder named `client` inside the UniEdu folder.
2. Clone the Git repository inside the `client` folder.
3. Create a `.env.local` file inside the `client` folder.
4. Inside `.env.local` write this:
```
AUTH_URL=http://localhost:3001/auth
LIBRARY_URL=http://localhost:3002/library
```
4. Run following command
```
yarn install
```

5. Start app with
```
yarn dev
```

Before running the client, you need to clone the remaining repositories: `module-library`, `module-auth`, and `docker`. For further instructions, refer to the Docker repository documentation.

The client is set to run on `http://localhost:3000/` by default.

To login to the app, you need to sign in with Google using the following credentials:
- Email: student@zsmozaika.cz
- Password: kockopes

## Resources
Figma design - [Here](https://www.figma.com/file/CQzuajZkXQcEOgb3LZSncw/UNIEDU?node-id=0%3A1&t=q6WUYqw5dVSwlFDz-1)
