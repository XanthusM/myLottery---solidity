const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

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
    let players;

    beforeEach(async function () {
        prizeAmount = toBN(10).pow(toBN(18));  // 10**18
        myLotteryFactory = await ethers.getContractFactory("myLottery");
        myLottery = await myLotteryFactory.deploy(prizeAmount);
        await myLottery.deployed();
        signers = await ethers.getSigners();
        owner = signers[0];
        player = signers[1];
        player2 = signers[2];
        players = await myLottery.showPLayers();
    });

     it('has an manager', async function () {
        expect(await myLottery.f()).to.equal(42);
    });


  it('only manager picking winner test', async () => {
       try{
      await myLottery.methods.finishLottery().send({
     	from: signers[0]
           });
     	    assert(false);
     	} catch(err){
     	    assert(err);
     	}
     });


    it('single account enterance test',async function () {
        await myLottery.buyLotteryTicket({
            from: signers[0].address,
            value: web3.utils.toWei('1','ether')
        });
        const players = await myLottery.showPLayers();
        assert.equal(signers[0].address, players[0]);
        assert.equal(1, players.length);
    });


    it('sending money and reseting array test', async function() {
        const provider = waffle.provider;
		await myLottery.buyLotteryTicket({
			from: signers[0].address,
			value: web3.utils.toWei('2','ether')
		});

		const initialBalance = await provider.getBalance(signers[0].address);

		await myLottery.finishLottery();

		const finalBalance = await provider.getBalance(signers[0].address);
		const diff = finalBalance - initialBalance;
		assert(diff >= 1.8);
	});
    
 });
 