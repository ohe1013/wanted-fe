import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TODO_URL } from "../../data/url";
import Modal from "../../Modal";
import axios from "../../service/config/axios";
import TodoService from "../../service/todoService";
import { Todo } from "../../types/todo";
import { BasicButton } from "../cmm/Button";
import Loading from "../cmm/Loading";
import TodoDetail from "./TodoDetail";

const ToDoList = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [todoModal, setTodoModal] = useState<Todo>();
  const [type, setType] = useState("");
  const [todoDetail, setTodoDetail] = useState<Todo>();
  const params = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const defaultTodo = {
    title: "",
    content: "",
    id: "",
    createdAt: "",
    updatedAt: "",
    isEdit: false,
  };

  const getTodos = () => TodoService.getTodos().then((res) => setTodos(res));
  const getTodoById = (id: string) =>
    TodoService.getTodoById(id)
      .then((res) => setTodoDetail(res))
      .catch(() => {
        setTodoDetail(defaultTodo);
      });
  const deleteTodo = (id: string) => TodoService.deleteTodo(id).then(() => getTodos);

  useEffect(() => {
    if (params.id) {
      getTodoById(params.id);
    }
  }, [params]);

  useEffect(() => {
    getTodos();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (type: string, prop?: Todo) => {
    setType(type);
    setTodoModal(prop);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      {loading && <Loading type="spin" color="black" message={""} />}
      <BasicButton type="submit" color={"teal"} msg="추가" />
      <div className="container justify-center flex px-5 py-24 mx-auto">
        <div className="-my-8 justify-center divide-y-2 divide-gray-100">
          {todos !== undefined ? (
            todos.map((todo) => (
              <div key={todo.id} className="justify-center flex">
                <div
                  style={{ width: "500px" }}
                  className="max-w-md py-4 px-8 bg-white shadow-lg  rounded-lg my-20"
                >
                  <div className="flex justify-center md:justify-end -mt-16"></div>
                  <div>
                    <h2 className="text-gray-800 text-2xl font-semibold">{todo.title}</h2>
                    <p className="mt-2 truncate text-xl text-gray-600">{todo.content}</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <p className="text-l font-medium text-gray-500">{todo.updatedAt}</p>
                  </div>
                </div>
                <div className="w-10">
                  <BasicButton
                    type="button"
                    cb={() => deleteTodo(todo.id)}
                    color={"red"}
                    msg="삭제"
                  />
                  <BasicButton
                    type="button"
                    cb={() => openModal("update", todo)}
                    color={"blue"}
                    msg="수정"
                  />
                  <BasicButton
                    type="button"
                    cb={() => navigate(`/todos/${todo.id}`)}
                    color={"yellow"}
                    msg="상세"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="justify-center flex">
              <div
                style={{ width: "500px" }}
                className="max-w-md py-4 px-8 bg-white shadow-lg  rounded-lg my-20"
              ></div>
            </div>
          )}
        </div>
        <TodoDetail todo={todoDetail} />
      </div>
      <Modal open={modalOpen} close={closeModal} fn={getTodos} main={todoModal} type={type}></Modal>
    </section>
  );
};

export default ToDoList;
