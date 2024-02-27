const hre = require('hardhat');

async function main()
{
    const CampaignFactory = await hre.ethers.getContractFactory('campaign');
    const campaign = await CampaignFactory.deploy();

    await campaign.deployed();
    console.log('Campaign contract is deployed to:', campaign.address);
}

main()
    .then(()=> process.exit(0))
    .catch((error)=>
    {
        console.log(error);
        process.exit(1);
    })