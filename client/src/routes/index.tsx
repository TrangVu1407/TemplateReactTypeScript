import { useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes'

import axios from "axios"
import config from '../config';
import type { typeLocalStorage } from "local-storage/localStorage"

export default function ThemeRoutes() {
    const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
    axios.defaults.baseURL = config.API_URL;
    let navigate = useNavigate();

    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
    useEffect(() => {
        const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
        if (!data.permissions) {
            return navigate("/login");
        }
        let children = [];
        for (let i = 0; i < data.permissions.length; i++) {
            for (let j = 0; j < MainRoutes.children.length; j++) {
                if (data.permissions[i].screen === MainRoutes.children[j].path) {
                    children.push(MainRoutes.children[j])
                }
            }
        }
        MainRoutes.children = children;
    }, [])

    return useRoutes([MainRoutes, AuthenticationRoutes]);
}
