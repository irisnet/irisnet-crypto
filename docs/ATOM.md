# ATOM

Irisnet-crypto has completed the docking cosmos main network(chain-id:cosmoshub-2),supports signing for the following transactions

- Transfer
- Delegate
- Undelegate
- Redelegate
- SetWithdrawAddress
- WithdrawDelegationReward
- WithdrawValidatorCommission

Construct a valid transaction that requires user to construct the following transaction request:

```json
{
  "chain_id": "",
  "from": "",
  "account_number": 0,
  "sequence": 0,
  "fees": {"denom": "uatom", "amount": 100},
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
- fees : transaction fee
- gas : gas limit
- memo : transaction description(Up to 100 characters)
- type : transaction type,enumeration values are as follows
    - transfer
    - delegate
    - undelegate
    - begin_redelegate
    - set_withdraw_address
    - withdraw_delegation_reward
    - withdraw_validator_commission
- msg : the specific transaction content, different type of transaction has different structure. For details, please refer to the following example.

    - Transfer
        ```json
        {
          "to": "cosmos1njqswmydmrursv6qg4nl5za7q6lkdsqdvat5wq",
          "coins": [
            {
                "denom": "uatom",
                "amount": 1000
            }
          ]
        }
        ```
    
    - delegate
        ```json
        {
          "validator_addr": "cosmosvaloper1r33tlrh7cawtzxmct7zatau6vdydp0rg3ywegm",
           "amount":{
               "denom": "stake",
               "amount": "10"
           }
        }
        ```
    
    - undelegate
        ```json
        {
           "validator_addr": "cosmosvaloper1r33tlrh7cawtzxmct7zatau6vdydp0rg3ywegm",
           "amount":{
               "denom": "stake",
               "amount": "10"
           }
        }
        ```
    
    - begin_redelegate
        ```json
        {
            "validator_src_addr": "cosmosvaloper1r33tlrh7cawtzxmct7zatau6vdydp0rg3ywegm",
            "validator_dst_addr": "cosmosvaloper12qf750gjjlxpslxefnnql3egu350c6qn5rmswu",
            "amount": {
                "denom": "stake",
                "amount": "2"
            }
        }
        ```
    
    - set_withdraw_address
        ```json
        {
            "withdraw_addr": "cosmos192xdyxer5hvtrrredragyup2gejv73ztzpa7j3"
        }
        ```
        
    - withdraw_delegation_reward
        ```json
        {
            "validator_addr": "cosmosvaloper1r33tlrh7cawtzxmct7zatau6vdydp0rg3ywegm"
        }
        ```
    - withdraw_validator_commission(don't need)
    
    
When you have constructed the request parameters, you can call crypto's signature method.

1. Import the crypto library
    ```js
    import Irisnet from 'irisnet-crypto'
    ```
2. Get transaction builder
    ```js
    let builder = Irisnet.getBuilder('cosmos');
    ```
    *getBuilder* has one parameter,used to specify which blockchain transaction to construct,we choose 'cosmos'

3. Construct and sign a transaction
    ```js
    let stdTx = builder.buildAndSignTx(request,privateKey);
    ```
    *buildAndSignTx* has two parameters:
      - request : first mentioned above
      - privateKey : your private key

4. Get the signed transaction content
    ```js
    let postTx = stdTx.GetData();
    ```
    *GetData* will return the signed transaction (json format), you can submit it to the '/txs' api of LCD in post mode.

5. When request the server times out, you may not get any response. You can call the *Hash* method to get the transaction hash, and go to the server to check the transaction result.
    ```js
    let hash = stdTx.Hash();
    ```
Quick start please refer to [test case](../test/test_tx_cosmos.js)