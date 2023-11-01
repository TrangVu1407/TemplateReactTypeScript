import { useEffect } from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes'

import axios from "axios"
import config from '../config';
import type { typeLocalStorage } from "local-storage/localStorage"

export default function ThemeRoutes() {
    const data: typeLocalStorage = JSON.parse(localStorage.getItem("localStorage") || "{}");
    let navigate = useNavigate();
    useEffect(() => {
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
    axios.defaults.baseURL = config.API_URL;

    return useRoutes([MainRoutes, AuthenticationRoutes]);
}
