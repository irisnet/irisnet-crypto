'use strict';

const Builder = require("../../builder");
const Utils = require('../../util/utils');
const Amino = require('./amino');
const Bank = require('./bank');

class SubmitProposalMsg extends Builder.Msg{
    constructor(title, description, proposalKind,proposer,deposit) {
        super();
        this.Title = title;
        this.Description = description;
        this.ProposalKind = proposalKind;
        this.Proposer = proposer;
        this.InitialDeposit = deposit;
    }

    GetSignBytes() {
        let msg = {
            "Title": this.Title,
            "Description": this.Description,
            "ProposalKind": this.ProposalKind,
            "Proposer": this.Proposer,
            "InitialDeposit": this.InitialDeposit
        };
        let sortMsg = Utils.sortObjectKeys(msg);
        return Amino.MarshalJSON(this.Type(),sortMsg)
    }
    ValidateBasic() {
        if (Utils.isEmpty(this.Title)){
            throw new Error("Title is empty");
        }

        if (Utils.isEmpty(this.Description)){
            throw new Error("Description is empty");
        }

        if (Utils.isEmpty(this.ProposalKind)){
            throw new Error("delegation must great than 0");
        }

        if (Utils.isEmpty(this.Proposer)){
            throw new Error("Proposer must great than 0");
        }

        if (Utils.isEmpty(this.InitialDeposit)){
            throw new Error("InitialDeposit must great than 0");
        }
    }

    Type(){
        return "cosmos-sdk/MsgSubmitProposal";
    }
}

module.exports = class Gov {

    // TODO
    static GetSubmitProposalMsg(acc, validatorAddr, coins, fee, gas, memo){
        let stdFee = Bank.NewStdFee(fee, gas);
        let msg = new SubmitProposalMsg(acc.address, validatorAddr, coins);
        let signMsg = Bank.NewStdSignMsg(acc.chain_id, acc.account_number, acc.sequence, stdFee, msg,memo);
        return signMsg;
    }
};