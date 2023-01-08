const TodoDetail = (prop: any) => {
  const { todo } = prop;

  return (
    <div className="-my-8 ml-20 justify-center divide-y-2 divide-gray-100">
      <div className="justify-center">
        <h1 className="text-gray-800 text-center text-2xl font-semibold">📝상세보기</h1>
        <div style={{ width: "500px" }} className="max-w-md py-4 px-8 bg-white shadow-lg  rounded-lg my-20">
          <div className="flex justify-center  -mt-16">
            <h1 className="text-gray-800 text-center text-2xl font-semibold">
              {!!todo?.title ? todo?.title : "타이틀"}
            </h1>
          </div>
          <div className="h-96 mt-5">
            <pre className="whitespace-pre-wrap break-words text-gray-500 text-center text-xl font-normal">
              {!!todo?.content ? todo?.content : "상세내용"}
            </pre>
          </div>
          <div className="text-end justify-end mt-4">
            <p className="text-l font-medium text-gray-500">게시일:{todo?.createdAt.split("T")[0]}</p>
            <p className="text-l font-medium text-gray-500">수정일:{todo?.updatedAt.split("T")[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
