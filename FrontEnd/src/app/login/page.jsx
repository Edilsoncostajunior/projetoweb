'use client';
import { useState, useContext } from "react";
import Styles from "./log.module.css";
import "./log.module.css";
import { Context } from '../components/context/UserContext';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginNurse } = useContext(Context);

  const handleLogin = (e) => {
    e.preventDefault()
    loginNurse({ email, password });
  };

  return (
    <div className={Styles.login}>
      <div className={Styles.left_content}>
        <div className={Styles.bg}>
          <div className={Styles.group_2}>
            <div className={Styles.ellipse_1}></div>
            <div className={Styles.ellipse_2}></div>
          </div>

          <div className={Styles.content}>
            <h4 className={Styles.frame_4}>Obstare</h4>
            <h1 className={Styles.frame_3}>Sistema de gerenciamento de gestantes</h1>
          </div>
        </div>
      </div>

      <div className={Styles.right_content}>
        <div className={Styles.wrap_title}>
          <span className={Styles.title_login}> Login </span><br />
          <span className={Styles.title_subLogin}>Bem-vindo de volta</span>
        </div>

        <div className={`${Styles.form_input}`}>
          <div className={`${Styles.wrap_input}`}>
            <svg className={Styles.decor} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g>
                <path fillRule="evenodd" clipRule="evenodd" d="M1.5 5.25L2.25 4.5H21.75L22.5 5.25V18.75L21.75 19.5H2.25L1.5 18.75V5.25ZM3 6.8025V18H21V6.804L12.465 13.35H11.55L3 6.8025ZM19.545 6H4.455L12 11.8035L19.545 6Z" />
              </g>
            </svg>
            <input className={Styles.input}
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={Styles.wrap_input}>
            <svg className={Styles.decor} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <g>
                <path d="M20 12C20 10.897 19.103 10 18 10H17V7C17 4.243 14.757 2 12 2C9.243 2 7 4.243 7 7V10H6C4.897 10 4 10.897 4 12V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V12ZM9 7C9 5.346 10.346 4 12 4C13.654 4 15 5.346 15 7V10H9V7Z" />
              </g>
            </svg>
            <input className={Styles.input}
              placeholder="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={Styles.wrap_button}>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>

        <div className={Styles.text_center}>
          <a href="#" className={Styles.esqueci_minha_senha}>Esqueci minha senha </a>
        </div>
        <div className={Styles.wrap_Theme_btn}></div>
      </div>
    </div>
  );
}

export default Login;
