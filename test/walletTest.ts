import { expect } from "chai";
import { ethers } from "hardhat";
//import { Wallet } from "../typechain-types";


describe("Wallet", async () => {
    describe("Balance", () => {
        it("for now balance should be zero!", async () => {
            const Wallet = await ethers.getContractFactory("wallet");
            const contract = await Wallet.deploy();        
            await contract.deployed();
            expect(await contract.getContractBalance()).to.equal(0);
        })
    })
    describe('Checking balance', () => {
        it("we'll first deposit some ether and check if the ether is deposited in our account!!", async () => {
            const Wallet = await ethers.getContractFactory("wallet");
            const contract = await Wallet.deploy();        
            await contract.deployed();
            await contract.depositEther({value: 3});
            const bal = await contract.getMyBalance();
            expect(bal).to.be.not.undefined;
            expect(bal).to.be.not.null;
            expect(bal.toNumber()).equal(3);
        })
        it("Should get contract balance to be 3!!", async () => {
            const Wallet = await ethers.getContractFactory("wallet");
            const contract = await Wallet.deploy();        
            await contract.deployed();
            
            await contract.depositEther({value: 3});
            const contractBal = await contract.getContractBalance();
            expect(contractBal).to.be.not.undefined;
            expect(contractBal).to.be.not.null;
            expect(contractBal.toNumber()).equal(3);
        })
    })
    describe('Withdrawal!', () => {
        it("Should revert", async () => {
            const Wallet = await ethers.getContractFactory("wallet");
            const contract = await Wallet.deploy();

            await contract.deployed();
            await contract.depositEther({value: 3});
            let Bal = await contract.getMyBalance();
            expect(Bal).equal(3);

            const errorMessage = contract.withdrawEther(5);
            await expect(errorMessage).revertedWith("Funds Insufficient!");
        })
        it("Should decrement the contract balance!!", async () => {
            const Wallet = await ethers.getContractFactory("wallet");
            const contract = await Wallet.deploy();

            await contract.deployed();
            await contract.depositEther({value: 3});
            await contract.withdrawEther(2);
            const total = await contract.getContractBalance();
            expect(total).equal(1);
        })
    })
})

