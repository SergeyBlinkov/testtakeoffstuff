import * as Yup from "yup";
import {useFormik} from "formik";
import {Button, TextField} from "@mui/material";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../Redux/ReduxStore";
import {createUserReq} from "../../Redux/createUserSlice";

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .email('Invalid Email')
        .max(20, 'Too Long!')
        .required('Required'),
    password: Yup.string()
        .required('Required')
        .min(6,"More then 6 characters"),
});

const CreateUser = () => {
    const regInfo = useAppSelector(state=>state.createUser)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues:{email : '',
        password: ''},
    onSubmit:(values) => {
        dispatch(createUserReq(values))
}, validationSchema:SignupSchema
    })
    return  (
        <form className={'Login'} onSubmit={formik.handleSubmit}>
            <h2>Registration Form</h2>
            <TextField
                error={(!!formik.errors.email && formik.touched.email) || !!regInfo.errs.message}
                label={'Email'}
                name={'email'}
                type={'email'}
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={(formik.errors.email && formik.touched.email) ? formik.errors.email : ''}
            />
            <TextField
                error={(!!formik.errors.password && formik.touched.password) || (!!regInfo.errs.message)}
                label={'Password'}
                name={'password'}
                type={'password'}
                onChange={formik.handleChange}
                value={formik.values.password}
                helperText={(formik.errors.password && formik.touched.password) ? formik.errors.password : ''}
            />
            <div className={'feedBack'}>
            {regInfo.isLoading?
                <i className="fa-solid fa-circle-notch loading-pic"></i>:
                <span className={'errs-Line'}>{regInfo.errs.message}</span>
            }
            </div>
            <div className={'button-block'}>
                <Button
                    type={'submit'}
                    variant={'outlined'}>Зарегистрироваться</Button>
                <Button
                    href={'http://localhost:3000/'}
                    variant={'outlined'}>Назад</Button>
            </div>

        </form>
    )
};

export default CreateUser