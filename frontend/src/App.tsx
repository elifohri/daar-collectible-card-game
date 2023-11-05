import { useEffect, useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ErrorPage } from "./ErrorPage";
import { useWallet } from "./utilities"

import ListCards from "./components/ListCards"
import Header from './components/Header';
import Button from './components/Button';

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
  return(
    <>
      <Header />
      <Button />
      <ListCards/>
    </>
  )
}