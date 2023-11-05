import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {checkAccount} from "./utilities"
import { useNavigate } from 'react-router-dom';


export const MainPage = () => {
    
    const navigate = useNavigate();
    checkAccount(navigate)

    return (
        <div>
            <h1>Welcome to Pokemon TCG</h1>
            <h2>Main Page</h2>
        </div>
    )


}