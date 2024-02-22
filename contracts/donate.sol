// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./campaign.sol";

contract donate is campaign
{
    mapping (uint => donorDetail) donorList;
    uint private seqnum;

    struct donorDetail
    {
        string name;
        address daddress;
        string campaignTitle;
        uint amount;
        uint time;
    }

    constructor()
    {
        seqnum=1;
    }

    event donated(campaignDetail _campaign);
    event campaignSuccessful(campaignDetail _campaign);

    modifier availableCampaign(uint _campaignId)
    {
        require(campaignList[_campaignId].campaignStatus == status.Open, "Campaign is not available!");
        _;
    }

    modifier greaterThanZero(uint _amount)
    {
        require(_amount >0, "Amount should be greater than zero");
        _;
    }

   function amountDonate(string memory _donor, uint _campaignId, uint _amount) external payable availableCampaign(_campaignId) greaterThanZero(_amount)
   {        
        donorList[seqnum] = donorDetail
        ({
            name: _donor,
            daddress: msg.sender,
            campaignTitle: campaignList[_campaignId].title,
            amount: _amount,
            time: block.timestamp
        });
        seqnum++;

        campaignList[_campaignId].currentAmount += _amount;
        emit donated(campaignList[_campaignId]);
        if(campaignList[_campaignId].currentAmount >= campaignList[_campaignId].requiredAmount)
        {
            campaignList[_campaignId].campaignStatus = status.Complete;
            emit campaignSuccessful(campaignList[_campaignId]);
        }
   }

   function finishCampaign(uint _campaignId) external availableCampaign(_campaignId)
   {
        campaignList[_campaignId].campaignStatus = status.Closed;
        emit campaignSuccessful(campaignList[_campaignId]);
   }

} 