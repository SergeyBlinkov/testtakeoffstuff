import React from 'react';
import {Button, TextField} from "@mui/material";
import './Login.css'
import {useFormik} from "formik";
import * as Yup from 'yup'
import {useAppDispatch, useAppSelector} from "../../Redux/ReduxStore";
import {loginUserReq} from "../../Redux/LoginUserSlice";

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .required('Required'),
    password: Yup.string()
        .required('Required'),
});

const Login = () => {
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues : {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            dispatch(loginUserReq(values))
        },
        validationSchema:SignupSchema
    })
    return <div className={'wrapper'}><form className={'Login'} onSubmit={formik.handleSubmit}>
            <h2>Login Form</h2>
           <TextField
               error={(!!formik.errors.email && formik.touched.email) || !!user.errs.message}
               label={'Email'}
               name={'email'}
               type={'email'}
               onChange={formik.handleChange}
               value={formik.values.email}
               helperText={(formik.errors.email && formik.touched.email) ? formik.errors.email : ''}
           />
            <TextField
                error={(!!formik.errors.password && formik.touched.password) || !!user.errs.message}
                label={'Password'}
                name={'password'}
                type={'password'}
                onChange={formik.handleChange}
                value={formik.values.password}
                helperText={(formik.errors.password && formik.touched.password) ? formik.errors.password : ''}
            />
            <div className={'feedBack'}>
                {user.isLoading?
                    <i className="fa-solid fa-circle-notch loading-pic"></i>:
                    <span className={'errs-Line'}>{user.errs.message}</span>
                }
            </div>
            <div className={'button-block'}>
                <Button
                    type={'submit'}
                    variant={'outlined'}>Логин</Button>
                <Button
                    variant={'outlined'}
                    href={'http://localhost:3000/newuser'}
                >
                    Создать аккаунт
                </Button>
            </div>
    </form></div>

};

export default Login;