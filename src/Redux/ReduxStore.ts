import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createUserReducer from './createUserSlice'
import LoginUserReducer from './LoginUserSlice'
import createSagaMiddleware from 'redux-saga'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import RootSaga from "./RootSaga";
import ContactDataReducer from "./ContactDataSlice";

const newSaga = createSagaMiddleware()

export const store = configureStore({
    reducer: {
        user: LoginUserReducer,
        createUser: createUserReducer,
        contactData: ContactDataReducer
    },
    middleware: [newSaga]
});

newSaga.run(RootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;