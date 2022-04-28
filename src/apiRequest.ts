import axios from "axios";
import {ContactObject, createTypePromise} from "./ExportTypeComponent";
import {toast} from "react-toastify";


const baseURL = "http://localhost:8000/contact/"

export const deleteContact = async () => {

}

export const updateContact = async (data:ContactObject) => {
    return await axios({
        method:'put',
        url: baseURL,
        params: {
            id:data.id
            },
        data
    }).then((cred) => {
        console.log(cred)
        toast('Все ок')
    })
        .catch(e=> toast(`Ошибка ${e.message}`))
}

export const createContact = async (data:createTypePromise) => {
    return await axios({
        method: "post",
        url: baseURL,
        data
    }).then(() => toast.success('Вы успешно создали новый контакт'))
        .catch((e) => toast.error(`Контакт не создан - ${e.message}`))
}