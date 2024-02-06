import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import MyAbi from './MyAbi.json';

interface unlockButtonProps {
  contractAddress: string; // Address of the smart contract
  account: string | null; // User's Ethereum account
}

const UnlockStake: React.FC<unlockButtonProps> = ({contractAddress, account }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [errorOutput, setErrorOutput] = useState<string | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const unlockTokens= async () => {
    if (!provider || !account) {
      console.error('User is not connected to an Ethereum wallet.');
      return;
    }

    // Create a signer from the user's Ethereum account
    const signer: Signer = provider.getSigner();
    
      // Connect to the contract using the ABI and address
    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    try {
      // Call unlockTokens Function of smart contract
      const transaction = await contract.unlockTokens();

      await transaction.wait();

    } catch (error) {
      setErrorOutput("Tokens Still Locked")
    }
  };

  return (
    <p>
      <button onClick={unlockTokens}>Unlock</button>
      <p>
        {errorOutput}
      </p>
    </p>
  );
};

export default UnlockStake;