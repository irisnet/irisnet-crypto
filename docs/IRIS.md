# IRIS

Irisnet-crypto has completed the docking irisnet main network(chain-id:irishub)， supports signing for the following transactions

- Transfer
- Delegate
- Undelegate
- Redelegate
- WithdrawDelegationRewardsAll
- WithdrawDelegationReward

Construct a valid transaction that requires user to construct the following transaction request:

```json
{
  "chain_id": "",
  "from": "",
  "account_number": 0,
  "sequence": 0,
  "fees": {"denom": "iris-atto", "amount": 600000000000000000},
  "gas": 10000,
  "memo": "",
  "type": "",
  "msg": msg
}
```
The parameters are as follows:
- chain_id : blockchain's chain_id
- from : Signer's address of the transaction
- account_number : you can get it from lcd api "/auth/accounts/"
- sequence : you can get it from lcd api "/auth/accounts/"
- fees : transaction fee(600000000000000000iris-atto)
- gas : gas limit(20000)
- memo : transaction description(up to 100 characters)
- type : transaction type,enumeration values are as follows
    - transfer
    - delegate
    - begin_unbonding
    - redelegate
    - withdraw_delegation_rewards_all
    - withdraw_delegation_reward
- msg : the specific transaction content, different type of transaction has different structure. For details, please refer to the following example.

    - Transfer
        ```json
        {
          "to": "faa1s6v9qgu8ye7d884s8kpye64x66znndg8t6eztj",
          "coins": [
            {
                "denom": "iris-atto",
                "amount": 10000000000000000000
            }
          ]
        }
        ```
    
    - delegate
        ```json
        {
          "to": "faa1s6v9qgu8ye7d884s8kpye64x66znndg8t6eztj",
          "coins": [
            {
                "denom": "iris-atto",
                "amount": 10000000000000000000
            }
          ]
        }
        ```
    
    - begin_unbonding
        ```json
        {
            "validator_addr": "fva1aake3umjllpd9es5d3qmry4egcne0f8ajd7vdp",
            "shares_amount": "1000000000000000000000000"
        }
        ```
    
    - redelegate
        ```json
        {
            "validator_src_addr": "fva1kca5vw7r2k72d5zy0demszmrhdz4dp8t4uat0c",
            "validator_dst_addr": "fva1rz7jxmgsgyjwa6erusxlzrmg2aw3cvyf3c3x6v",
            "shares_amount": "1000000000000000000000000"
        }
        ```
    
    - withdraw_delegation_rewards_all(don't need)
    - withdraw_delegation_reward
        ```json
        {
            "validator_addr": "fva1kca5vw7r2k72d5zy0demszmrhdz4dp8t4uat0c"
        }
        ```
When you have constructed the request parameters, you can call crypto's signing method.

1. Import the crypto library
    ```js
    import Irisnet from 'irisnet-crypto'
    ```
2. Get transaction builder
    ```js
    let builder = Irisnet.getBuilder('iris');
    ```
    *getBuilder* has one parameter,used to specify which blockchain transaction to construct,we choose 'iris'

3. Construct and sign a transaction
    ```js
    let stdTx = builder.buildAndSignTx(request,privateKey);
    ```
    *buildAndSignTx* has two parameters:
      - request : first mentioned above
      - privateKey : your private key(hex)

4. Get the signed transaction content
    ```js
    let postTx = stdTx.GetData();
    ```
    *GetData* will return the signed transaction (json format), you can submit it to the '/tx/broadcast' api of LCD in post mode.

5. When request the server times out, you may not get any response. You can call the *Hash* method to get the transaction hash, and go to the server to check the transaction result.
    ```js
    let hash = stdTx.Hash();
    ```
Quick start please refer to [test case](../test/test_tx_iris.js)