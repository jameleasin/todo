import React from 'react'
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


//validate usrname (must have more than 4 characters) and pwd (1 Upper case and 1 lower case required)
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';


const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    //set focus on username input
    useEffect(() => {
      userRef.current.focus();
    }, [])

    //setting username and validating user name to requirements
    useEffect(() => {
      const result = USER_REGEX.test(user);
      setValidName(result)
    }, [user])

    //setting and validating password and password match
     useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    //setting error msg if username, passwrod and passwrod match aren't validated
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])
    
  return (
    <section>
      <p ref={errRef} className={errMsg ? "errMsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

      <h1>Register</h1>

      <form>
        <label htmlFor="username">
          Username: 
        </label>
        <input
            type="text"
            id="username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            aria-invalid={validName ? "false" : "true"}
            aria-describedby="uidnote"
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            />
             <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
      </form>
    </section>
  )
}

export default Register