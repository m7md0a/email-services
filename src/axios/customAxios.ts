'use client'
import axios from "axios";
import { store } from "@/redux/store";


const customAxios = () => {
    const {user} = store.getState().auth;
    if (user) {
        return axios.create({
            baseURL: `https://api.mail.tm/`,
            headers: {
                'authorization': `Bearer ${user?.token}`,
                patch: {
                    'Content-Type': 'application/merge-patch+json'
                }
            }
        });
    }
    return axios.create({baseURL: `https://api.mail.tm/`})
}

export default customAxios;