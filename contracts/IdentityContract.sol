// // SPDX-License-Identifier: MIT
 pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC725/IERC725Y.sol";

// contract IdentityContract
// {
//     struct identityDetail
//     {
//         mapping(bytes32 => bytes) idClaims;
//     }

//     mapping(address => identityDetail) identities;

//     event AddIdClaim(address indexed _identity, bytes32 indexed _key, bytes _value);

//     modifier validAddress (address _identity)
//     {
//         require(_identity != address(0), "Invalid address");
//         _;
//     }

//     modifier validKey (bytes32 _key)
//     {
//         require(_key != bytes32(0), "Invalid Key");
//         _;
//     }

//     function addClaim (address _identity, bytes32 _key, bytes memory _value) external validAddress(_identity) validKey(_key)
//     {
//         identityDetail storage identity = identities[_identity];
//         identity.idClaims[_key] = _value;

//         emit AddIdClaim(_identity, _key, _value);
//     }

//     function getClaim (address _identity, bytes32 _key) external view returns(bytes memory)
//     {
//         identityDetail storage identity = identities[_identity];
//         return identity.idClaims[_key];
//     }
// }