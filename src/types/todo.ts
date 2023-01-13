export type Todo = {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    isEdit: boolean;
  };

  export type TodoServiceParam = {
    setTodos : React.Dispatch<React.SetStateAction<Todo[] | undefined>>
  }