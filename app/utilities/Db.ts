import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "./constant";

type SignIn = { email: string, password: string };
type SignUp = { email: string, password: string, "confirm password": string, name: string };

async function fetchData(account: string): Promise<any> {
  try {
    const state = await AsyncStorage.getItem(`${URL}${account}`);
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function saveData(account: string, state: any): Promise<boolean> {
  try {
    const stateString = JSON.stringify(state)
    await AsyncStorage.setItem(`${URL}${account}`, stateString);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
class Db {
  static async signIn(state: SignIn): Promise<any | "Incorrect credentials"> {
    const account = await fetchData(state.email);
    if (account && account.password === state.password) return account;
    else return "Incorrect credentials";
  }

  static async signUp({ email, password, name }: SignUp): Promise<string> {
    if (await fetchData(email)) return "Account already exists";
    return await saveData(email, { email, password, name }) ? 
      "You have created an account" : 
      "Oops something went wrong";
  }
}

export default Db;