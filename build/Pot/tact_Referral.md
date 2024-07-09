# TACT Compilation Report
Contract: Referral
BOC Size: 1216 bytes

# Types
Total Types: 11

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## Affiliate
TLB: `affiliate#fd6aff48 affiliate:address = Affiliate`
Signature: `Affiliate{affiliate:address}`

## Ref
TLB: `_ ownerContract:address generatedBy:address jobId:^string link:^string = Ref`
Signature: `Ref{ownerContract:address,generatedBy:address,jobId:^string,link:^string}`

## WithdrawAmount
TLB: `withdraw_amount#5d64d821 amount:coins = WithdrawAmount`
Signature: `WithdrawAmount{amount:coins}`

## GenerateReferral
TLB: `generate_referral#dc6ef34f jobId:^string link:^string generatedBy:address = GenerateReferral`
Signature: `GenerateReferral{jobId:^string,link:^string,generatedBy:address}`

## CandidateRegistered
TLB: `candidate_registered#3cc67486 rating:uint8 jobId:^string link:^string = CandidateRegistered`
Signature: `CandidateRegistered{rating:uint8,jobId:^string,link:^string}`

# Get Methods
Total Get Methods: 2

## details

## balance

# Error Codes
2: Stack underflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
23888: Only pot is authorized for this action !
59719: This action is reserved for the owner !