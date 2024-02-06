import React, { useState, useEffect } from 'react';
import { ethers, Signer } from 'ethers';
import MyAbi from './MyAbi.json';
import { Uint256 } from 'web3';

interface StakeButtonProps {
  contractAddress: string; // Address of the smart contract
  account: string | null; // User's Ethereum account
  StakeAmount: Uint256 | string; //Amount to stake in wei
  Duration: Uint256 | string; //Duration of stake in days
}

const StakeButton: React.FC<StakeButtonProps> = ({ contractAddress, account, StakeAmount, Duration }) => {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    // Connect to the Ethereum wallet using Web3
    if (window.ethereum) {
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(web3Provider);
    }
  }, []);

  const handleStake = async () => {
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
      const transaction = await contract.stakeTokens(StakeAmount, Duration);

      await transaction.wait();

    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  return (
    <button onClick={handleStake}>
      Stake
    </button>
  );
};

export default StakeButton;