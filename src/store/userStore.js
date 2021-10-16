import { useContext, createContext } from "react";
import { observable, action } from "mobx";

const url = "https://candidate.neversitup.com/todo/users/auth";

class UserStore {
  @observable isLogin = false;

  @action login = async (user, pass) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    };

    try {
      const response = await fetch(url, requestOptions);
      const json = await response.json();
      sessionStorage.setItem("user", JSON.stringify({ token: json.token }));
      this.isLogin = true;
    } catch (error) {
      console.log("error", error);
    }
    return true;
  };

  @action logout = async () => {
    this.isLogin = false;
    sessionStorage.clear();
  };
}

const userStore = new UserStore();
const UserStoreContext = createContext(userStore);
const useUserStore = () => useContext(UserStoreContext);
export default useUserStore;
