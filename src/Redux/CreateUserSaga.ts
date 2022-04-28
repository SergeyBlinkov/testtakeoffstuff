import {takeLatest,put} from 'redux-saga/effects'
import {createUserWithEmailAndPassword } from 'firebase/auth'
import {auth} from "../index";
import {toast} from "react-toastify";
import {createUserFailure, createUserSuccess} from "./createUserSlice";

export interface DataUser {
    type:string;
    payload:{email:string,password:string;}
}

const createUserPromise = async (user:DataUser) => {
    const {email,password} = user.payload
    await createUserWithEmailAndPassword(auth,email,password)
        .then((userCred)=> {
            toast('Вы успешно зарегистрировали свой аккаунт')
            return userCred
        })
        .catch(e=> {
            toast(`Что то пошло не так ${e.message}`)
            throw e
        }

     )
}
 function* CreateUserWorker (user:DataUser) {
    try{
        yield createUserPromise(user)
        yield put(createUserSuccess())
    } catch (e) {
        yield put(createUserFailure(e))
    }

}


export default function* CreateUserSaga () {
 yield takeLatest('user/createUserReq',CreateUserWorker)
}