import React, { useState, useEffect } from 'react';
import StakeButton from './components/Button/StakeButton';
import StakeInfo from './components/Button/StakeInfo';
import UnlockStake from './components/Button/Unlock';
import TextField from './components/TextField/Textfield';
import { Uint256 } from 'web3';
import './App.css';


 
const App: React.FC = () => {
 const [isMetamaskInstalled, setIsMetamaskInstalled] = useState<boolean>(false);
 const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);
 const [Stake, setStake] = useState("")
 const [Duration, setDuration] = useState("")

 const handleChangeStake = (value: Uint256) => {
  setStake(value);
}

const handleChangeDuration = (value: Uint256) => {
  setDuration(value);
}
 
 useEffect(() => {
   if((window as any).ethereum){
     //check if Metamask wallet is installed
     setIsMetamaskInstalled(true);
   }
 },[]);
 
 //Does the User have an Ethereum wallet/account?
 async function connectMetamaskWallet(): Promise<void> {
   //to get around type checking
   (window as any).ethereum
     .request({
         method: "eth_requestAccounts",
     })
     .then((accounts : string[]) => {
       setEthereumAccount(accounts[0]);
     })
     .catch((error: any) => {
         alert(`Something went wrong: ${error}`);
     });
 }
 
 if (ethereumAccount === null) {
   return (
     <div className="App App-header">
       {
         isMetamaskInstalled ? (
           <div>
             <button onClick={connectMetamaskWallet}>Connect Your Metamask Wallet</button>
           </div>

         ) : (
           <p>Install Your Metamask wallet</p>
         )
       }
 
     </div>
   );
 }
 
 
  return (
   <div className="App">
     <header className="App-header">
     <h1>Pilares Coin Generator</h1>
       <p>
         ETH wallet connected as: {ethereumAccount}
         <TextField value={Stake} onChange={handleChangeStake} placeholder='Amount of Stake in wei' />
         <TextField value={Duration} onChange={handleChangeDuration} placeholder='Duration of Stake in days' />
         <StakeButton contractAddress="0x5beE2Ee6b8E359E83959Fa7528274865f6454B5d" account={ethereumAccount} StakeAmount={Stake} Duration={Duration}/>
         <StakeInfo contractAddress="0x5beE2Ee6b8E359E83959Fa7528274865f6454B5d" account={ethereumAccount}/>
         <UnlockStake contractAddress="0x5beE2Ee6b8E359E83959Fa7528274865f6454B5d" account={ethereumAccount}/>
       </p>
     </header>
   </div>
 ); 
}
 
export default App;