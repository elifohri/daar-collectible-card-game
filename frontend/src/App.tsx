import { useEffect, useMemo, useRef, useState } from 'react'
import * as ethereum from '@/lib/ethereum'
import * as main from '@/lib/main'

import ListCards from "./components/ListCards"
import Header from './components/Header';
import Button from './components/Button';

const useWallet = () => {
  const [details, setDetails] = useState<ethereum.Details>()
  const [contract, setContract] = useState<main.Main>()
  useAffect(async () => {
    const details_ = await ethereum.connect('metamask')
    console.log("sdf")
    if (!details_) return
    setDetails(details_)
    const contract_ = await main.init(details_)
    if (!contract_) return
    setContract(contract_)
  }, [])
  return useMemo(() => {
    if (!details || !contract) return
    return { details, contract }
  }, [details, contract])
}

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

  const owner = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";

  const walletInfo = useWallet();
  walletInfo?.contract.balanceOf(owner);
  walletInfo?.contract.getAllCollections();

  return(
    <>
      <Header />
      <Button />
      <ListCards/>
    </>
  )
}