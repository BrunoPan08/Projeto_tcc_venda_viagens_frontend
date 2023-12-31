import React, {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthProvider';
import { Link, useNavigate  } from 'react-router-dom';
import './Login.css'

import axios from '../api/axios'
const LOGIN_URL = '/api/Auth/login';

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();
    const navigation = useNavigate();

    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(() => {
        setErrMsg('');
    },[username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, 
                {
                    username: username,
                    password: password
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            setusername('');
            setPassword('');
            setSuccess(true);
            navigation('/mainpage');            
        } catch (err) {
            if(!err?.response) {
                setErrMsg('Sem resposta do servidor')
            } else if (err.response?.status === 400) {
                setErrMsg('Nao foi encontrado nome ou senha');
            } else if (err.response?.status === 401) {
                setErrMsg('Não autorizado');
            } else {
                setErrMsg('Login falho');
            }
            errRef.current.focus();
        }

    }

    return (
        <>
        <section >
          <div className="login-container">
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live="assertive">
              {errMsg}
            </p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-content">
                <h1>Logar</h1>
                <div className="input-container">
                  <label>Nome:</label>
                  <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setusername(e.target.value)}
                    value={username}
                    required
                  />
                </div>
                <div className="input-container">
                  <label>Senha:</label>
                  <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
                <button type="submit">Logar</button>
              </div>
              <p className="register-info">
                Precisa de uma conta?{' '}
                <span className="line">
                  <Link to="/register">Registrar</Link>
                </span>
              </p>
            </form>
          </div>
        </section>
      </>
    );
  };

export default Login