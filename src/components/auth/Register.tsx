import { AxiosError } from "axios";
import { FormEvent, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EMAIL_REGEXR } from "../../data/regex";
import { SIGNUP_URL } from "../../data/url";
import axios from "../../service/config/axios";

const Regsiter = () => {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const [errMsg, setErrMsg] = useState("");
  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

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
    const istMatch = password === matchPassword;
    setValidMatch(istMatch);
  }, [password, matchPassword]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(SIGNUP_URL, {
        email,
        password,
      });
      const accessToken = res?.data?.token;
      localStorage.setItem("accessToken", accessToken);
      alert(res?.data?.message);
      setEmail("");
      setPassword("");
      setMatchPassword("");
      navigate(-1);
    } catch (err) {
      if (err instanceof AxiosError) {
        setErrMsg(err.response?.data.details);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            회원가입
          </h1>
        </div>

        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <form onSubmit={handleSubmit}>
            <div className=" -m-2">
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
                    onFocus={() => setPasswordFocus(true)}
                    autoComplete="off"
                    value={password}
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <p
                    className={
                      passwordFocus && password && !validPassword
                        ? "sm:text-l text-l font-medium title-font mb-4 text-red-500"
                        : "hidden"
                    }
                  >
                    비밀번호는 8자리 이상입니다!
                  </p>
                </div>
              </div>
              <div className="p-2 w-1/2 mx-auto my-0">
                <div className="relative">
                  <label htmlFor="matchPassword" className="leading-7 text-sm text-gray-600">
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    id="matchPassword"
                    name="matchPassword"
                    onChange={(e) => setMatchPassword(e.target.value)}
                    autoComplete="off"
                    value={matchPassword}
                    onFocus={() => setMatchFocus(true)}
                    required
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  <p
                    className={
                      matchFocus && matchPassword && !validMatch
                        ? "sm:text-l text-l font-medium title-font mb-4 text-red-500"
                        : "hidden"
                    }
                  >
                    비밀번호가 다릅니다
                  </p>
                </div>
              </div>
              {errMsg !== "" ? (
                <div className="flex flex-col text-center w-full mb-12">
                  <p className="sm:text-l text-l font-medium title-font mb-4 text-red-500">
                    {errMsg}
                  </p>
                </div>
              ) : null}
              <div className="p-2 w-full">
                <button
                  disabled={validEmail && validPassword && validMatch ? false : true}
                  className={
                    validEmail && validPassword && validMatch
                      ? "flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                      : "flex mx-auto text-white bg-slate-500 border-0 py-2 px-8 focus:outline-none rounded text-lg"
                  }
                >
                  이메일로 회원가입
                </button>
              </div>
            </div>
          </form>
          <div className="mt-2">
            <span>
              <span>이미 회원이시라면 </span>
              <span className="inline-block font-bold hover:text-red-300">
                <Link to="/auth">로그인</Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Regsiter;
