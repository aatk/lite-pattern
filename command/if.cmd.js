const reIf = /\[%\s*(if|если)\s*(?<query>\(\s*(.*)\s*\))\s*%\]\s?/gmiu;
const reElse = /\[%\s*(else|иначе)\s*%\]\s?/gmiu;
const reEndIf = /\[%\s*(endif|конецесли)\s*%\]\s?/gmiu;
const param = /\(\s*(?<param1>[_a-zа-я]{1}[_a-zа-я0-9]*)\s*[!=<>]{1,3}\s*(?<param2>[_a-zа-я]{1}[_a-zа-я0-9]*)?|(?<other>[.]*)\s*\)/miug;

const analyzeParams = (match) => {
    let query = match.groups.query;
    let findParams = [...query.matchAll(param)];
    let params = [];

    findParams.forEach(param => {
        param.groups.param1 && params.push(param.groups.param1);
        param.groups.param2 && params.push(param.groups.param2);
    });

    return {protect: [], params: params};
}

module.exports = [
    {
        input: reIf,
        output: `end]]if :query {\n[[start`,
        params: analyzeParams
    },
    {
        input: reElse,
        output: `end]]}\nelse {\n[[start`
    },
    {
        input: reEndIf,
        output: `end]]}\n[[start`
    }]
