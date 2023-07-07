import Container from "../atoms/Container";
import Link from "../atoms/Link";
import InputGroup from "../molecules/InputGroup";
import Button from "../atoms/Button";
import useInput from "../../hooks/useInput";
import Title from "../atoms/Title";
import { register } from "../../services/api";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const navigate = useNavigate();
    const {
        value, 
        handleOnChange, 
        emailError,
        validateEmail,
        passwordError,
        validatePassword,
    } = useInput({
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const [apiErr, setApiErr] = useState("");
    const [passwordConfirmError, setPasswordConfirmError] = useState("");
    const isRegisterError = (emailError || passwordError || value.username === "" || value.email === "" || value.password === "" || value.passwordConfirm==="") ? true: false ;

    const registerReq = () => {
        register({
            email : value.email,
            password : value.password,
            username : value.username,
        })
            .then((res) => {
                navigate("/")
            })
            .catch((err) => {
                console.log("err", err)
                if (err.response && err.response.data && err.response.data.error){
                    setApiErr(err.response.data.error);
                } else {
                    setApiErr("로그인 실패");
                }
            })
    }

    const pwConfirm = () => {
        if (value.password !== value.passwordConfirm) {
            setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
          } else if (value.password === "") {
            setPasswordConfirmError("비밀번호를 확인해주세요.")
          }
          else {
            setPasswordConfirmError("");
          }
        };

    return <Container>
        <Title>회원가입</Title>
        <InputGroup 
            id = "username" 
            type="text" 
            name="username" 
            placeholder="사용자 이름을 입력해주세요." 
            label="이름" 
            value={value.username}
            onChange={handleOnChange}/> 
        <InputGroup 
            id = "email" 
            type="email" 
            name="email" 
            placeholder="이메일(아이디)을 입력해주세요." 
            label="이메일" 
            value={value.email} 
            onChange={handleOnChange} 
            onBlur = {validateEmail}/> 
            { emailError && <div>{emailError}</div>}
        <InputGroup 
            id = "password" 
            type="password" 
            name="password" 
            placeholder="**********" 
            label="비밀번호" 
            value={value.password} 
            onChange={handleOnChange} 
            onBlur = {validatePassword}/> 
            {passwordError && <div>{passwordError}</div>}
        <InputGroup 
            id = "passwordConfirm" 
            type="password" 
            name="passwordConfirm" 
            placeholder="**********" 
            label="비밀번호 확인" 
            value={value.passwordConfirm} 
            onChange={handleOnChange} 
            onBlur = {pwConfirm}/> 
            {passwordConfirmError && <div>{passwordConfirmError}</div>}
        <Button
            disabled={isRegisterError}
            onClick = {() => {
                //api 회원가입 요청
                registerReq()
            }}
        >
            회원가입</Button>
            {apiErr && <div>{apiErr}</div>}
            <Link href={"/"}>홈화면</Link>
    </Container>
};

export default RegisterForm;