import {CREATEUSER_ROUTE, LOGIN_ROUTE, MAIN_PAGE_ROUTE} from "./utils";
import Login from "../Components/Login/Login";
import MainPage from "../Components/MainPage/MainPage";
import CreateUser from "../Components/Login/CreateUser";


export const publicKeys = [{
    path : LOGIN_ROUTE,
    element : <Login />
    },
    {path : CREATEUSER_ROUTE,
    element: <CreateUser />
    }]
export const privateKeys = [{
    path: MAIN_PAGE_ROUTE,
    element: <MainPage />
}]