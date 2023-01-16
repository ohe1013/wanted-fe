import { ButtonProp } from "../../types/cmm";

const BasicButton = (prop: ButtonProp) => {
  const { type, color, cb, msg } = prop;

  return (
    <button
      type={type}
      onClick={cb}
      className={`shadow bg-${color}-400 hover:bg-${color}-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 w-16 rounded`}
    >
      <span className="hidden bg-red-400 hover:bg-red-600 bg-teal-400 hover:bg-teal-600 bg-blue-400 hover:bg-blue-600 bg-yellow-400 hover:bg-yellow-600"></span>
      {msg}
    </button>
  );
};

export { BasicButton };
