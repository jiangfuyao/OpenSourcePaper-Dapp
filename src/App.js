import React, {Component} from 'react'
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

import ipfsAPI from 'ipfs-api'
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocal: 'http'})

const contractAddress = "0xf1f634d8876f49d96a0a083a9cee2ad02647b5a1"
console.log("@ Open source paper")
let simpleStorageInstance

let saveImageOnIpfs = (reader) => {
  return new Promise(function(resolve, reject) {
    const buffer = Buffer.from(reader.result);
    ipfs.add(buffer).then((response) => {
      console.log(response)
      resolve(response[0].hash);
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  })
}


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 0,
      hashDatas: [],
      fileNames: [],
      addrs: [],
      timeStamps: [],
      web3: null
    }
  }

  componentWillMount() {
    // Get network provider and web3 instance. See utils/getWeb3 for more info.

    getWeb3.then(results => {
      this.setState({web3: results.web3})
      this.instantiateContract()
    }).catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const that = this
    const contract = require('truffle-contract')
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.at(contractAddress).then((instance) => {
        simpleStorageInstance = instance
      }).then(result => {
        return simpleStorageInstance.getPaper(0)
      }).then(result => {
        //console.log(result)
        let paperNum = result[0].c[0]
        if (paperNum === 0) {
          return
        }
        if (paperNum === 1) {
          this.setState({
            amount: paperNum,
            hashDatas: that.state.hashDatas.concat([result[1]]),
            fileNames: that.state.fileNames.concat([result[2]]),
            addrs: that.state.addrs.concat([result[3]]),
            timeStamps: that.state.timeStamps.concat([result[4].c[0]])
          })
        }
        if (paperNum > 1) {
          for (let i = 0; i < paperNum; i++) {
            (function(i) {
              simpleStorageInstance.getPaper(i).then(result => {
                that.setState({
                  hashDatas: that.state.hashDatas.concat([result[1]]),
                  fileNames: that.state.fileNames.concat([result[2]]),
                  addrs: that.state.addrs.concat([result[3]]),
                  timeStamps: that.state.timeStamps.concat([result[4].c[0]])
                })
              })
            })(i)
          }
        }
      })
    })
  }

  render() {
    let doms = [],
      hashDatas = this.state.hashDatas
    for (let i = hashDatas.length-1; i >=0 ; i--) {
      doms.push(<div style={{margin:12}}key={i}><a target="_blank" href={"http://ipfs.io/ipfs/" + hashDatas[i]}>{this.state.fileNames[i]}</a>
        <p>Hash: {this.state.hashDatas[i]}</p>
        <p>Author Address: {this.state.addrs[i]}</p>
        <p>TimeStamp: {this.state.timeStamps[i]}</p>
      </div>)
    }

    return (<div className="App">
      <header>OSPA 开源论文</header>
      <div className="upload-container">
	<label id="file">将论文转换为PDF格式,文件名改为论文标题</label>
        <input type="file" ref="file" id="file" name="file" multiple="multiple" onChange={e => this.change(e)}/>
        <button onClick={() => this.upload()}>发布</button>
      </div>
      <div className="paper">
        {doms}
      </div>
    </div>);
  }

  upload() {
    var file = this.refs.file.files[0];
    var fileName = this.refs.file.files[0].name;
    //console.log("文件和文件名"+file,fileName)
    var reader = new FileReader();
    // reader.readAsDataURL(file);
    reader.readAsArrayBuffer(file)
    reader.onloadend = (e) => {
      //console.log("reader:"+reader);
      saveImageOnIpfs(reader).then((hash) => {
        console.log("filehash:" + hash);

        simpleStorageInstance.setPaper(hash, fileName, {from: this.state.web3.eth.accounts[0]}).then(() => {
          console.log("写入区块成功")
	  location.reload()  //刷新
          // this.setState({
          //   hashDatas: this.state.hashDatas.concat([hash]), //即时显示
          // })
        })
      });
    }
  }
  change(e) {
    console.log(e.target.value)
  }
  
}

export default App
