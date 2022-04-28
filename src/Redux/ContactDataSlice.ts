import {createSlice} from "@reduxjs/toolkit";
import {ContactObject} from "../ExportTypeComponent";



interface ContactType {
    isLoading: boolean;
    data: Array<ContactObject>;
    errs: object;
}

const init: ContactType = {
    isLoading: false,
    data: [],
    errs: {}
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
            state.data = action.payload.contact.map((val: ContactObject) => {
                return {
                    ...val,
                    isEdit: false
                }
            })
        },
        contactDataFailure: (state, action) => {
            state.isLoading = false
            state.errs = action.payload
        },
        contactChangeBool: (state,action) => {
        const i = action.payload
            state.data[i].isEdit = !state.data[i].isEdit
        }
    }
})
export const {contactDataReq, contactDataFailure, contactDataSuccess,contactChangeBool} = ContactDataSlice.actions

export default ContactDataSlice.reducer