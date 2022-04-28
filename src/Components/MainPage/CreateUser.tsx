import React, {useState} from 'react';
import {useAppSelector} from "../../Redux/ReduxStore";
import {Button, TextField} from "@mui/material";
import {InputEvent} from "../../ExportTypeComponent";
import {createContact} from "../../apiRequest";

const CreateUser = () => {
    const contactData = useAppSelector(state=>state.contactData)
    const [newUser,setNewUser] = useState({
        id: Number(),
        name: '',
        age: Number(),
        phone: ''
    })
    const createUserFunc = () => {
        const id = contactData.data.length + 2
        let copy = {...newUser,
        id}
        return createContact(copy)
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
                <TextField name={'name'} onChange={handleChange}/>
                <TextField name={'phone'} onChange={handleChange}/>
                <TextField name={'age'} onChange={handleChange}/>
            </div>
            <Button onClick={createUserFunc}>Создать нового пользователя</Button>
        </div>
    );
};

export default CreateUser;