// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PilaresCoin is ERC20  {
    constructor(uint256 initialSupply) ERC20("PilaresCoin", "PIL") {
        _mint(msg.sender, initialSupply);
    }
    struct StakingInfo {
        uint256 stakedAmount;
        uint256 unlockTimestamp;
        uint256 stakeResult;
    }

    // Mapping to store staking information for each user
    mapping(address => StakingInfo) public stakingInfo;

    // Staking and locking events
    event TokensStaked(address indexed staker, uint256 amount, uint256 unlockTimestamp);
    event TokensUnlocked(address indexed staker, uint256 amount);

    //Function to mint token
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    // Function to stake tokens with a specified lock duration
    function stakeTokens(uint256 amount, uint256 lockDurationInDays) external {
        require(amount > 0, "Amount must be greater than 0");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Lock the tokens for the specified duration
        uint256 unlockTimestamp = block.timestamp + (lockDurationInDays * 1 seconds);

        //Computes result of staking
        uint256 stakeResult = amount+ (amount * lockDurationInDays);

        // Update staking information
        stakingInfo[msg.sender] = StakingInfo(amount, unlockTimestamp, stakeResult);

        // Transfer tokens to the contract
        transfer(address(this), amount);

        emit TokensStaked(msg.sender, amount, unlockTimestamp);
    }

    // Function to unlock tokens if the lock duration has passed
    function unlockTokens() external {
        require(stakingInfo[msg.sender].stakedAmount > 0, "No tokens staked");
        require(block.timestamp >= stakingInfo[msg.sender].unlockTimestamp, "Tokens still locked");

        uint256 stakedResult = stakingInfo[msg.sender].stakeResult;

        // Clear staking information
        delete stakingInfo[msg.sender];

        // Transfer tokens back to the staker
        _mint(msg.sender, stakedResult);

        emit TokensUnlocked(msg.sender, stakedResult);
    }
}