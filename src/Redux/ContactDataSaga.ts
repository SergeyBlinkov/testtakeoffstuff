import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {contactDataFailure, contactDataSuccess} from "./ContactDataSlice";

interface DataType {
    data:object;
    status:number;
    statusText:string;
    headers:object;
    config:object;
    request:Request
}

const getContact = async() => {
    const baseURL = 'http://localhost:8000'
    const data = await axios.get(baseURL + '/contact')
        .then((cred) => cred
        )
        .catch((e) => {
            throw e
        })
    return data
}

function* ContactDataWorker() {
    try {
        const data:DataType = yield getContact()
        yield put(contactDataSuccess(data.data))
    } catch (e) {
        yield put(contactDataFailure(e))
    }
}

export default function* ContactDataSaga() {
   yield takeLatest('contactData/contactDataReq', ContactDataWorker)
}