import React from "react";

export type InputEvent = React.ChangeEvent<HTMLInputElement>;

export type ContactObject = {
    name: string;
    phone: number;
    uid: number;
    age: number;
    isEdit: boolean;
}
export type createTypePromise = {
    name: string;
    phone: number;
    uid: number;
    age: number;
}

