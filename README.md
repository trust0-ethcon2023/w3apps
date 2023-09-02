# W3Apps

## Introduction
W3Apps is a public dapp hosting service based on the Web3Q chain. Anyone can upload public dapps without permission, and only the uploader can delete uploaded dapps.

## How does it work
W3Box is a fully decentralized dApp which means the front-end code, back-end (smart contract) code, and users' files are all stored on the chain. The front-end contract is w3box.w3q, the backend contract is SimpleW3box and Users' files are store in file.w3q.
<br/>

### SimpleW3box
SimpleW3apps is used to manage the dapp information uploaded by users. 

#### Storage structure
```
contract SimpleW3apps {
    FlatDirectory public fileFD; // file.w3q contract
    mapping(address => FilesInfo) fileInfos; // User upload file mapping
}
```

#### Upload files
```
function writeChunk(bytes memory fileName, bytes memory fileType, uint256 chunkId, bytes calldata data) public payable {
    bytes32 nameHash = keccak256(fileName);
    FilesInfo storage info = fileInfos[msg.sender];
    if (info.fileIds[nameHash] == 0) {
        // first
        info.files.push(File(block.timestamp, name, fileType));
        info.fileIds[nameHash] = info.files.length;
    }
    // store byte data on-chain, 
    // because the gas fee has a maximum limit, the file is too large and needs to be split into multiple chunks for uploading
    fileFD.writeChunk{value: msg.value}(getNewName(msg.sender, name), chunkId, data);
}
```

#### File Name
In file.w3q, the file is read and written by name. Adding the user address before the file name can avoid duplicate names, and the file name format is address/fileName.
```
function getNewName(address author,bytes memory name) public pure returns (bytes memory) {
    return abi.encodePacked(Strings.toHexString(uint256(uint160(author)), 20),'/',name);
}
```

#### Read file information
The basic information of the file can be read by the user address, and the information includes upload time, name, type, and URL.
```
function getAuthorFiles(address author)
    public view
    returns (
        uint256[] memory times,
        bytes[] memory names,
        bytes[] memory types,
        string[] memory urls
    )
{
    uint256 length = fileInfos[author].files.length;
    times = new uint256[](length);
    names = new bytes[](length);
    types = new bytes[](length);
    urls = new string[](length);

    for (uint256 i; i < length; i++) {
        times[i] = fileInfos[author].files[i].time;
        names[i] = fileInfos[author].files[i].name;
        types[i] = fileInfos[author].files[i].fileType;
        urls[i] = getUrl(getNewName(author, names[i]));
    }
}
```

#### Read file content
The Web3Q gateway can read the files in the contract according to the parameters in the URL, and the server URL details are [here](https://docs.web3q.io/advanced-topics/web3q-gateway).
```
function getUrl(bytes memory name) public view returns (string memory) {
    return string(abi.encodePacked(
        gateway,
        'file.w3q/',
        name
    ));
}
```
E.g.,
    https://galileo.web3q.io/file.w3q/0xb5a0ba79d7f63571b7ba81c9ab30e8f9a72b858f/coin.png
