// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract campaign
{
    // Start Campaign function
    // title, campaign description, initial amount, requiredAmount, campaign status
    mapping (uint => campaignDetail) campaignList;
    mapping (string => bool) private isCampaignTaken;
    uint private seqnum;
    enum status {Open, Closed, Complete}

    struct campaignDetail 
    {
        string title;
        string description;
        address caddress;
        uint initialAmount;
        uint currentAmount;
        uint requiredAmount;
        status campaignStatus;
    }

    constructor()
    {
        seqnum =1;
    }

    event campaignCreated (campaignDetail campaign);

    modifier uniqueCampaign(string memory _camp)
    {
        require(!isCampaignTaken[_camp], "Campaign already exists!");
        _;
    }

    function createCampaign(string memory _camp, string memory _description, uint _initialAmount, uint _requiredAmount) external payable uniqueCampaign(_camp)
    {
        campaignList[seqnum] = campaignDetail(
            {
                title: _camp,
                description: _description,
                caddress: msg.sender,
                initialAmount: _initialAmount,
                currentAmount: _initialAmount,
                requiredAmount: _requiredAmount,
                campaignStatus: status.Open
            }
        );
        isCampaignTaken[_camp] = true;
        emit campaignCreated(campaignList[seqnum]);
        seqnum++;
    }

    function checkCampaigns(string memory _camp) public view returns(campaignDetail memory)
    {
        for(uint i=0; i<seqnum; i++)
        {
            if(compareString(campaignList[i].title, _camp))
            {
                return campaignList[i];
            }
        }
        revert("Campaign not found!");
    }

    function compareString(string memory a, string memory b) pure internal returns(bool)
    {
        if(bytes(a).length == bytes(b).length)
        {
        for(uint i=0; i<bytes(a).length; i++)
        {
            if(bytes(a)[i] != bytes(b)[i])
            {
                return false;
            }
        }
        return true;
        }
        return false;
    }
}