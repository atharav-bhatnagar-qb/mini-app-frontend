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
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
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

export type Affiliate = {
    $$type: 'Affiliate';
    affiliate: Address;
}

export function storeAffiliate(src: Affiliate) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4251647816, 32);
        b_0.storeAddress(src.affiliate);
    };
}

export function loadAffiliate(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4251647816) { throw Error('Invalid prefix'); }
    let _affiliate = sc_0.loadAddress();
    return { $$type: 'Affiliate' as const, affiliate: _affiliate };
}

function loadTupleAffiliate(source: TupleReader) {
    let _affiliate = source.readAddress();
    return { $$type: 'Affiliate' as const, affiliate: _affiliate };
}

function storeTupleAffiliate(source: Affiliate) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.affiliate);
    return builder.build();
}

function dictValueParserAffiliate(): DictionaryValue<Affiliate> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAffiliate(src)).endCell());
        },
        parse: (src) => {
            return loadAffiliate(src.loadRef().beginParse());
        }
    }
}

export type Ref = {
    $$type: 'Ref';
    ownerContract: Address;
    generatedBy: Address;
    jobId: string;
    link: string;
}

export function storeRef(src: Ref) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.ownerContract);
        b_0.storeAddress(src.generatedBy);
        b_0.storeStringRefTail(src.jobId);
        b_0.storeStringRefTail(src.link);
    };
}

export function loadRef(slice: Slice) {
    let sc_0 = slice;
    let _ownerContract = sc_0.loadAddress();
    let _generatedBy = sc_0.loadAddress();
    let _jobId = sc_0.loadStringRefTail();
    let _link = sc_0.loadStringRefTail();
    return { $$type: 'Ref' as const, ownerContract: _ownerContract, generatedBy: _generatedBy, jobId: _jobId, link: _link };
}

function loadTupleRef(source: TupleReader) {
    let _ownerContract = source.readAddress();
    let _generatedBy = source.readAddress();
    let _jobId = source.readString();
    let _link = source.readString();
    return { $$type: 'Ref' as const, ownerContract: _ownerContract, generatedBy: _generatedBy, jobId: _jobId, link: _link };
}

function storeTupleRef(source: Ref) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.ownerContract);
    builder.writeAddress(source.generatedBy);
    builder.writeString(source.jobId);
    builder.writeString(source.link);
    return builder.build();
}

function dictValueParserRef(): DictionaryValue<Ref> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRef(src)).endCell());
        },
        parse: (src) => {
            return loadRef(src.loadRef().beginParse());
        }
    }
}

export type WithdrawAmount = {
    $$type: 'WithdrawAmount';
    amount: bigint;
}

export function storeWithdrawAmount(src: WithdrawAmount) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1566890017, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdrawAmount(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1566890017) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'WithdrawAmount' as const, amount: _amount };
}

function loadTupleWithdrawAmount(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawAmount' as const, amount: _amount };
}

function storeTupleWithdrawAmount(source: WithdrawAmount) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawAmount(): DictionaryValue<WithdrawAmount> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdrawAmount(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawAmount(src.loadRef().beginParse());
        }
    }
}

export type GenerateReferral = {
    $$type: 'GenerateReferral';
    jobId: string;
    link: string;
    generatedBy: Address;
}

export function storeGenerateReferral(src: GenerateReferral) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3698258767, 32);
        b_0.storeStringRefTail(src.jobId);
        b_0.storeStringRefTail(src.link);
        b_0.storeAddress(src.generatedBy);
    };
}

export function loadGenerateReferral(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3698258767) { throw Error('Invalid prefix'); }
    let _jobId = sc_0.loadStringRefTail();
    let _link = sc_0.loadStringRefTail();
    let _generatedBy = sc_0.loadAddress();
    return { $$type: 'GenerateReferral' as const, jobId: _jobId, link: _link, generatedBy: _generatedBy };
}

function loadTupleGenerateReferral(source: TupleReader) {
    let _jobId = source.readString();
    let _link = source.readString();
    let _generatedBy = source.readAddress();
    return { $$type: 'GenerateReferral' as const, jobId: _jobId, link: _link, generatedBy: _generatedBy };
}

function storeTupleGenerateReferral(source: GenerateReferral) {
    let builder = new TupleBuilder();
    builder.writeString(source.jobId);
    builder.writeString(source.link);
    builder.writeAddress(source.generatedBy);
    return builder.build();
}

function dictValueParserGenerateReferral(): DictionaryValue<GenerateReferral> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGenerateReferral(src)).endCell());
        },
        parse: (src) => {
            return loadGenerateReferral(src.loadRef().beginParse());
        }
    }
}

export type CandidateRegistered = {
    $$type: 'CandidateRegistered';
    rating: bigint;
    jobId: string;
    link: string;
}

export function storeCandidateRegistered(src: CandidateRegistered) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1019638918, 32);
        b_0.storeUint(src.rating, 8);
        b_0.storeStringRefTail(src.jobId);
        b_0.storeStringRefTail(src.link);
    };
}

export function loadCandidateRegistered(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1019638918) { throw Error('Invalid prefix'); }
    let _rating = sc_0.loadUintBig(8);
    let _jobId = sc_0.loadStringRefTail();
    let _link = sc_0.loadStringRefTail();
    return { $$type: 'CandidateRegistered' as const, rating: _rating, jobId: _jobId, link: _link };
}

function loadTupleCandidateRegistered(source: TupleReader) {
    let _rating = source.readBigNumber();
    let _jobId = source.readString();
    let _link = source.readString();
    return { $$type: 'CandidateRegistered' as const, rating: _rating, jobId: _jobId, link: _link };
}

function storeTupleCandidateRegistered(source: CandidateRegistered) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.rating);
    builder.writeString(source.jobId);
    builder.writeString(source.link);
    return builder.build();
}

function dictValueParserCandidateRegistered(): DictionaryValue<CandidateRegistered> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCandidateRegistered(src)).endCell());
        },
        parse: (src) => {
            return loadCandidateRegistered(src.loadRef().beginParse());
        }
    }
}

 type Pot_init_args = {
    $$type: 'Pot_init_args';
}

function initPot_init_args(src: Pot_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function Pot_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPot_init_args({ $$type: 'Pot_init_args' })(builder);
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
    23888: { message: `Only pot is authorized for this action !` },
    59719: { message: `This action is reserved for the owner !` },
}

const Pot_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Affiliate","header":4251647816,"fields":[{"name":"affiliate","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Ref","header":null,"fields":[{"name":"ownerContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"generatedBy","type":{"kind":"simple","type":"address","optional":false}},{"name":"jobId","type":{"kind":"simple","type":"string","optional":false}},{"name":"link","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"WithdrawAmount","header":1566890017,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"GenerateReferral","header":3698258767,"fields":[{"name":"jobId","type":{"kind":"simple","type":"string","optional":false}},{"name":"link","type":{"kind":"simple","type":"string","optional":false}},{"name":"generatedBy","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"CandidateRegistered","header":1019638918,"fields":[{"name":"rating","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"jobId","type":{"kind":"simple","type":"string","optional":false}},{"name":"link","type":{"kind":"simple","type":"string","optional":false}}]},
]

const Pot_getters: ABIGetter[] = [
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"string","optional":false}},
    {"name":"address","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"linkAddress","arguments":[{"name":"jobId","type":{"kind":"simple","type":"string","optional":false}},{"name":"link","type":{"kind":"simple","type":"string","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const Pot_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdrawAll"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawAmount"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GenerateReferral"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CandidateRegistered"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Pot implements Contract {
    
    static async init() {
        return await Pot_init();
    }
    
    static async fromInit() {
        const init = await Pot_init();
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | 'withdrawAll' | WithdrawAmount | GenerateReferral | CandidateRegistered | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === 'withdrawAll') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawAmount') {
            body = beginCell().store(storeWithdrawAmount(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GenerateReferral') {
            body = beginCell().store(storeGenerateReferral(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CandidateRegistered') {
            body = beginCell().store(storeCandidateRegistered(message)).endCell();
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
        let result = source.readString();
        return result;
    }
    
    async getAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getLinkAddress(provider: ContractProvider, jobId: string, link: string) {
        let builder = new TupleBuilder();
        builder.writeString(jobId);
        builder.writeString(link);
        let source = (await provider.get('linkAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}