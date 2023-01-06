import { AxiosError } from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosTodo } from "../../api/axios";
import { TODO_URL } from "../../data/url";
import Modal from "../../Modal";
import { Todo } from "./TodoMain";

const ToDoList = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [todoDetail, setTodoDetail] = useState<Todo>();
  const [type, setType] = useState("");

  const getTodos = async () => {
    try {
      const res = await axiosTodo.get(TODO_URL);
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
        setTodos(todoList);
      }
    } catch (error) {}
  };

  const deleteTodo = async (id: string) => {
    try {
      const res = await axiosTodo.delete(TODO_URL + `/${id}`);
      if (res.status === 200) {
        getTodos();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getTodos();
  }, []);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = (type: string, prop?: Todo) => {
    setType(type);
    setTodoDetail(prop);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <button
        className="shadow bg-teal-400 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="submit"
        onClick={() => {
          openModal("create");
        }}
      >
        추가
      </button>
      <div className="container px-5 py-24 mx-auto">
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
                    <p className="mt-2 text-xl text-gray-600">{todo.content}</p>
                  </div>
                  <div className="flex justify-end mt-4">
                    <p className="text-l font-medium text-gray-500">{todo.updatedAt}</p>
                  </div>
                </div>
                <div className="w-10">
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="shadow bg-red-400 hover:bg-red-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 w-16 rounded"
                  >
                    삭제
                  </button>
                  <button
                    onClick={() => {
                      openModal("update", todo);
                    }}
                    className="shadow bg-blue-400 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 w-16 rounded"
                  >
                    수정
                  </button>
                  <Link to={`/todos/${todo.id}`}>
                    <button className="shadow bg-green-400 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 w-16 rounded">
                      상세
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </div>
        <Modal
          open={modalOpen}
          close={closeModal}
          fn={getTodos}
          main={todoDetail}
          type={type}
        ></Modal>
      </div>
    </section>
  );
};

export default ToDoList;
