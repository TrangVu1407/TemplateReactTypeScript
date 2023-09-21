import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes'

import axios from "axios"
import config from '../config';

export default function ThemeRoutes() {
    axios.defaults.baseURL = config.API_URL;
    
    return useRoutes([MainRoutes, AuthenticationRoutes]);
}
