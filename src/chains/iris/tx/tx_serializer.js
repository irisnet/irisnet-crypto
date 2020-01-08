const root = require('./tx');
const amino = require('../../base');
const config = require('../../../../config');
const codec = require('../../../util/codec');

/**
 *
 *  用于编码/解码 cosmos-sdk识别的StdTx交易模型
 *  当需要支持新的交易类型(msg)时,按照以下步骤执行：
 *
 *      1：在../proto/tx.proto中定义msg的数据结构(protobuf3)
 *      2: 使用pbjs -t static-module -w commonjs -o tx.js tx.proto生产信息tx编解码文件，注意和原文件比较(需要手动合并)
 *      3: 使用amino 注册新的msg信息
 *      4：TxSerializer类的编解码方法不用修改
 *
 *
 */
class TxSerializer {

    /**
     * 对StdTx编码(勿动)
     *
     * @param object: StdTx
     * @returns {{data: Buffer, hash: string}}
     */
    static encode(object) {
        let txMsg = object.msgs[0];
        let msg = txMsg.GetMsg();
        let info = amino.GetRegisterInfo(txMsg.type);
        let msgClass = info.classType;

        let sendMsg = msgClass.create(msg);
        let msgBytes = msgClass.encode(sendMsg).finish();

        let fee = object.fee;
        let StdFee = root.irisnet.tx.StdFee;
        let feeMsg = StdFee.create(fee);


        let StdSignature = root.irisnet.tx.StdSignature;
        let signature;
        if (object.signatures) {
            signature = [StdSignature.create({
                pubKey: object.signatures[0].pub_key,
                signature: object.signatures[0].signature,
                accountNumber: object.signatures[0].account_number,
                sequence: object.signatures[0].sequence
            })];
        }

        let memo = object.memo;

        let StdTx = root.irisnet.tx.StdTx;
        let tx = StdTx.create({msgs: [msgBytes], fee: feeMsg, signatures: signature, memo: memo});
        let txMsgBuf = StdTx.encode(tx).finish();

        //stdTx amion编码前缀[auth/StdTx]
        let txPreBuf = Buffer.from(amino.GetRegisterInfo(config.iris.tx.stdTx.prefix).prefix);
        let msgPreBuf = Buffer.from(info.prefix);

        let buf = Buffer.from("");

        //填充stdTx amion编码前缀
        buf = Buffer.concat([buf, txPreBuf]);

        //填充txMsgBuf第一位编码字节(数组标识)
        buf = Buffer.concat([buf, txMsgBuf.slice(0, 1)]);

        let t = codec.Uvarint.decode(txMsgBuf.slice(1));

        let uvintMsgBuf = codec.Uvarint.encode(msgPreBuf.length + t.u);
        buf = Buffer.concat([buf, uvintMsgBuf]);

        //填充msg amion编码前缀
        buf = Buffer.concat([buf, msgPreBuf]);

        //填充交易内容字节
        buf = Buffer.concat([buf, txMsgBuf.slice(t.n + 1)]);

        let uvarintBuf = Buffer.from(codec.Uvarint.encode(buf.length));
        let bz = Buffer.concat([uvarintBuf, buf]);

        const crypto = require('crypto');
        const hash = crypto.createHash('sha256');
        hash.update(bz);
        let hashTx = hash.digest('hex').substring(0, 64);

        return {
            data: bz,
            hash: hashTx.toUpperCase()
        }
    }
}
module.exports = TxSerializer;
