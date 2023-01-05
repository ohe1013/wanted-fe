import { AxiosError } from "axios";
import React, { FormEvent, useCallback, useState } from "react";
import { axiosTodo } from "../../api/axios";
import { TODO_URL } from "../../data/url";

const TodoInert = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };
  return (
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
  );
};

export default TodoInert;
