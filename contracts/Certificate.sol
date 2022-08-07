// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import { Base64 } from "./libraries/Base64.sol";

contract DigitalCertificate is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  constructor() ERC721 ("Certificate", "STF") {
    console.log("This is the Certificate contract.");
  }

  function createCertificate(
    address to,
    string memory name,
    string memory number,
    string memory date,
    string memory organization
  ) public onlyOwner {
    uint256 newItemId = _tokenIds.current();
    string memory json = Base64.encode(
      bytes(
        string(
          abi.encodePacked(
            '{"name": "Sertifikat", "description": "Sertifikat Digital Teaching Factory Network", "image": "https://i0.wp.com/lh6.googleusercontent.com/proxy/MGZ5pNpJU7acOT6D5QvQ_JgJMWORdOPDohAdwmbU6SZmpy9QBf__cphMycJByEgYBzplWLeYmFZAK9jEEPg-Zj_aU7RN_I6pFviAdw8v1lOtKHJNLEa9fUO7LwEx_kyed0_WlhnxInOrgcykCzbjjeVHqw7QhpwuockEs7Uqd_nMaNZSH637Hpg6XkNNi40LNA=w1200-h630-p-k-no-nu?resize=650,400", "attributes": [ { "trait_type": "Nama", "value": "',
            name,
            '" }, { "trait_type": "Nomor", "value": "',
            number,
            '" }, { "trait_type": "Tanggal", "value": "',
            date,
            '" }, { "trait_type": "Organisasi", "value": "',
            Organization,
            '" } ]}'
          )
        )
      )
    );
    string memory finalTokenUri = string(
      abi.encodePacked("data:application/json;base64,", json)
    );
    
    console.log("\n--------------------");
    console.log(finalTokenUri);
    console.log("--------------------\n");

    _safeMint(to, newItemId);
    _setTokenURI(newItemId, finalTokenUri);
    _tokenIds.increment();

    console.log("A Certificate w/ ID %s has been minted to %s", newItemId, to);
  }
}