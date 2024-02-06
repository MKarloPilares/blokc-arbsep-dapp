import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import MyAbi from './MyAbi.json';

interface MintButton {
  contractAddress: string; // Address of the smart contract
  account: string | null; // User's Ethereum account
}

const MintButton: React.FC<MintButton> = ({ contractAddress, account }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const handleMint = async () => {
    if (!provider || !account) {
      console.error('User is not connected to an Ethereum wallet.');
      return;
    }

    // Create a signer from the user's Ethereum account
    const signer: Signer = provider.getSigner();

      // Connect to the contract using the ABI and address
    const contract = new ethers.Contract(contractAddress, MyAbi, signer);

    try {
      // Call the stakeTokens function of smart contract
      const transaction = await contract.mint(account, 1);

      await transaction.wait();

    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  return (
    <button onClick={handleMint}>
      Mint
    </button>
  );
};

export default MintButton;