// const root = require('./tx');
// const amino = require('../amino');
//
// amino.RegisterConcrete(root.irisnet.tx.MsgDelegate,"cosmos-sdk/MsgDelegate");
// amino.RegisterConcrete(root.irisnet.tx.MsgSend,"cosmos-sdk/Send");
// amino.RegisterConcrete(root.irisnet.tx.StdTx,"auth/StdTx");
//
// class TxSerializer {
//     static encode(object) {
//         let txMsg = object.msgs[0];
//         let msg = txMsg.GetMsg();
//         let info = amino.GetRegisterInfo(txMsg.Type());
//
//         let sendMsg = info.type.create(msg);
//         let msgBytes = info.type.encode(sendMsg).finish();
//
//         let fee = object.fee;
//         let StdFee = root.irisnet.tx.StdFee;
//         let feeMsg = StdFee.create(fee);
//
//
//         let StdSignature = root.irisnet.tx.StdSignature;
//         let signature = StdSignature.create({
//             pubKey: object.signatures[0].pub_key,
//             signature: object.signatures[0].signature,
//             accountNumber: object.signatures[0].accountNumber,
//             sequence: object.signatures[0].sequence
//         });
//
//         let memo = object.memo;
//
//         let StdTx = root.irisnet.tx.StdTx;
//         let tx = StdTx.create({msgs: [msgBytes], fee: feeMsg, signatures: [signature], memo: memo});
//         let txMsgBuf = StdTx.encode(tx).finish();
//
//         //stdTx amion编码前缀[auth/StdTx]
//         let txPreBuf = Buffer.from(amino.GetRegisterInfo("auth/StdTx").prefix);
//         //msg amion编码前缀[cosmos-sdk/Send]
//         let msgPreBuf = Buffer.from(info.prefix);
//
//         let buf = Buffer.alloc(txPreBuf.length + msgPreBuf.length + txMsgBuf.length, 0);
//         let offset = 0;
//
//         //填充stdTx amion编码前缀
//         buf.fill(txPreBuf, offset);
//         offset += txPreBuf.length;
//
//         //填充txMsgBuf第一位编码字节(数组标识)
//         buf.fill(txMsgBuf[0], offset);
//         offset += 1;
//
//         //填充txMsgBuf加入前缀后的编码长度
//         buf.fill(msgPreBuf.length + txMsgBuf[1], offset);
//         offset += 1;
//
//         //填充msg amion编码前缀
//         buf.fill(msgPreBuf, offset);
//         offset += msgPreBuf.length;
//
//         //填充交易内容字节
//         buf.fill(txMsgBuf.slice(2), offset);
//
//         let uvarintBuf = Buffer.from(EncodeUvarint(buf.length));
//         let bz = Buffer.concat([uvarintBuf, buf]);
//
//         const crypto = require('crypto');
//         const hash = crypto.createHash('sha256');
//         hash.update(bz);
//         let hashTx = hash.digest('hex').substring(0, 40);
//
//         return {
//             data: bz,
//             hash: hashTx.toUpperCase()
//         }
//     }
//
//     decode(){
//         throw new Error("not implement");
//     }
// }
// function EncodeUvarint(u) {
//     let buf = Buffer.alloc(10);
//     let i = 0;
//     const BN = require("bn");
//     while (u >= 0x80) {
//         buf[i] = new BN(u).or(new BN(0x80));
//         u >>= 7;
//         i++;
//     }
//     buf[i] = new BN(u);
//     return buf.slice(0, 2);
// }
//
// module.exports = TxSerializer;