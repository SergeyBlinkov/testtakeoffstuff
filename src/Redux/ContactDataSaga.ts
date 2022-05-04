import {put, takeLatest} from "redux-saga/effects";
import axios from "axios";
import {
    contactCreateFailure, contactCreateSuccess,
    contactDataFailure,
    contactDataSuccess, contactDeleteFailure,
    contactUpdateFailure,
    contactUpdateSuccess, deleteContactSuccess, newContactSuccess, updateContactSuccess
} from "./ContactDataSlice";
import {createContact, deleteContact, updateContact} from "../apiRequest";
import {ContactObject} from "../ExportTypeComponent";

interface DataType {
    data:object;
    status:number;
    statusText:string;
    headers:object;
    config:object;
    request:Request
}
type Payload = {
    type:string;
    payload: ContactObject
}

const getContact = async() => {
    const baseURL = 'http://localhost:8000'
    return await axios.get(baseURL + '/contact')
        .then((cred) => cred)
        .catch((e) => {
            throw e
        })
}

function* ContactDataWorker() {
    try {
        const data:DataType = yield getContact()
        yield put(contactDataSuccess(data.data))
    } catch (e) {
        yield put(contactDataFailure(e))
    }
}
function* ContactUpdateWorker (data:Payload) {
    try{
        yield updateContact(data.payload)
        yield put(contactUpdateSuccess())
        yield put(updateContactSuccess(data.payload))
    } catch (e) {
        yield put(contactUpdateFailure(e))
    }
}
function* ContactCreateWorker (data:Payload) {
    try {
        yield createContact(data.payload)
        yield put(contactCreateSuccess())
        yield put(newContactSuccess(data.payload))
    } catch (e) {
        yield put(contactCreateFailure(e))
    }
}
function* ContactDeleteWorker(uid:{type:string;payload:number}) {
    try {
        yield deleteContact(uid.payload)
        yield put(contactCreateSuccess())
        yield put(deleteContactSuccess(uid.payload))
    } catch (e) {
        yield put(contactDeleteFailure(e))
    }
}
export default function* ContactDataSaga() {
   yield takeLatest('contactData/contactDataReq', ContactDataWorker)
       yield takeLatest('contactData/contactUpdateReq', ContactUpdateWorker)
    yield takeLatest('contactData/contactCreateReq', ContactCreateWorker)
    yield takeLatest('contactData/contactDeleteReq', ContactDeleteWorker)
}