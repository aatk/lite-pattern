const reLet = /\[%\s*(let|перем)\s*(?<var>[а-яa-z]{1}[а-яa-z0-9.]+)\s*=\s*(?<value>[\.\S]+)\s*%\]\s?/giu;
const param = /^(?<var>[_a-zа-я]{1}[a-zа-я0-9]*)(\.[a-zа-я0-9]*)?$/miug

const analyzeParams = (match) => {
    let protectParams = [match.groups.var];
    let value = match.groups.value;
    let findParams = [...value.matchAll(param)];
    let params = findParams.map(param => param.groups.var);
    return {protect: protectParams, params};
}

module.exports = [{
    input: reLet,
    output: `end]]let :var = :value;\n[[start`,
    params: analyzeParams
}]
