import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ReturnFee = {
    $$type: 'ReturnFee';
    wallet: Address;
    amount: bigint;
}

export function storeReturnFee(src: ReturnFee) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3995285514, 32);
        b_0.storeAddress(src.wallet);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadReturnFee(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3995285514) { throw Error('Invalid prefix'); }
    let _wallet = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'ReturnFee' as const, wallet: _wallet, amount: _amount };
}

function loadTupleReturnFee(source: TupleReader) {
    let _wallet = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'ReturnFee' as const, wallet: _wallet, amount: _amount };
}

function loadGetterTupleReturnFee(source: TupleReader) {
    let _wallet = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'ReturnFee' as const, wallet: _wallet, amount: _amount };
}

function storeTupleReturnFee(source: ReturnFee) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.wallet);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserReturnFee(): DictionaryValue<ReturnFee> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReturnFee(src)).endCell());
        },
        parse: (src) => {
            return loadReturnFee(src.loadRef().beginParse());
        }
    }
}

export type DistributeReward = {
    $$type: 'DistributeReward';
    wallets: Dictionary<bigint, Address>;
    userCount: bigint;
    rewardsStars: Dictionary<bigint, bigint>;
}

export function storeDistributeReward(src: DistributeReward) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(461056004, 32);
        b_0.storeDict(src.wallets, Dictionary.Keys.BigInt(257), Dictionary.Values.Address());
        b_0.storeInt(src.userCount, 257);
        b_0.storeDict(src.rewardsStars, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257));
    };
}

export function loadDistributeReward(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 461056004) { throw Error('Invalid prefix'); }
    let _wallets = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), sc_0);
    let _userCount = sc_0.loadIntBig(257);
    let _rewardsStars = Dictionary.load(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'DistributeReward' as const, wallets: _wallets, userCount: _userCount, rewardsStars: _rewardsStars };
}

function loadTupleDistributeReward(source: TupleReader) {
    let _wallets = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _userCount = source.readBigNumber();
    let _rewardsStars = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'DistributeReward' as const, wallets: _wallets, userCount: _userCount, rewardsStars: _rewardsStars };
}

function loadGetterTupleDistributeReward(source: TupleReader) {
    let _wallets = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
    let _userCount = source.readBigNumber();
    let _rewardsStars = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'DistributeReward' as const, wallets: _wallets, userCount: _userCount, rewardsStars: _rewardsStars };
}

function storeTupleDistributeReward(source: DistributeReward) {
    let builder = new TupleBuilder();
    builder.writeCell(source.wallets.size > 0 ? beginCell().storeDictDirect(source.wallets, Dictionary.Keys.BigInt(257), Dictionary.Values.Address()).endCell() : null);
    builder.writeNumber(source.userCount);
    builder.writeCell(source.rewardsStars.size > 0 ? beginCell().storeDictDirect(source.rewardsStars, Dictionary.Keys.BigInt(257), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserDistributeReward(): DictionaryValue<DistributeReward> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDistributeReward(src)).endCell());
        },
        parse: (src) => {
            return loadDistributeReward(src.loadRef().beginParse());
        }
    }
}

export type RequestAll = {
    $$type: 'RequestAll';
    preserve: bigint;
}

export function storeRequestAll(src: RequestAll) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3556090125, 32);
        b_0.storeInt(src.preserve, 257);
    };
}

export function loadRequestAll(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3556090125) { throw Error('Invalid prefix'); }
    let _preserve = sc_0.loadIntBig(257);
    return { $$type: 'RequestAll' as const, preserve: _preserve };
}

function loadTupleRequestAll(source: TupleReader) {
    let _preserve = source.readBigNumber();
    return { $$type: 'RequestAll' as const, preserve: _preserve };
}

function loadGetterTupleRequestAll(source: TupleReader) {
    let _preserve = source.readBigNumber();
    return { $$type: 'RequestAll' as const, preserve: _preserve };
}

function storeTupleRequestAll(source: RequestAll) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.preserve);
    return builder.build();
}

function dictValueParserRequestAll(): DictionaryValue<RequestAll> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequestAll(src)).endCell());
        },
        parse: (src) => {
            return loadRequestAll(src.loadRef().beginParse());
        }
    }
}

export type Pot$Data = {
    $$type: 'Pot$Data';
    id: bigint;
}

export function storePot$Data(src: Pot$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
    };
}

export function loadPot$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadIntBig(257);
    return { $$type: 'Pot$Data' as const, id: _id };
}

function loadTuplePot$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'Pot$Data' as const, id: _id };
}

function loadGetterTuplePot$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'Pot$Data' as const, id: _id };
}

function storeTuplePot$Data(source: Pot$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    return builder.build();
}

function dictValueParserPot$Data(): DictionaryValue<Pot$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePot$Data(src)).endCell());
        },
        parse: (src) => {
            return loadPot$Data(src.loadRef().beginParse());
        }
    }
}

 type Pot_init_args = {
    $$type: 'Pot_init_args';
    id: bigint;
}

function initPot_init_args(src: Pot_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
    };
}

async function Pot_init(id: bigint) {
    const __code = Cell.fromBase64('te6ccgECEQEABEgAART/APSkE/S88sgLAQIBYgIDAp7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABAYEBAc8Aye1UDwQCAVgNDgLyAZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwklt/4CCCEO4jOAq6js4w0x8BghDuIzgKuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wBZbBL4J28QghAdzWUAobYIgEJ/VSBtbW3bPH/gIAsFA/yCEBt7KAS6j3Mw0x8BghAbeygEuvLggfQEgQEB1wD0BFUgbBOPUyPtRO1F7UeOuDHbPIuWR1bXAoZXJyKYjQeRmlsZSBjb250cmFjdHMvcG90LnRhY3Q6NjM6MTM6g/hQw/hQw/hQw7WftZe1kcX/tEYrtQe3xAfL/2wR/4CAKBgcC8nCTUwK5j28jgQEBIln0DG+hkjBt3yBu8tCAgQEBVFMAUkBBM/QMb6GUAdcAMJJbbeIgbvLQgHJ/VSBtbW3bPKQg2zyLdkdW1wKGkpiNB5GaWxlIGNvbnRyYWN0cy9wb3QudGFjdDo2MDoxNzqD+FDD+FDD+FDDoXwQLCgKkghDT9aENuo6VMNMfAYIQ0/WhDbry4IGBAQHXAAEx4IIQlGqYtrqOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcAgJAuiPbyHtRO1F7UeOuDHbPIuWR1bXAoZXJyKYjQeRmlsZSBjb250cmFjdHMvcG90LnRhY3Q6Nzk6MTM6g/hQw/hQw/hQw7WftZe1kcX/tEY6bAfgnbxCCEB3NZQChWKH4QgGAQn9VIG1tbds87UHt8QHy/9sCfwoLATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAsA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAMAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAg+5bA2zzbPDGA8QABG4K+7UTQ0gABgATO1E0NQB+GPSAAGXgQEB1wABMeD4KNcLCoMJuvLgiYEBAdcAAQHRABb4J28QghAdzWUAoQ==');
    const __system = Cell.fromBase64('te6cckECEwEABFIAAQHAAQEFoPeTAgEU/wD0pBP0vPLICwMCAWIEDgKe0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8Wds88uCCyPhDAcx/AcoAAQGBAQHPAMntVBAFAvIBkjB/4HAh10nCH5UwINcLH94gwAAi10nBIbCSW3/gIIIQ7iM4CrqOzjDTHwGCEO4jOAq68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFlsEvgnbxCCEB3NZQChtgiAQn9VIG1tbds8f+AgDAYD/IIQG3soBLqPczDTHwGCEBt7KAS68uCB9ASBAQHXAPQEVSBsE49TI+1E7UXtR464Mds8i5ZHVtcChlcnIpiNB5GaWxlIGNvbnRyYWN0cy9wb3QudGFjdDo2MzoxMzqD+FDD+FDD+FDDtZ+1l7WRxf+0Riu1B7fEB8v/bBH/gIAoHCALycJNTArmPbyOBAQEiWfQMb6GSMG3fIG7y0ICBAQFUUwBSQEEz9AxvoZQB1wAwkltt4iBu8tCAcn9VIG1tbds8pCDbPIt2R1bXAoaSmI0HkZpbGUgY29udHJhY3RzL3BvdC50YWN0OjYwOjE3OoP4UMP4UMP4UMOhfBAwKAqSCENP1oQ26jpUw0x8BghDT9aENuvLggYEBAdcAATHgghCUapi2uo6n0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/4DBwCQsC6I9vIe1E7UXtR464Mds8i5ZHVtcChlcnIpiNB5GaWxlIGNvbnRyYWN0cy9wb3QudGFjdDo3OToxMzqD+FDD+FDD+FDDtZ+1l7WRxf+0RjpsB+CdvEIIQHc1lAKFYofhCAYBCf1UgbW1t2zztQe3xAfL/2wJ/CgwA3sghwQCYgC0BywcBowHeIYI4Mnyyc0EZ07epqh25jiBwIHGOFAR6qQymMCWoEqAEqgcCpCHAAEUw5jAzqgLPAY4rbwBwjhEjeqkIEm+MAaQDeqkEIMAAFOYzIqUDnFMCb4GmMFjLBwKlWeQwMeLJ0AE6bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwMAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AA0AmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCAVgPEgIPuWwNs82zwxgQEQBM7UTQ1AH4Y9IAAZeBAQHXAAEx4Pgo1wsKgwm68uCJgQEB1wABAdEAFvgnbxCCEB3NZQChABG4K+7UTQ0gABggrcZn');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPot_init_args({ $$type: 'Pot_init_args', id })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Pot_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
}

const Pot_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ReturnFee","header":3995285514,"fields":[{"name":"wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"DistributeReward","header":461056004,"fields":[{"name":"wallets","type":{"kind":"dict","key":"int","value":"address"}},{"name":"userCount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"rewardsStars","type":{"kind":"dict","key":"int","value":"int"}}]},
    {"name":"RequestAll","header":3556090125,"fields":[{"name":"preserve","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Pot$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
]

const Pot_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const Pot_getterMapping: { [key: string]: string } = {
    'balance': 'getBalance',
}

const Pot_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ReturnFee"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DistributeReward"}},
    {"receiver":"internal","message":{"kind":"typed","type":"RequestAll"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Pot implements Contract {
    
    static async init(id: bigint) {
        return await Pot_init(id);
    }
    
    static async fromInit(id: bigint) {
        const init = await Pot_init(id);
        const address = contractAddress(0, init);
        return new Pot(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Pot(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Pot_types,
        getters: Pot_getters,
        receivers: Pot_receivers,
        errors: Pot_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | ReturnFee | DistributeReward | RequestAll | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ReturnFee') {
            body = beginCell().store(storeReturnFee(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DistributeReward') {
            body = beginCell().store(storeDistributeReward(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'RequestAll') {
            body = beginCell().store(storeRequestAll(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}