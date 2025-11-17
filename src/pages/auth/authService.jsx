import { account } from "../../lib/appwrite";

export const registerUser = async (email, password, name) => {
  try {
    return await account.create("unique()", email, password, name);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const loginUser = async (email, password) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch {
    return null;
  }
};
