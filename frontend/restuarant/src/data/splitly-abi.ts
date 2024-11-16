export default [
  { type: "constructor", inputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "billRestaurant",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "bills",
    inputs: [
      { name: "", type: "uint256", internalType: "uint256" },
      { name: "", type: "uint256", internalType: "uint256" }
    ],
    outputs: [
      { name: "name", type: "string", internalType: "string" },
      { name: "cost", type: "uint256", internalType: "uint256" },
      { name: "owner", type: "address", internalType: "address" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "createBill",
    inputs: [
      {
        name: "menus",
        type: "tuple[]",
        internalType: "struct Splitly.Menu[]",
        components: [
          { name: "name", type: "string", internalType: "string" },
          { name: "cost", type: "uint256", internalType: "uint256" },
          { name: "owner", type: "address", internalType: "address" }
        ]
      }
    ],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "currentBillId",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getBillCost",
    inputs: [{ name: "billId", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "totalCost", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getBillDetail",
    inputs: [{ name: "billId", type: "uint256", internalType: "uint256" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct Splitly.Menu[]",
        components: [
          { name: "name", type: "string", internalType: "string" },
          { name: "cost", type: "uint256", internalType: "uint256" },
          { name: "owner", type: "address", internalType: "address" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "pay",
    inputs: [
      { name: "billId", type: "uint256", internalType: "uint256" },
      { name: "token", type: "address", internalType: "address" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "selectMenu",
    inputs: [
      { name: "billId", type: "uint256", internalType: "uint256" },
      { name: "menuIndex", type: "uint256[]", internalType: "uint256[]" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "event",
    name: "BillCreated",
    inputs: [
      {
        name: "billId",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      },
      {
        name: "menuCount",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      },
      {
        name: "restaurant",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "BillPaid",
    inputs: [
      {
        name: "billId",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      },
      {
        name: "restaurant",
        type: "address",
        indexed: false,
        internalType: "address"
      },
      {
        name: "token",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "MenuAdded",
    inputs: [
      {
        name: "billId",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      },
      {
        name: "menu",
        type: "tuple",
        indexed: false,
        internalType: "struct Splitly.Menu",
        components: [
          { name: "name", type: "string", internalType: "string" },
          { name: "cost", type: "uint256", internalType: "uint256" },
          { name: "owner", type: "address", internalType: "address" }
        ]
      }
    ],
    anonymous: false
  },
  {
    type: "error",
    name: "MenuNotSelected",
    inputs: [
      { name: "billId", type: "uint256", internalType: "uint256" },
      { name: "menuIndex", type: "uint256", internalType: "uint256" }
    ]
  }
] as const;
