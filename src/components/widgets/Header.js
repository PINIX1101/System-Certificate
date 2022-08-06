import React, { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

export function Header() {
  const [wallet, setWallet] = useState('')
  const [balance, setBalance] = useState('')
  const json = require('../../assets/chains.json')

  useEffect(() => {
    window.ethereum.on('accountsChanged', function (accounts) {
      setWallet(accounts[0])
      getBalance()
    });
    window.ethereum.on("chainChanged", function(chain) {
      getBalance()
    });
    connect();
    getBalance();
  })

  const connect = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setWallet(address)
  }

  const getBalance = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const balance = await signer.getBalance()
    const result = (balance / 1e18).toFixed(4)
    const currency = await provider.getNetwork()
    setBalance(`${result.toString()} ${getChainDetail(currency.chainId).nativeCurrency.symbol}`)
  }

  const getChainDetail = (chainId) => {
    const detail = json.find(item => item.chainId === chainId)
    return detail
  }

  console.log(wallet == '');
  return (
    <header>
      <h1>Sertifikat</h1>
      <div className='account'>
        <h3>Lorem Ipsum</h3>
        <p>{wallet}</p>
        <p>{balance}</p>
      </div>
    </header>
  )
}