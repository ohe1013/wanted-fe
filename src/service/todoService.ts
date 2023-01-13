import { TODO_URL } from "../data/url";
import axios from "./config/axios";

const TodoService = {

    getTodos :async () => {
        try {
            const res = await axios.get(TODO_URL);
            if (res.status === 200) {
              const todoList = res.data.data.map((item: any) => {
                return {
                  title: item.title,
                  content: item.content,
                  id: item.id,
                  createdAt: item.createdAt,
                  updatedAt: item.updatedAt.split("T")[0],
                };
              });
              return todoList
            }
          } catch (error) {}
    },
    getTodoById : async (id:string) => {
        try {
            if (id === undefined) {
              throw Object.assign(new Error())
            }
          const res = await axios.get(TODO_URL + `/${id}`);
          if (res.status === 200) {
            return res.data.data
          }
        } catch (error) {
        }
      },
      deleteTodo : async (id: string) => {
        if (!window.confirm("삭제하시겠습니까?")) return false;
    
        try {
          const res = await axios.delete(TODO_URL + `/${id}`);
          if (res.status === 200) {
          }
        } catch (error) {}
      }
}


export default TodoService