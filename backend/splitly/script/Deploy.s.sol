// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Script, console } from "forge-std/Script.sol";
import { Splitly } from "../src/Splitly.sol";

contract DeployScript is Script {
    // Save address
    string internal configDir = string.concat(vm.projectRoot(), "/");
    string internal configFilePath = string.concat(configDir, "address.json");

    uint256 internal deployerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
    Splitly splitly;

    function run() public {
        vm.startBroadcast(deployerPrivateKey);
        splitly = new Splitly();

        updateJson(".splitly", address(splitly));
        vm.stopBroadcast();
    }

    function updateJson(string memory _key, address _address) internal {
        vm.writeJson(vm.toString(_address), configFilePath, _key);
    }
}
