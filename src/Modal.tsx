import { AxiosError } from "axios";
import React, { FormEvent, useCallback, useEffect, useState } from "react";
import { TODO_URL } from "./data/url";
import "./modal.css";
import axios from "./service/config/axios";
const Modal = (props: {
  children?: any;
  open?: any;
  close?: any;
  main?: any;
  fn?: any;
  type?: any;
}) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, main, fn, type } = props;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    setTitle(main?.title);
    setContent(main?.content);
  }, [main]);

  const changeTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  const changeContent = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res =
        type !== "create"
          ? await axios.put(TODO_URL + `/${props.main.id}`, {
              title,
              content,
            })
          : await axios.post(TODO_URL, {
              title,
              content,
            });
      if (res.status === 200) {
        fn();
        setTitle("");
        setContent("");
        alert(type !== "create" ? "수정하였습니다." : "추가하였습니다.");
        close();
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
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {type === "create" ? "TODO 추가" : "TODO 수정"}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <form onSubmit={onSubmit} className="w-full max-w-sm">
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="title"
                  >
                    제목
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    id="title"
                    onChange={changeTitle}
                    value={title || ""}
                    name="title"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="content"
                  >
                    내용
                  </label>
                </div>
                <div className="md:w-2/3">
                  <textarea
                    onChange={changeContent}
                    id="content"
                    value={content || ""}
                    name="content"
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3"></div>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-blue-400 hover:bg-blue-600 mr-5 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    {type === "create" ? "추가" : "수정"}
                  </button>
                  <button
                    className="shadow bg-gray-400 hover:bg-gray-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    onClick={close}
                    type="button"
                  >
                    close
                  </button>
                </div>
              </div>
            </form>
          </main>
          <footer></footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
