import {takeLatest,put,delay} from "redux-saga/effects";
import {DataUser} from "./CreateUserSaga";
import {setPersistence, browserSessionPersistence} from 'firebase/auth'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../index";
import {toast} from "react-toastify";
import {loginUserFailure, loginUserSuccess} from "./LoginUserSlice";

const loginFunc =(user:DataUser) => {
    const {email,password} = user.payload
    return setPersistence(auth,browserSessionPersistence).then(
        () => signInWithEmailAndPassword(auth, email, password).then((userCred)=>{
            toast('Вы вошли в личный кабинет')
            return userCred
        })
    )
        .catch((error) => {
            toast(`${error.message}`)
            throw error
        })

}

function* LoginUserWorker (user:DataUser) {
    try{
        delay(500)
        const data:void = yield loginFunc(user)
        yield put(loginUserSuccess(data))
    } catch (e) {
        yield put(loginUserFailure(e))
    }



}

export default function* LoginUserSaga () {
    yield takeLatest('userLogin/loginUserReq',LoginUserWorker)
}