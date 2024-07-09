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

 type Referral_init_args = {
    $$type: 'Referral_init_args';
    jobId: string;
    link: string;
}

function initReferral_init_args(src: Referral_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.jobId);
        b_0.storeStringRefTail(src.link);
    };
}

async function Referral_init(jobId: string, link: string) {
    const __code = Cell.fromBase64('te6ccgECGwEABLQAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCFwQFAgFYDg8CxO2i7fsBkjB/4HAh10nCH5UwINcLH94gghD9av9Iuo4wMNMfAYIQ/Wr/SLry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMTN/4CCCEJRqmLa64wLAAJEw4w1wBgcAzsj4QwHMfwHKAFUwUEMg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBIG6VMHABywGOHiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFuLIUAPPFslYzMhYzxbJAczJ7VQBUDDTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH8IA/z5ASCC8POomx4fzZUwJIWjNK3/A1ioRNTwNblxx0z9qjesXBQLuo8xMNs8ghB3NZQA+CdvEPhBbyQTXwOhggiYloChtggjIG7y0IABgEJ/VSBtbW3bPH/bMeAggvBu9BoWAyecvQM5bTo1k9P0ZcloVUElqLOQZ+v8iwYNZboLDAkBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8DAOyjzEw2zyCEDuaygD4J28Q+EFvJBNfA6GCCJiWgKG2CCMgbvLQgAGAQn9VIG1tbds8f9sx4ILwo2d6ELOA3ZSTHjL96IqvdwWdAqZ2I0TOZ7IqZoqnoZm64wILDAoCVts8ghA7msoA+CdvEPhBbyQTXwOhggiYloChtghSQIBCf1UgbW1t2zx/2zELDAAWgV1Q+EJSUMcF8vQByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBIBARAgFIExQCEbbYG2ebZ42IMBcSALm3ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJAACPgnbxAAEbCvu1E0NIAAYAIBIBUWAhGsNW2ebZ42IkAXGAB1rN3Ghq0uDM5nReXqLaqJjQsu6M5ujosJiC8nCOtK7wnNBqsOpiYuiUnOKojsiKoqKI6I6OwqRklocEAB9u1E0NQB+GPSAAGOWvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdQB0AHUAdAUQzBsFOD4KNcLCoMJuvLgidQB0AHUAdASAhkAFCIgbvLQgFRkMSMBCNEB2zwaAApt+EJBMw==');
    const __system = Cell.fromBase64('te6cckECHQEABL4AAQHAAQEFodSTAgEU/wD0pBP0vPLICwMCAWIEDwN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLgghgFDgLE7aLt+wGSMH/gcCHXScIflTAg1wsf3iCCEP1q/0i6jjAw0x8BghD9av9IuvLggfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgxM3/gIIIQlGqYtrrjAsAAkTDjDXAGCAFQMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fwcBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8DAP8+QEggvDzqJseH82VMCSFozSt/wNYqETU8DW5ccdM/ao3rFwUC7qPMTDbPIIQdzWUAPgnbxD4QW8kE18DoYIImJaAobYIIyBu8tCAAYBCf1UgbW1t2zx/2zHgIILwbvQaFgMnnL0DOW06NZPT9GXJaFVBJaizkGfr/IsGDWW6CwwJA7KPMTDbPIIQO5rKAPgnbxD4QW8kE18DoYIImJaAobYIIyBu8tCAAYBCf1UgbW1t2zx/2zHggvCjZ3oQs4DdlJMeMv3oiq93BZ0CpnYjRM5nsipmiqehmbrjAgsMCgJW2zyCEDuaygD4J28Q+EFvJBNfA6GCCJiWgKG2CFJAgEJ/VSBtbW3bPH/bMQsMABaBXVD4QlJQxwXy9AHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wANAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAM7I+EMBzH8BygBVMFBDINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WASBulTBwAcsBjh4g10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbiyFADzxbJWMzIWM8WyQHMye1UAgFYEBQCASAREwIRttgbZ5tnjYgwGBIACPgnbxAAubd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4DepO98qiy3jjqenvAqzhk0E4TsunLVmnZbmdB0s2yjN0UkAIBSBUWABGwr7tRNDSAAGACASAXHAIRrDVtnm2eNiJAGBsB9u1E0NQB+GPSAAGOWvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBINcLAcMAjh/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIlHLXIW3iAdQB0AHUAdAUQzBsFOD4KNcLCoMJuvLgidQB0AHUAdASAhkBCNEB2zwaAApt+EJBMwAUIiBu8tCAVGQxIwB1rN3Ghq0uDM5nReXqLaqJjQsu6M5ujosJiC8nCOtK7wnNBqsOpiYuiUnOKojsiKoqKI6I6OwqRklocEAlIRSd');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initReferral_init_args({ $$type: 'Referral_init_args', jobId, link })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const Referral_errors: { [key: number]: { message: string } } = {
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

const Referral_types: ABIType[] = [
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

const Referral_getters: ABIGetter[] = [
    {"name":"details","arguments":[],"returnType":{"kind":"simple","type":"Ref","optional":false}},
    {"name":"balance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

const Referral_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"Affiliate"}},
    {"receiver":"internal","message":{"kind":"text","text":"Reward"}},
    {"receiver":"internal","message":{"kind":"text","text":"Return"}},
    {"receiver":"internal","message":{"kind":"text","text":"Contribute"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class Referral implements Contract {
    
    static async init(jobId: string, link: string) {
        return await Referral_init(jobId, link);
    }
    
    static async fromInit(jobId: string, link: string) {
        const init = await Referral_init(jobId, link);
        const address = contractAddress(0, init);
        return new Referral(address, init);
    }
    
    static fromAddress(address: Address) {
        return new Referral(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  Referral_types,
        getters: Referral_getters,
        receivers: Referral_receivers,
        errors: Referral_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Affiliate | 'Reward' | 'Return' | 'Contribute' | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Affiliate') {
            body = beginCell().store(storeAffiliate(message)).endCell();
        }
        if (message === 'Reward') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Return') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'Contribute') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getDetails(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('details', builder.build())).stack;
        const result = loadTupleRef(source);
        return result;
    }
    
    async getBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('balance', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
}