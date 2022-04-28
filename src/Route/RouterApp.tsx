import React, {useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import {privateKeys, publicKeys} from "./Route";
import Login from "../Components/Login/Login";
import MainPage from "../Components/MainPage/MainPage";
import {useAppDispatch, useAppSelector} from "../Redux/ReduxStore";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../index";
import {loginUserSuccess} from "../Redux/LoginUserSlice";


const RouterApp = () => {
    const user = useAppSelector(state =>state.user)
    const dispatch =useAppDispatch()
    useEffect(()=> {
        onAuthStateChanged(auth,(info) => info ?
            dispatch(loginUserSuccess(info)) :
            null)
    },[dispatch])

    return user.isLogged  ? (
        <Routes>
            {privateKeys.map(({path,element}) => <Route key={path} element={element} path={path} />)}
            <Route path={'*'} element={<MainPage />} />
        </Routes>
    ) : (
        <Routes>
            {publicKeys.map(({path,element}) => <Route key={path} element={element} path={path}/>)}
            <Route path={'*'} element={<Login />} />
        </Routes>
    )
};

export default RouterApp;