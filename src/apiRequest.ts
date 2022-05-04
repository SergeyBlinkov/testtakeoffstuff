import axios from "axios";
import {ContactObject, createTypePromise} from "./ExportTypeComponent";
import {toast} from "react-toastify";


const baseURL = "http://localhost:8000/contact/"

export const deleteContact = async (uid:number) => {
     await axios.delete(baseURL + 'deleteContact', {
         data:{uid}
     }).then((cred) =>toast.success(`${cred.data}`)
     ).catch(e => toast.error(`Ошибка ${e.message}`))
}

export const updateContact = async (data:ContactObject) => {
     await axios.put(baseURL+ ":id" + data.uid, {data:data})
         .then((cred) => toast.success(`${cred.data}`))
        .catch(e=> toast.error(`Ошибка ${e.message}`))
}

export const createContact = async (data:createTypePromise) => {
     await axios.post(baseURL + 'createContact',{data}).then((cred) => toast.success(`${cred.data}`))
        .catch((e) => toast.error(`Контакт не создан - ${e.message}`))
}