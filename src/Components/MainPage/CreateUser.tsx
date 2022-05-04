import React, {useState} from 'react';
import {useAppDispatch} from "../../Redux/ReduxStore";
import {Button, TextField} from "@mui/material";
import {InputEvent} from "../../ExportTypeComponent";
import {contactCreateReq} from "../../Redux/ContactDataSlice";
import * as yup from 'yup'

type NewUser = {
    name:string;
    age:number;
    phone:number;
}
const init:NewUser = {
    name: '',
    age: Number(),
    phone: Number()
}

const createUserSchema = yup.object().shape({
    name: yup.string().required(),
    phone: yup.number().required(),
    age: yup.number().required().positive()
})

const CreateUser = () => {
    const dispatch = useAppDispatch()
    const [newUser,setNewUser] = useState(init)
    const [errs,setErrs] = useState('')
    const createUserFunc = () => {
         if(createUserSchema.isValidSync(newUser)){
            dispatch(contactCreateReq(newUser))
            setErrs('')
        }   else setErrs('Проверьте правильность введенных данных')
    }
    const handleChange = (e:InputEvent) => {
        const {name,value} = e.target
        return setNewUser((prev) => {
            return {...prev,
            [name]:value}
        })
    }

    return (
        <div className={'CreateUserBar'}>
            <h2>Создать нового пользователя</h2>
            <div className={'CreateUserBar_bar'}>
                <TextField name={'name'} label={'Имя'} onChange={handleChange} error={!!errs}/>
                <TextField name={'phone'} label={'Телефон - 8**********'} onChange={handleChange} error={!!errs}/>
                <TextField name={'age'} label={'Возраст'} onChange={handleChange} error={!!errs}/>
                {errs.length > 0 && <p className={'errorsLine'}>{errs}</p>}
            </div>
            <Button variant={'outlined'} onClick={createUserFunc}>Создать нового пользователя</Button>
        </div>
    );
};

export default CreateUser;