import axios, { AxiosError } from "axios";
import { FormEvent, useRef, useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { EMAIL_REGEXR } from "../../data/regex";
import { LOGIN_URL } from "../../data/url";
import ApiService from "../../service/apiService";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEXR.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = password.length >= 8;
    setValidPassword(result);
  }, [password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(LOGIN_URL, {
        email,
        password,
      });
      if (res.status === 200) {
        const accessToken = res?.data?.token;
        localStorage.setItem("accessToken", accessToken);

        alert(res?.data?.message);
        setEmail("");
        setAuth((prev) => (prev.accessToken = accessToken));
        setPassword("");
        ApiService.setHader();
        navigate("/");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrMsg(err.response?.data.details);
        alert(err.response?.data.details + ". \n아이디와 비밀번호를 확인해주세요");
      } else {
        console.log(err);
      }
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">로그인</h1>
        </div>

        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex-wrap -m-2">
              <div className="p-2 w-1/2 mx-auto my-0">
                <div className="relative">
                  <label htmlFor="email" className="leading-7 text-sm text-gray-600">
                    이메일
                  </label>
                  <input
                    type="text"
                    id="email"
                    ref={emailRef}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    onFocus={() => setEmailFocus(true)}
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <p
                    className={
                      emailFocus && email && !validEmail
                        ? "sm:text-l text-l font-medium title-font mb-4 text-red-500"
                        : "hidden"
                    }
                  >
                    유효한 이메일 주소가 아닙니다!
                  </p>
                </div>
              </div>
              <div className="p-2 w-1/2 mx-auto my-0">
                <div className="relative">
                  <label htmlFor="password" className="leading-7 text-sm text-gray-600">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    autoComplete="off"
                    required
                    onFocus={() => setPasswordFocus(true)}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <p
                className={
                  passwordFocus && password && !validPassword
                    ? "sm:text-l text-l font-medium title-font mb-4 text-red-500"
                    : "hidden"
                }
              >
                비밀번호는 8자리 이상입니다!
              </p>
              {errMsg !== "" ? (
                <div className="flex flex-col text-center w-full ">
                  <p className="sm:text-l text-l font-medium title-font mb-4 text-red-500">
                    {errMsg}
                  </p>
                </div>
              ) : null}
              <div className="p-2 w-full">
                <button
                  disabled={validEmail && validPassword ? false : true}
                  className={
                    validEmail && validPassword
                      ? "flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                      : "flex mx-auto text-white bg-slate-500 border-0 py-2 px-8 focus:outline-none rounded text-lg"
                  }
                >
                  로그인
                </button>
              </div>
            </div>
          </form>
          <div className="mt-2">
            <span>
              <span>뭔가를 찾기 </span>
              <span className="text-gray-300"> | </span>
              <span className="inline-block font-bold hover:text-red-300">
                <Link to="/register">회원가입</Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
