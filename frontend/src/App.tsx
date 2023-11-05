import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainPage } from "./MainPage";
import { ErrorPage } from "./ErrorPage";
import { useWallet } from "./utilities"

type Canceler = () => void
const useAffect = (
  asyncEffect: () => Promise<Canceler | void>,
  dependencies: any[] = []
) => {
  const cancelerRef = useRef<Canceler | void>()
  useEffect(() => {
    asyncEffect()
      .then(canceler => (cancelerRef.current = canceler))
      .catch(error => console.warn('Uncatched error', error))
    return () => {
      if (cancelerRef.current) {
        cancelerRef.current()
        cancelerRef.current = undefined
      }
    }
  }, dependencies)
}


export const App = () => {
  const wallet = useWallet()
  const adminAccount = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; 

  const isEmptyAccount = !wallet?.details.account;
  const isAdmin = wallet?.details.account === adminAccount ;
  console.log("app")
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" >
        <Route index element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
  )
}