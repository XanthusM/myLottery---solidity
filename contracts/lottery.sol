pragma solidity ^0.8.0;

contract myLottery  //xx bad identation, use some plugin for solidity
{
    address public manager;  //xx use also immutable modifier (save gas)
    address [] public lotteryPlayers;
    uint public prizeAmount; //xx use also immutable modifier (save gas)
    uint public ticketPrice; //xx use also immutable modifier (save gas)
    mapping (address => uint) public balance;
    uint public winnerNum;

    modifier managerOnly() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint _prizeAmount){
        manager = msg.sender;
        prizeAmount= _prizeAmount;
    }

    function f() view external returns(uint256) {return 42;}

    function buyLotteryTicket() public payable{
        require(msg.value >= 1 ether, "SMALL_ETH");
        lotteryPlayers.push(msg.sender);
     }

    function finishLottery() public managerOnly {
        require(lotteryPlayers.length != 0 );
        bytes memory randomInfo = abi.encodePacked(block.timestamp,block.difficulty,lotteryPlayers.length);
        bytes32 randomHash = keccak256(randomInfo);
        winnerNum = uint(randomHash)%lotteryPlayers.length;
        payable(lotteryPlayers[winnerNum]).transfer(prizeAmount);
        lotteryPlayers = new address[](0);
    }

    function getPlayers() public view returns(address[] memory) {
        return lotteryPlayers;
    }
}
