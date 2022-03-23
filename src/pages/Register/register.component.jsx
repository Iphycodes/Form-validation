import React, {useState, useRef, useEffect} from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
 import {Link} from 'react-router-dom'

import { faCheck, faTimes, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import '../Register/register.styles.scss'


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// const PWD_REGEX = /^(?=.*[a-z][A_Z])(?=.*[a-z])(?=.*[A_Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef()
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidmatchPwd] = useState(false);
    const [matchPwdFocus, setmatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result)
        console.log(user)
        setValidName(result)
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd)
        console.log(pwd)
        console.log(`${result} for pwd`)
        setValidPwd(result)
        const match = pwd === matchPwd
        setValidmatchPwd(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd, matchPwd])

    const clearMessage = () => {
        setErrMsg('')
    }

    const submitForm = (e) => {
        e.preventDefault()

        if(validName && validPwd && validMatchPwd){
            console.log(user)
            setSuccess(true)
            setErrMsg('Successfully created an account')
            setTimeout(clearMessage, 5000) 
        }
        else{

            setErrMsg('Something went wrong')

            setTimeout(clearMessage, 5000) 
        }
        
    }

    return (
        <section>
            
            <p ref={errRef} className={errMsg && success? 'success errmsg' : errMsg && !success ? 'fail errmsg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1>Register</h1>
            {success ? <span className="link"><Link to='/'>Sign in</Link> </span>: 
            <form onSubmit={submitForm}>
                <label htmlFor="username">
                    Username:
                <span className={validName ? 'valid' : 'hide'}><FontAwesomeIcon icon={faCheck}/></span>
                <span className={validName || !user ? 'hide' : 'invalid'}><FontAwesomeIcon icon={faTimes}/></span>
                </label>
                <input 
                type="text"
                id = "username"
                ref={userRef}
                autoComplete = "off"
                onChange = {(e) => {setUser(e.target.value)}}
                onFocus = {() => {setUserFocus(true)}}
                onBlur = {() => {setUserFocus(false)}}
                required
                aria-invalid = {validName ? 'false' : 'true'}
                aria-describedby = 'uidnote'
                />
                <p id='uidnote' className={userFocus && !validName ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faCircleInfo}/>
                    4 to 24 characters <br/>
                    Must start with lowercase, or uppercase letter, may include numbers, hyphens or underscore<br/>
                </p>

                <label htmlFor="pwd">
                    Password:
                    <span className={validPwd ? 'valid' : 'hide'}><FontAwesomeIcon icon={faCheck}/></span>
                    <span className={ validPwd || !pwd ? 'hide' : 'invalid'}><FontAwesomeIcon icon={faTimes}/></span>
                </label>
                <input 
                type="password" 
                id = 'pwd'
                onChange = {(e) => {setPwd(e.target.value)}}
                onFocus = {() => {setPwdFocus(true)}}
                onBlur = {() => {setPwdFocus(false)}}
                // required
                aria-invalid = {validPwd ? 'false' : 'true'}
                aria-describedby = 'pwdnote'
                />
                <p id='pwdnote' className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faCircleInfo}/>
                    8 to 24 characters <br/>
                    Must include a lowercase letter, an Uppercase letter, a number and special characters<br/>
                </p>


                <label htmlFor="confirm_pwd">
                    Confirm password:
                    <span className={validMatchPwd && matchPwd? 'valid' : 'hide'}><FontAwesomeIcon icon={faCheck}/></span>
                    <span className={validMatchPwd || !matchPwd ? 'hide' : 'invalid'}><FontAwesomeIcon icon={faTimes}/></span>
                </label>
                <input 
                type="password" 
                id = 'confirm_pwd'
                onChange = {(e) => {setMatchPwd(e.target.value)}}
                onFocus = {() => {setmatchPwdFocus(true)}}
                onBlur = {() => {setmatchPwdFocus(false)}}
                // required
                aria-invalid = {validPwd ? 'false' : 'true'}
                aria-describedby = 'confirm_pwdnote'
                />

                <p id='confirm_pwdnote' className={matchPwdFocus && !validMatchPwd ? 'instructions' : 'offscreen'}>
                    <FontAwesomeIcon icon={faCircleInfo}/>
                    8 to 24 characters <br/>
                    Must include a lowercase letter, an Uppercase letter, a number and special characters<br/>
                </p>

                <button disabled={!validName || !validPwd || !validMatchPwd ? false : false}>Sign Up</button>

                
                <p>Already have an account?<br/>
                <span className="line">
                   <Link className="link" to='#'>Sign in</Link> 
                </span>
                </p>


            </form>
}
        </section>
    )
   
}


export default Register;