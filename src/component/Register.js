import React, {useRef, useState, useEffect} from 'react';
import { faCheck,faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import './Register.css'
import { Link } from 'react-router-dom';

const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/api/Auth/register';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setusername] = useState('');
  const [validName, setValidName] = useState(false);
  const [usernameFocus, setusernameFocus] = useState(false);

  const [password, setpassword] = useState('');
  const [validpassword, setValidpassword] = useState(false);
  const [passwordFocus, setpasswordFocus] = useState(false);

  const [matchpassword, setMatchpassword] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(username);
    console.log(result);
    console.log(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidpassword(result);
    const match = password === matchpassword;
    setValidMatch(match);
  }, [password, matchpassword]);

  useEffect(() => {
    setErrMsg('');
  }, [username, password, matchpassword, email])

  useEffect(() => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = emailRegex.test(email);
    setValidEmail(isValid);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const isusernameValid = USER_REGEX.test(username);
    const ispasswordValid = PWD_REGEX.test(password);
    if (!isusernameValid || !ispasswordValid || !validEmail) {
      setErrMsg("Entrada inválida");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, {
        username,
        password,
        email
      });
  
      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      if(!err?.response) {
        setErrMsg('sem resposta do servidor');
      } else if(err.response?.status === 409) {
        setErrMsg('Nome do usuário foi usado')
      } else {
        setErrMsg('Registro falho')
      }
      errRef.current.focus();
    }
  }

  return (
    <>
    {success ? (
      <section>
        <h1>Sucesso!</h1>
        <p>
        <Link to="/">Logar</Link>
        </p>
      </section>
    ) : (
    <section>
      <div className="register-container">
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form className='register-form' onSubmit={handleSubmit}>
        <div className="login-content">
          <h1>Registro</h1>
            <label htmlFor="username">
              Usuário:
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={validName || !username ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
            </label>
            <input
              type="text"
              id="userName"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setusername(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setusernameFocus(true)}
              onBlur={() => setusernameFocus(false)}
            />
            <p id="uidnote" className={usernameFocus && username &&
              !validName ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle}/>
              Entre 4 a 24 caracteres.<br/>
              Deve começar com uma letra.<br/>
              Letras, numeros, sublinhado e hífen são permitidos.
              </p>

            <label htmlFor="password">
              Senha:
              <span className={validpassword? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={validName || !password ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
              required
              aria-invalid={validpassword ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setpasswordFocus(true)}
              onBlur={() => setpasswordFocus(false)}
            />
            <p id="pwdnote" className={passwordFocus && !validpassword ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle}/>
              Entre 8 a 24 caracteres.<br/>
              Deve incluir letra maiuscula e minuscula, um numero e um special caracter.<br/>
              Permitido especial caracteres: <span aria-label="exclamation">!</span> <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirma senha:
              <span className={validMatch? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
              <span className={validMatch || !matchpassword ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faCheck}/>
              </span>
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchpassword(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle}/>
              Deve conter a senha do primeiro campo
            </p>

            <label htmlFor="email">
            Email:
            <span className={validEmail ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validEmail || !email ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-invalid={validEmail ? "false" : "true"}
            aria-describedby="emailnote"
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
          />
          <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />
            Insira um endereço de email válido.
          </p>

            <button disabled={!validName || !validpassword || !validMatch ? true : false}>Registrar</button>
          <p className="register-info">
            Já está registrado?<br/>
            <span className="line">
            <Link to="/">Logar</Link>
            </span>
          </p>
        </div>
        </form>
      </div>
    </section>
    )}
    </>
  )
}

export default Register