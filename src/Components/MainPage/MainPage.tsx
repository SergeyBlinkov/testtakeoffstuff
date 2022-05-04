import React, {useEffect, useState} from 'react';
import './MainPage.css'
import './Mobile.css'
import {Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../Redux/ReduxStore";
import {contactChangeBool, contactDataReq, contactDeleteReq, contactUpdateReq} from "../../Redux/ContactDataSlice";
import {ContactObject, InputEvent} from "../../ExportTypeComponent";
import CreateUser from "./CreateUser";


const MainPage = () => {
    const dispatch = useAppDispatch()
    const contactData = useAppSelector(state => state.contactData)
    useEffect(() => {
        dispatch(contactDataReq())
    }, [dispatch])
    const [currData, setCurrData] = useState<ContactObject>({
        uid: Number(),
        name: '',
        age: Number(),
        phone: Number(),
        isEdit: false
    })
    const [search, setSearch] = useState('')
    const handleChange = (e: InputEvent) => {
        const {name, value} = e.target
        return setCurrData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSearch = (e: InputEvent) => {
        let value = e.target.value
        return setSearch(value)
    }
    const searchFunc = (value: string) => {
        const searchResult = contactData.data.filter(val => val.name.includes(value) || val.phone.toString().includes(value))
        return value.length > 0 ? searchResult : contactData.data
    }
    return (
        <div className={'wrapper'}>
        <div className={'MainPage'}>

            <CreateUser/>
            <div className={'dark-line'}></div>
            <div className={'search-line'}>
                <h2>Список пользователей</h2>
                <div className={'search-line_inBar'}>
                    <p>Поиск по имени и телефону</p>
                    <TextField  onChange={handleSearch}/>
                </div>
            </div>
            {contactData.errs && <div style={{textAlign:'center',color:'red',marginTop:20}}>{contactData.errs.message}</div>}
            <div className={'Contact-list'}>
                {contactData.isLoading && <div className={'loader loader_mainPage'}><i className="fa-solid fa-circle-notch loading-pic"></i></div>}{
                searchFunc(search).map((val, index) => {
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
                                    return dispatch(contactChangeBool(val.uid))
                                }
                                }>изменить</Button> :
                                <Button
                                    variant={'outlined'}
                                    onClick={() => dispatch(contactUpdateReq(currData))
                                    }>сохранить</Button>}
                            <Button variant={'outlined'} onClick={()=>dispatch(contactDeleteReq(val.uid))}>удалить</Button>
                        </div>
                    </div>
                })
            }</div>
        </div>
        </div>
    );
};

export default MainPage;