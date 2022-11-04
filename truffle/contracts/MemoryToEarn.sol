// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MemoryToEarn is ERC20, ERC20Burnable, AccessControl {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    mapping (address=>uint256) diaryPages;

    event newDiaryHolder(address indexed holder);
    event minted(address indexed holder);
    event burned(address indexed holder);

    modifier onlyDiaryHolder (){
        require(diaryPages[msg.sender] > 0, "Not Diary holder");
        _;
    }

    constructor() ERC20("MemoryEarningToken", "MET") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burn() public onlyDiaryHolder {
        require(balanceOf(msg.sender) > 5 * 10 ** decimals(), "Not have enough money.");
        _burn(msg.sender, 5 * 10 ** decimals());
        diaryPages[msg.sender] += 5;
        emit burned(msg.sender);
    }

    function tempMint() public onlyDiaryHolder {
        require(diaryPages[msg.sender]>0, "No Page");
        _grantRole(MINTER_ROLE, msg.sender);
        mint(msg.sender, 10 * 10 ** decimals());
        diaryPages[msg.sender] -= 1;
        _revokeRole(MINTER_ROLE, msg.sender);
        emit minted(msg.sender);
    }

    function createDiary() public {
        diaryPages[msg.sender] = 5;
        emit newDiaryHolder(msg.sender);
    }

    function getDiaryPages() public view returns (uint256) {
        return diaryPages[msg.sender];
    }
}