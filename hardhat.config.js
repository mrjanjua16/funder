/** @type import('hardhat/config').HardhatUserConfig */

require('@nomiclabs/hardhat-waffle');
require('dotenv').config({path: './.env.local'});

task("accounts", "Print the list of accounts:", async(taskArgs, hre) =>
{
  const accounts = await hre.ethers.getSigners();

  for(const account of accounts)
  {
    console.log(account.address);
  }
});

  const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.19",
  defaultNetwork: 'optimism',
  networks: {
    hardhat: {},
      // No need to specify anything here for local development
    optimism: {
      url : process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [privateKey]
    }
  }
};

