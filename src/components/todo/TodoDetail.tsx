import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosTodo } from "../../api/axios";
import { TODO_URL } from "../../data/url";
import { Todo } from "./TodoMain";

const TodoDetail = () => {
  const param = useParams();
  const [todo, setTodo] = useState<Todo>();
  const getTodoById = async () => {
    try {
      const res = await axiosTodo.get(TODO_URL + `/${param.id}`);
      if (res.status === 200) {
        setTodo(res.data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getTodoById();
  }, []);

  return (
    <div>
      <span>{todo?.title}</span>
    </div>
  );
};

export default TodoDetail;
