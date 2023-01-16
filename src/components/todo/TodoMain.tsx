import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import TodoService from "../../service/todoService";
import { openModal, Todo } from "../../types/todo";
import { BasicButton } from "../cmm/Button";
import TodoDetail from "./TodoDetail";
import ToDoList from "./TodoList";

const defaultTodo = {
  title: "",
  content: "",
  id: "",
  createdAt: "",
  updatedAt: "",
};

const TodoMain = () => {
  const params = useParams();
  const [todoDetail, setTodoDetail] = useState<Todo>();
  const [todoModal, setTodoModal] = useState<Todo>();
  const [type, setType] = useState("");
  const [isModalOpend, setIsModalOpend] = useState(false);
  const [todos, setTodos] = useState<Todo[]>();

  const getTodoById = (id: string) =>
    TodoService.getTodoById(id)
      .then((res) => setTodoDetail(res))
      .catch(() => {
        setTodoDetail(defaultTodo);
      });

  useEffect(() => {
    getTodos();
  }, []);
  useEffect(() => {
    if (params.id) {
      getTodoById(params.id);
    }
  }, [params]);
  const getTodos = () => TodoService.getTodos().then((res) => setTodos(res));

  const deleteTodo = (id: string) => TodoService.deleteTodo(id).then(() => getTodos());
  const openModal: openModal<"create" | "update"> = (type, prop) => {
    setType(type);
    setTodoModal(prop);
    setIsModalOpend(true);
  };

  const closeModal = () => {
    setIsModalOpend(false);
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <BasicButton cb={() => openModal("create")} type="button" color={"teal"} msg="추가" />
      <div className="container justify-center flex px-5 py-24 mx-auto">
        <ToDoList todos={todos} openModal={openModal} deleteTodo={deleteTodo} />
        <TodoDetail todo={todoDetail} />
      </div>
      <Modal
        open={isModalOpend}
        close={closeModal}
        fn={getTodos}
        main={todoModal}
        type={type}
      ></Modal>
    </section>
  );
};

export default TodoMain;
