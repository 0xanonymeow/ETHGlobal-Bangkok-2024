// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { Test, console } from "forge-std/Test.sol";
import { Splitly } from "../src/Splitly.sol";
import { MockERC20 } from "solmate/test/utils/mocks/MockERC20.sol";

contract SplitlyTest is Test {
    Splitly public splitly;

    address restaurant = makeAddr("restaurant");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    MockERC20 public usdc;

    function setUp() public {
        splitly = new Splitly();
        usdc = new MockERC20("USDC", "USDC", 6);
    }

    function test_selectMenu() public {
        uint256 billId = _createBill();
        vm.prank(alice);
        splitly.selectMenu(billId, new uint256[](1));

        assertEq(splitly.getBillDetail(billId)[0].owner, alice);
    }

    function test_payBill() public {
        uint256 billId = _createBill();

        vm.prank(alice);
        uint256[] memory aliceMenu = new uint256[](1);
        aliceMenu[0] = 0;
        splitly.selectMenu(billId, aliceMenu);

        vm.prank(bob);
        uint256[] memory bobMenu = new uint256[](1);
        bobMenu[0] = 1;
        splitly.selectMenu(billId, bobMenu);

        deal(address(usdc), alice, 10e6);
        deal(address(usdc), bob, 20e6);
        vm.prank(alice);
        usdc.approve(address(splitly), 10e6);
        vm.prank(bob);
        usdc.approve(address(splitly), 20e6);

        uint256 aliceBalanceBefore = usdc.balanceOf(alice);
        uint256 bobBalanceBefore = usdc.balanceOf(bob);
        uint256 restaurantBalanceBefore = usdc.balanceOf(restaurant);

        assertEq(aliceBalanceBefore, 10e6, "Alice");
        assertEq(bobBalanceBefore, 20e6, "Bob");
        assertEq(restaurantBalanceBefore, 0, "Restaurant");

        splitly.pay(billId, address(usdc));

        uint256 aliceBalanceAfter = usdc.balanceOf(alice);
        uint256 bobBalanceAfter = usdc.balanceOf(bob);
        uint256 restaurantBalanceAfter = usdc.balanceOf(restaurant);

        assertEq(aliceBalanceAfter, 0, "Alice");
        assertEq(bobBalanceAfter, 0, "Bob");
        assertEq(restaurantBalanceAfter, 30e6, "Restaurant");
    }

    function _createBill() internal returns (uint256) {
        Splitly.Menu[] memory menus = new Splitly.Menu[](2);
        menus[0] = Splitly.Menu({ name: "Pizza", cost: 10e6, owner: address(0) });
        menus[1] = Splitly.Menu({ name: "Burger", cost: 20e6, owner: address(0) });
        vm.prank(restaurant);
        uint256 billId = splitly.createBill(menus);

        assertEq(splitly.getBillDetail(billId).length, 2);
        assertEq(splitly.getBillCost(billId), 30e6);
        assertEq(splitly.billRestaurant(billId), restaurant);
        assertEq(splitly.getBillDetail(billId)[0].name, "Pizza");
        assertEq(splitly.getBillDetail(billId)[1].name, "Burger");
        assertEq(splitly.getBillDetail(billId)[0].cost, 10e6);
        assertEq(splitly.getBillDetail(billId)[1].cost, 20e6);
        assertEq(splitly.getBillDetail(billId)[0].owner, address(0));
        assertEq(splitly.getBillDetail(billId)[1].owner, address(0));

        return billId;
    }
}
