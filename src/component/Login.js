import React, {useRef, useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';

import axios from '../api/axios'
const LOGIN_URL = '/api/Auth/login';

const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

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
        {success ? (
            <section>
                <h1>você está logado!</h1>
                <br/>
                <p>
                    <a href="#">Acessar a pagina home</a>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Logar</h1>
                <form onSubmit={handleSubmit}>
                    <label>Nome:</label>
                    <input 
                        type="text" 
                        id="username"
                        ref={userRef}
                        autoComplete='off'
                        onChange={(e) => setusername(e.target.value)}
                        value={username}
                        required
                    />
                    <label>Senha:</label>
                    <input 
                        type="password" 
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Logar</button>
                </form>
                <p>
                    Precisa de uma conta?<br/>
                    <span className="line">
                        <Link to="/register">Registrar</Link>
                    </span>
                </p>
            </section>
        )}
    </>
    )
}

export default Login