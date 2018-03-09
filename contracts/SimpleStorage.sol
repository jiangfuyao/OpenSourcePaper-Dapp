pragma solidity ^0.4.19;

contract SimpleStorage {
    struct Paper {
      string hashData; // 存储图片hash值
      string fileName;  //文件名
      address addr; // 上传者 地址
      uint timeStamp;  //文件时间戳
    } 
    uint id;
    mapping (uint => Paper) Papers;  //文件字典;

    function setPaper(string hashData, string fileName) public {
        Papers[id].hashData = hashData;
        Papers[id].fileName = fileName;
        Papers[id].addr = msg.sender;
        Papers[id].timeStamp = now;
        id++;
    }

    function getPaper(uint i) public view returns (uint,string, string,address,uint){
        return (id, Papers[i].hashData, Papers[i].fileName, Papers[i].addr, Papers[i].timeStamp);
    }
    

}
