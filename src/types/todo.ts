export type Todo = {
    title: string;
    content: string;
    id: string;
    createdAt: string;
    updatedAt: string;
  };

  export type TodoServiceParam = {
    setTodos : React.Dispatch<React.SetStateAction<Todo[] | undefined>>
  }

  export type openModal<T> = (type:T,prop?:Todo) => void

  export type TodoListProp = {
    todos ?: Todo[];
    openModal: openModal<"create"|"update">;
    deleteTodo: (id:string)=>void
  }

export type TodoData = {
    title: string,
    content: string
}