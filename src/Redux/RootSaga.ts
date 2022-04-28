import {all} from 'redux-saga/effects'
import CreateUserSaga from "./CreateUserSaga";
import LoginUserSaga from "./LoginUserSaga";
import ContactDataSaga from './ContactDataSaga'

export default function* RootSaga () {
    yield all([
        CreateUserSaga(),
        LoginUserSaga(),
        ContactDataSaga()
    ])
}