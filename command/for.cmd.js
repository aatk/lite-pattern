const reFor = /\[%\s*(for|цикл)\s*\(\s*(?<var>[а-яa-z]{1}[а-яa-z0-9.]*)\s*(of|из)\s*(?<from>[а-яa-z]{1}[а-яa-z0-9.]*)\s*\)\s*%\]\s?/gmiu
const reEndFor = /\[%\s*(endfor|конеццикла)\s*%\]\s?/gmiu;

const analyzeParams = (match) => {
    return {protect: [match.groups.var], params: [match.groups.from]};
}

module.exports = [{
        input: reFor,
        output: `end]]for (const :var of :from) {\n[[start`,
        params: analyzeParams
    },
    {
        input: reEndFor,
        output: `end]]}\n[[start`
    }];
