import React, {useEffect, useState} from 'react';
import './MainPage.css'
import {Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../Redux/ReduxStore";
import {contactChangeBool, contactDataReq} from "../../Redux/ContactDataSlice";
import {ContactObject, InputEvent} from "../../ExportTypeComponent";
import {updateContact} from "../../apiRequest";



const MainPage = () => {
    const dispatch = useAppDispatch()
    const contactData = useAppSelector(state => state.contactData)
    useEffect(() => {
        dispatch(contactDataReq())
    }, [dispatch])
    const [currData, setCurrData] = useState<ContactObject>({
        id: Number(),
        name: '',
        age: Number(),
        phone: '',
        isEdit: false
    })
    const handleChange = (e: InputEvent) => {
        const {name, value} = e.target
        return setCurrData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    return (
        <div className={'MainPage'}>
            <h2>Список пользователей</h2>
            <div className={'Contact-list'}>{
                contactData.data.map((val, index) => {
                    return <div className={'Contact-list_items'} key={index}>
                        <div className={'Contact-list_items__info'}>
                            <p>Имя</p>
                            <TextField
                                disabled={!val.isEdit}
                                value={!val.isEdit ? val.name : currData.name}
                                name={'name'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={'Contact-list_items__info'}>
                            <p>Полных лет</p>
                            <TextField
                                value={!val.isEdit ? val.age : currData.age}
                                name={'age'}
                                disabled={!val.isEdit}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={'Contact-list_items__info'}>
                            <p>Номер телефона</p>
                            <TextField
                                disabled={!val.isEdit}
                                value={!val.isEdit ? val.phone : currData.phone}
                                name={'phone'}
                                onChange={handleChange}
                            />
                        </div>
                        <div className={'Contact-list_items__button-block'}>
                            {!val.isEdit ?
                                <Button variant={'outlined'} onClick={() => {
                                    setCurrData(val)
                                    return dispatch(contactChangeBool(index))
                                }
                                }>изменить</Button> :
                                <Button
                                    variant={'outlined'}
                                    onClick={() => {
                                    return updateContact(val)
                                }
                                }>сохранить</Button>}
                            <Button variant={'outlined'}>удалить</Button>
                        </div>
                    </div>
                })
            }</div>
        </div>
    );
};

export default MainPage;