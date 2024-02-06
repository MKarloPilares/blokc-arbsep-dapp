import React, { useState } from 'react';
import { ethers } from 'ethers';
import MyAbi from './MyAbi.json';

interface stakeInfoButtonProps {
  contractAddress: string; // Address of the smart contract
  account: string | null; // User's Ethereum account
}

const StakeInfo: React.FC<stakeInfoButtonProps> = ({contractAddress, account }) => {
  const [output, setOutput] = useState<string | null>(null);

  const readStakeInfo = async () => {
    try {
      // Connect to Ethereum provider
      const provider = new ethers.providers.JsonRpcProvider("https://arbitrum-sepolia.infura.io/v3/b7213d6d3e974b11a1cb3b03740750a6");

      // Connect to the contract using the ABI and address
      const contract = new ethers.Contract(contractAddress, MyAbi, provider);

      // Call stakingInfo function of smart contract
      const result = await contract.stakingInfo(account);

      // Save result to output
      setOutput(result.toString());

    } catch (error) {
      console.error('Error reading smart contract:', error);
    }
  };

  return (
    <p>
      <button onClick={readStakeInfo}>Stake Info: {output}</button>
      <p>
        Amount,Unlock Timestamp(Seconds since epoch),Result
      </p>
    </p>
  );
};

export default StakeInfo;