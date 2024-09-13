// @ts-nocheck

const _litAction = async () => {
  const owner = "0xAdFE4d15E948DFfE35aa21fFC0897446D13fD280";
  const spender = "0x01eb1984eCc3F046A9518AA4d65D1bAC4137d71D";
  const conditions = [
    {
      contractAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      chain: "sepolia",
      functionName: "allowance",
      functionParams: [owner, spender],
      functionAbi: {
        type: "function",
        name: "allowance",
        inputs: [
          { name: "owner", type: "address", internalType: "address" },
          { name: "spender", type: "address", internalType: "address" },
        ],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
      },
      returnValueTest: {
        key: "",
        comparator: ">=",
        value: "0",
      },
    },
  ];

  let learnerAllowedAmount;
  try {
    learnerAllowedAmount = await Lit.Actions.checkConditions({
      conditions,
      authSig: null,
      chain: "sepolia",
    });
    console.log("checkConditions call success");
  } catch (error) {
    console.log("check allowance failure");
    Lit.Actions.setResponse({ response: JSON.stringify(error) });
  }

  console.log("spender has allowance >= 0: ", learnerAllowedAmount);
  if (learnerAllowedAmount) {
    console.log("has allowance");
  } else {
    console.log(
      " no allowance: owner: 0xAdFE4d15E948DFfE35aa21fFC0897446D13fD280, spender: 0x01eb1984eCc3F046A9518AA4d65D1bAC4137d71D, allowance >= 0 === false, usdcContract: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238, chain: sepolia"
    );
    console.log(
      "Etherscan Logs: https://sepolia.etherscan.io/tx/0xe630e2135b8216af7dea6113eb998f15f4387ce0d37077727d5f7e8a08d6e582#eventlog"
    );
    Lit.Actions.setResponse({
      response: JSON.stringify({ error: "ACC failed: Insufficient allowance" }),
    });
  }
};
export const litAction = `(${_litAction.toString()})()`;
