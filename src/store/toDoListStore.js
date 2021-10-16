import { useContext, createContext } from "react";
import { observable, action } from "mobx";

class ToDoStore {
  @observable todoList = [];

  @action createTodo = async (title, description) => {
    const url = "https://candidate.neversitup.com/todo/todos";
    let data = sessionStorage.getItem("user");
    if (data) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(data).token,
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      };

      try {
        const response = await fetch(url, requestOptions);
        const list = await response.json();
        console.log(`list`, list);
        this.todoList = list;
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  @action getToDoList = async () => {
    const url = "https://candidate.neversitup.com/todo/todos";

    let data = sessionStorage.getItem("user");

    if (data) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(data).token,
        },
      };

      try {
        const response = await fetch(url, requestOptions);
        const list = await response.json();
        this.todoList = list;
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  @action getToDoListById = async (id) => {
    const url = `https://candidate.neversitup.com/todo/todos/${id}`;

    let data = sessionStorage.getItem("user");

    if (data) {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(data).token,
        },
      };

      try {
        const response = await fetch(url, requestOptions);
        const list = await response.json();
        // console.log(`list`, list);
        // this.todoList = list;
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  @action updateToDoListById = async (id, title, desc) => {
    const url = `https://candidate.neversitup.com/todo/todos/${id}`;

    let data = sessionStorage.getItem("user");

    if (data) {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(data).token,
        },
        body: JSON.stringify({
          title: title,
          description: desc,
        }),
      };

      try {
        const response = await fetch(url, requestOptions);
        const list = await response.json();
        console.log(`list`, list);
        // this.todoList = list;
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  @action deleteToDoListById = async (id) => {
    const url = `https://candidate.neversitup.com/todo/todos/${id}`;

    let data = sessionStorage.getItem("user");

    if (data) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + JSON.parse(data).token,
        },
      };

      try {
        const response = await fetch(url, requestOptions);
        const list = await response.json();
        console.log(`list`, list);
        // this.todoList = list;
      } catch (error) {
        console.log("error", error);
      }
    }
  };
}

const toDoStore = new ToDoStore();
const ToDoStoreContext = createContext(toDoStore);
const useToDoStore = () => useContext(ToDoStoreContext);
export default useToDoStore;
