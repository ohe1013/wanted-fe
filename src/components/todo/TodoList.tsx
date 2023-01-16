import { useNavigate } from "react-router-dom";
import { Todo, TodoListProp } from "../../types/todo";
import { BasicButton } from "../cmm/Button";

const ToDoList = ({ todos, openModal, deleteTodo }: TodoListProp) => {
  const navigate = useNavigate();

  return (
    <div className="-my-8 justify-center divide-y-2 divide-gray-100">
      {todos !== undefined ? (
        todos.map((todo: Todo) => (
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
              <BasicButton type="button" cb={() => deleteTodo(todo.id)} color={"red"} msg="삭제" />
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
  );
};

export default ToDoList;
