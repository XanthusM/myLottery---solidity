const { expect } = require("chai");
const { ethers } = require("hardhat");

const assert = require('assert');
const web3 = require('web3');
const ganache = require('ganache-cli');
const w3 = new web3(ganache.provider());

const chai = require('chai');
const { BigNumber } = require("@ethersproject/bignumber");
chai.use(require('chai-bignumber')());
chai.use(require('chai-web3-bindings'));


const toBN = function(val) {
    return BigNumber.from(val);
}


describe("lottery", function () {
    let prizeAmount;
    let signers;
    let owner;
    let myLottery;
    let myLotteryFactory;

    beforeEach(async function () {
        prizeAmount = toBN(10).pow(toBN(18));  // 10**18
        myLotteryFactory = await ethers.getContractFactory("myLottery");
        myLottery = await myLotteryFactory.deploy(prizeAmount);
        await myLottery.deployed();
        signers = await ethers.getSigners();
        owner = signers[0];
        player = signers[1];
    });

   //  it('has an manager', async function () {
    //    expect(await myLottery.f()).to.equal(42);
   // });

   // it('only manager picking winner test', async function () {
  // await myLottery.buyLotteryTicket.connect(signers[1].address, value: web3.utils.toWei('1','ether') );
  // await expect(myLottery.connect(signers[1]).finishLottery() ).to.be.revertedWith('not manager',
   // );
   // });
    
   // it('single account enterance test',async function () {
  // const price = web3.utils.toWei('2','ether')
      // await myLottery.buyLotteryTicket(signers[0], price);
      // await myLottery.finishLottery(signers[0]);
            // const players = await myLottery.getPlayers();

     // expect(await getPLayers.to.be.equal(signers[0].address, players[1]));
     // expect(await players(signers[0].address).length.to.be.equal(1));
    // });
    
    it('sending money and reseting array test', async function () {
    const price = web3.utils.toWei('2','ether')
		await myLottery.buyLotteryTicket(signers[0], price);
		

		const initialBalance = await web3.eth.getBalance(signers[0]);

		await myLottery.finishLottery(signers[0]);
		
		const finalBalance = await web3.eth.getBalance(signers[0]);
		const diff = finalBalance - initialBalance;
		assert(diff > web3.utils.toWei('1.8','ether'));
	});
    
 });
 
