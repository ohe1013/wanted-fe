import { AxiosError } from "axios";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { axiosTodo } from "../../api/axios";
import { TODO_URL } from "../../data/url";
import Modal from "../../Modal";
import { Todo } from "./TodoMain";

const ToDoList = () => {
  const [todos, setTodos] = useState<Todo[]>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todoDetail, setTodoDetail] = useState<Todo>();

  const changeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const changeContent = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosTodo.post(TODO_URL, {
        title,
        content,
      });
      if (res.status === 200) {
        setTitle("");
        setContent("");
        getTodos();
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

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

  const openModal = (prop: Todo) => {
    setTodoDetail((prev) => {
      return (prev = prop);
    });
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <form onSubmit={onSubmit}>
        <input onChange={changeTitle} name="title" value={title} placeholder="제목" />
        <input
          onChange={changeContent}
          name="content"
          value={content}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">등록</button>
      </form>
      <div className="container px-5 py-24 mx-auto">
        <div className="-my-8 divide-y-2 divide-gray-100">
          {todos !== undefined ? (
            todos.map((todo) => (
              <div key={todo.id} className="py-8 flex flex-wrap md:flex-nowrap justify-center">
                <div className=" w-2/12 md:mb-0 mb-6 flex-shrink-0 flex flex-col self-center">
                  <span className="font-semibold title-font text-gray-700">{todo.title}</span>
                  <span className="mt-1 text-gray-500 text-sm">{todo.updatedAt}</span>
                </div>
                <div className="flex">
                  <h2
                    style={{ width: "600px" }}
                    className="text-2xl font-medium text-gray-900 title-font mb-2 self-center"
                  >
                    {todo.content}
                  </h2>
                  <div>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-indigo-500 block mt-4"
                    >
                      삭제
                    </button>
                    <button onClick={() => openModal(todo)} className="text-indigo-500 block mt-4">
                      수정
                    </button>
                  </div>
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
          header="Todo 수정"
        ></Modal>
      </div>
    </section>
  );
};

export default ToDoList;
