import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosTodo } from "../../api/axios";
import { TODO_URL } from "../../data/url";
import Modal from "../../Modal";
import TodoDetail from "./TodoDetail";
import { Todo } from "./TodoMain";

const ToDoList = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [todoModal, setTodoModal] = useState<Todo>();
  const [type, setType] = useState("");
  const [todoDetail, setTodoDetail] = useState<Todo>();
  const params = useParams();
  const navigate = useNavigate();

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
        getTodoById();
      }
    } catch (error) {}
  };

  const deleteTodo = async (id: string) => {
    if (!window.confirm("삭제하시겠습니까?")) return false;

    try {
      const res = await axiosTodo.delete(TODO_URL + `/${id}`);
      if (res.status === 200) {
        getTodos();
      }
    } catch (error) {}
  };
  const getTodoById = async () => {
    if (params.id === undefined) {
      setTodoDetail({ title: "", content: "", id: "", createdAt: "", updatedAt: "", isEdit: false });
      return false;
    }
    try {
      const res = await axiosTodo.get(TODO_URL + `/${params.id}`);
      if (res.status === 200) {
        setTodoDetail(res.data.data);
      }
    } catch (error) {
      setTodoDetail({ title: "", content: "", id: "", createdAt: "", updatedAt: "", isEdit: false });
    }
  };
  useEffect(() => {
    getTodoById();
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
      <button
        className="shadow bg-teal-400 hover:bg-teal-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
        type="submit"
        onClick={() => {
          openModal("create");
        }}
      >
        TODO 추가
      </button>
      <div className="container justify-center flex px-5 py-24 mx-auto">
        <div className="-my-8 justify-center divide-y-2 divide-gray-100">
          {todos !== undefined ? (
            todos.map((todo) => (
              <div key={todo.id} className="justify-center flex">
                <div style={{ width: "500px" }} className="max-w-md py-4 px-8 bg-white shadow-lg  rounded-lg my-20">
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
                  <button
                    onClick={() => navigate(`/todos/${todo.id}`)}
                    className="shadow bg-green-400 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 w-16 rounded"
                  >
                    상세
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="justify-center flex">
              <div style={{ width: "500px" }} className="max-w-md py-4 px-8 bg-white shadow-lg  rounded-lg my-20"></div>
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
