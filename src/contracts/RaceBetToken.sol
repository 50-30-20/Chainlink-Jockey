// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./token/TokenERC20.sol";
import {SafeMath} from "./utils/SafeMath.sol";

contract RaceBetToken is Token {
    constructor() Token(msg.sender, 1000000, "RCB", 18) {}

    function mintToUser() public {
        faucet();
    }
}
