// import { Client, Databases, Account, ID } from "appwrite";

// const client = new Client()
//   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//   .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// export const account = new Account(client);
// export const databases = new Databases(client);
// export { ID };
// export default client


// src/lib/appwrite.jsx
import { Client, Databases, Account } from "appwrite";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account };
