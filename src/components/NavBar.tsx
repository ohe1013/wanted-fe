import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <Link
        className="flex w-2/12 mb-5 justify-center mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        to="/"
      >
        홈
      </Link>
      <Link
        className="flex w-2/12 mb-5 justify-center mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        to="/auth"
      >
        로그인
      </Link>
      <Link
        className="flex w-2/12 justify-center mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        to="/todos"
      >
        투두S
      </Link>
    </div>
  );
};

export default NavBar;
