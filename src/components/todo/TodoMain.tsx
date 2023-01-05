import ToDoList from "./TodoList";

export type Todo = {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  isEdit: boolean;
};

const TodoMain = () => {
  return (
    <div>
      <ToDoList />
    </div>
  );
};

export default TodoMain;
