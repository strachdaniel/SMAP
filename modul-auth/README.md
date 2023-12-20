# UniEdu - Authentication module

This is the client-side of UniEdu, an application that connects all the backend microservices into one. The frontend is built using Next.js 13, SWR, and Recoil.

## Installation

1. Create a folder named `modul-auth` inside the UniEdu folder.
2. Clone the Git repository inside the `modul-auth` folder.
3. Create a `.env` file inside the `modul-auth` folder.
4. Inside `.env` write this:
``` js
DATABASE_URL="postgresql://postgres:password@localhost:5432/my_database?schema=public"
PORT=3001
SESSION_SECRET="qV9TjVk1qe5jgpfNK0hY3zOAFPj34igM"
JWT_SECRET="r9r8q4z74RI6sOAb4tokfRvPhFJFJ4qg"
JWT_EXPIRE=30
GOOGLE_CLIENT_ID="258445979009-e6d3usfjrllndkrvu1bmie2r92pc9g8b.apps googleusercontent.com"
GOOGLE_CLIENT_SECRET="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"
GOOGLE_CALLBACK_URL="http://localhost:3001/auth/google/callback"
CLIENT_REDIRECT_URL="http://localhost:3000/login"
```
5. Run following command
```
yarn install
```

6. Run following command - needs to be run after migrations in modul-library
```
yarn prisma migrate deploy
```

7. Start app with
```
yarn dev
```

Before running the modul-auth, you need to clone the remaining repositories: `module-library`, `module-auth`, and `docker`. For further instructions, refer to the Docker repository documentation.

The auth server is set to run on `http://localhost:3001/` by default.

### Credentials

To login to the app, you need to sign in with Google using the following credentials:
- Email: student@zsmozaika.cz
- Password: kockopes


Download this and imported to Insomnia -
[Insomnia API json](https://drive.google.com/file/d/1DMWd9mCkZsjmu09JtbgTfy4N29CjqVI8/view?usp=share_link)
