// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract MemoryToEarn is ERC20, ERC20Burnable, AccessControl {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    mapping (address=>bool) diaryHolder;

    event newDiaryHolder(address indexed holder);
    event minted(address indexed holder);
    event burned(address indexed holder);

    modifier onlyDiaryHolder (){
        require(diaryHolder[msg.sender], "Not Diary holder");
        _;
    }

    constructor() ERC20("MemoryBurningToken", "MBT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burn() public onlyDiaryHolder {
        require(balanceOf(msg.sender) > 10 * 10 ** decimals(), "Not have enough money.");
        _burn(msg.sender, 1 * 10 ** decimals());
        emit burned(msg.sender);
    }

    function tempMint() public onlyDiaryHolder {
        _grantRole(MINTER_ROLE, msg.sender);
        mint(msg.sender, 10 * 10 ** decimals());
        _revokeRole(MINTER_ROLE, msg.sender);
        emit minted(msg.sender);
    }

    function createDiary() public {
        diaryHolder[msg.sender] = true;
        emit newDiaryHolder(msg.sender);
    }

    function diaryHolderCheck() public view returns (bool) {
        return diaryHolder[msg.sender];
    }
}