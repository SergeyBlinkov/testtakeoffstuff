import {createSlice} from "@reduxjs/toolkit";
import {ContactObject} from "../ExportTypeComponent";



interface ContactType {
    isLoading: boolean;
    data: Array<ContactObject>;
    errs: { message:string };
}

const init: ContactType = {
    isLoading: false,
    data: [],
    errs: {message: ''}
}
export const ContactDataSlice = createSlice({
    name: 'contactData',
    initialState: init,
    reducers: {
        contactDataReq: (state) => {
            state.isLoading = true
        },
        contactDataSuccess: (state, action) => {
            state.isLoading = false
            state.data = action.payload.rows.map((val: ContactObject) => {
                return {
                    ...val,
                    isEdit: false
                }
            })
            state.data.sort((a,b) => a.uid -b .uid)
        },

        contactDataFailure: (state, action) => {
            state.isLoading = false
            state.errs = action.payload
        },

        contactUpdateReq: (state,action) => {
            state.isLoading = true
        },
        contactUpdateSuccess: (state) => {
            state.isLoading = false
        },
        contactUpdateFailure : (state,action) => {
            state.isLoading = false
            state.errs = action.payload
        },
        contactCreateReq: (state,action) => {
            state.isLoading = true
        },
        contactCreateSuccess : (state) => {
            state.isLoading = false
        },
        contactCreateFailure: (state,action) => {
            state.isLoading = false
            state.errs = action.payload
        },
        contactDeleteReq: (state,action) => {
            state.isLoading = true
        },
        contactDeleteFailure: (state,action) => {
            state.isLoading = false
            state.errs = action.payload
        },
        // добавление данных на стороне фронтенда
        newContactSuccess:(state,action) => {
            action.payload.isEdit = false
            state.data.push(action.payload)
        },
        updateContactSuccess: (state,action) => {
            const ap = action.payload
            let i = +[...state.data].map((val,index) => val.uid === ap.uid ? index : null)
                .filter(val => val !== null)
            state.data[+i] = ap
        },
        deleteContactSuccess: (state,action) => {
            const ap = action.payload
            state.data = state.data.filter(val => val.uid !== ap)
        },
        contactChangeBool: (state,action) => {
            const i = action.payload
            state.data.map(val=> val.uid === i ? val.isEdit = true : val.isEdit = false)
        },
        //
    }
})
export const {contactDataReq, contactDataFailure, contactDataSuccess,contactChangeBool,
contactUpdateFailure,contactUpdateReq,contactUpdateSuccess,
contactCreateFailure,contactCreateReq,contactCreateSuccess,
newContactSuccess,updateContactSuccess,contactDeleteReq,contactDeleteFailure,deleteContactSuccess} = ContactDataSlice.actions

export default ContactDataSlice.reducer