import { AxiosError } from "axios";
import React, { FormEvent, useState } from "react";
import { axiosTodo } from "./api/axios";
import { TODO_URL } from "./data/url";
import "./modal.css";
const Modal = (props: {
  children?: any;
  open?: any;
  close?: any;
  header?: any;
  main?: any;
  fn?: any;
}) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, main, fn } = props;
  const [title, setTitle] = useState(main?.title);
  const [content, setContent] = useState(main?.content);
  console.log(content, title);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosTodo.put(TODO_URL + `/${props.main.id}`, {
        title,
        content,
      });
      if (res.status === 200) {
        fn();
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
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <form onSubmit={onSubmit}>
              <div>
                <label
                  className="text-2xl font-medium text-gray-900 title-font mb-2 self-center"
                  htmlFor="title"
                >
                  타이틀:
                </label>
                <input
                  id="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  className="text-2xl font-medium text-gray-900 title-font mb-2 self-center"
                  name="title"
                />
              </div>
              <div>
                <label
                  className="text-2xl font-medium text-gray-900 title-font mb-2 self-center"
                  htmlFor="content"
                >
                  내용:
                </label>
                <input
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  id="content"
                  value={content}
                  className="text-2xl font-medium text-gray-900 title-font mb-2 self-center"
                  name="content"
                />
              </div>

              <button className="flex  justify-center mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                수정!
              </button>
            </form>
          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
