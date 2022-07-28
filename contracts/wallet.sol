// SPDX-License-Identifier: MIT
pragma solidity > 0.4.0 < 0.9.0;

import "hardhat/console.sol";
contract wallet {
    uint contractBalance;
    mapping (address => uint) myBalance;

    function getHello () public pure returns (string memory) {
        return "Hello";
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;  //contractBalance;
    }

    function getMyBalance() public view returns (uint) {
        return myBalance[msg.sender];
    }
    function depositEther() public payable {
        myBalance[msg.sender] += msg.value;
        contractBalance += msg.value;
    }

    function withdrawEther(uint amt) public {
        uint amount = amt * (1 ether);
        console.log(amt);
        require(myBalance[msg.sender] > amount, "Funds Insufficient!");
        address me = msg.sender;
        address payable mine = payable(me);
        mine.transfer(amount);
        myBalance[me] -= amount;
        contractBalance -= amount;
    }
}