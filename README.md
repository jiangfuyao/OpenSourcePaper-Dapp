# OpenSourcePaper-Dapp
开源论文,存在性证明Dapp  

> 该项目用户可以 开源自己的论文, 同时获得 存在性证明 时间戳, 免于昂贵的版面费.  

## 架构:
IPFS 作为储存  
上传 论文 到IPFS上,返回 Hash, 将hash 储存在 Ethereum 智能合约, 并记录时间戳 和 发布人的 Ethereum地址.  
React 前端 读取 智能合约 hash值, 对应 时间戳 和发布人地址, 列表性显示.  
每个 论文 的标题,作为超链接 指向 IPFS 存储地址. 在浏览器中点击标题, 即可查看论文.   

## 部署

需要 安装 node.js, IPFS, npm, react  

参考 我的 博客 <http://jiangfuyao.com> , 或者 自行 google.  

注意: 合约 需要重新编译,部署.  `npm install` 安装 node_moudls 依赖  
部署过程参考 github 另一个Dapp <https://github.com/jiangfuyao/Dapp-IPFS-Image/blob/master/README.md>  

*****

The MIT License (MIT)
Copyright © 2018 <Fuyao-Jiang>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
