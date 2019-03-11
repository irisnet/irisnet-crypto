const Irisnet = require('../../index');

describe('cosmos traction test', function () {
    let chain_id = "gaia-13001";
    let from = "cosmos1j3nlv8wcfst2mezkny4w2up76wfgnkq744ezus";
    let gas = 200000;
    let account_number = 920;
    let fees = {denom: "photino", amount: "20"};
    let memo = "";
    let privateKey = "0A36EC1ADC5653EC602DC702FD32576ADDC114534ED23ECB621FA0929BFC7CDE";
    let pubKey = "cosmospub1addwnpepq25tsfnsvd37fhsw2jv70rnq0ecsth64syqrlm5dqjsfm5jw5shfvwjzjqh";
    let chain = Irisnet.config.chain.cosmos;

    it('test  transfer', function () {
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: 7,
            fees: fees,
            gas: gas,
            memo: memo,
            type: Irisnet.config.cosmos.tx.transfer.type,
            return_type: 'block',
            msg: {
                to: "cosmos1cx7ny2znzdegzj27mq2lqavk8dcvc0uysmyzg7",
                coins: [
                    {
                        denom: "muon",
                        amount: "10"
                    }
                ]
            }
        };

        execute(tx);
    });

    it('test delegate', function () {
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: 2,
            fees: fees,
            gas: gas,
            memo: memo,
            type: Irisnet.config.cosmos.tx.delegate.type,
            msg: {
                validator_addr: "cosmosvaloper1qksw0e05eh652yy0zqd7f0e3q4082dxy9qxdx6",
                delegation: {
                    denom: "muon",
                    amount: "10"
                }
            }
        };

        execute(tx);
    });

    it('test undelegate', function () {
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: 3,
            fees: fees,
            gas: gas,
            memo: memo,
            type: Irisnet.config.cosmos.tx.undelegate.type,
            msg: {
                validator_addr: "cosmosvaloper1qksw0e05eh652yy0zqd7f0e3q4082dxy9qxdx6",
                shares_amount: "1.05"
            }
        };

        execute(tx);
    });

    it('test beginRedelegate', function () {
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: 6,
            fees: fees,
            gas: gas,
            memo: memo,
            type: Irisnet.config.cosmos.tx.beginRedelegate.type,
            msg: {
                validator_src_addr: "cosmosvaloper1qksw0e05eh652yy0zqd7f0e3q4082dxy9qxdx6",
                validator_dst_addr: "cosmosvaloper1le34teftd4fa5lu64uyafzmw78yq7dgcnxchp3",
                shares_amount: "1.05"
            }
        };

        execute(tx);
    });

    it('test MsgSetWithdrawAddress', function () {
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: 4,
            fees: fees,
            gas: gas,
            memo: memo,
            type: Irisnet.config.cosmos.tx.setWithdrawAddress.type,
            msg: {
                withdraw_addr: "cosmos1j3nlv8wcfst2mezkny4w2up76wfgnkq744ezus",
            }
        };

        execute(tx);
    });
    it('test MsgWithdrawDelegatorReward', function () {
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: 5,
            fees: fees,
            gas: gas,
            memo: memo,
            type: Irisnet.config.cosmos.tx.withdrawDelegatorReward.type,
            msg: {
                validator_addr: "cosmosvaloper1qksw0e05eh652yy0zqd7f0e3q4082dxy9qxdx6",
            }
        };

        execute(tx);
    });

    //TODO Pending verification
    it('test MsgWithdrawValidatorCommission', function () {
        let tx = {
            chain_id: chain_id,
            from: from,
            account_number: account_number,
            sequence: 6,
            fees: fees,
            gas: gas,
            memo: memo,
            type: Irisnet.config.cosmos.tx.withdrawValidatorCommission.type,
            msg: {
                validator_addr: "cosmosvaloper1qksw0e05eh652yy0zqd7f0e3q4082dxy9qxdx6",
            }
        };

        execute(tx);
    });

    function execute(tx) {
        let builder = Irisnet.getBuilder(chain);
        let stdTx = builder.buildAndSignTx(tx, privateKey);
        //you can post tx to lcd's /txs api
        console.log(JSON.stringify(stdTx.GetData()));
        let result = stdTx.Hash();
        console.log(result.hash);
    }
});