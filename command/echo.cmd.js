const reEcho = /\[\[\s*(?<var>[а-яa-z]{1}[а-яa-z0-9.]+)\s*\]\]/gmiu;
const reEchoFunc = /\[\[\s*(?<var>[а-яa-z]{1}[а-яa-z0-9.]+)\s*(\|(?<function>[а-яa-z|.\S]*))\s*\]\]/gmiu;

const parseFunc = (groups, context) => {
    const value = groups.var;
    const functionsString = groups.function;
    if (typeof functionsString === "string") {
        let inputFunctions = functionsString.split("|");
        const functionParse = /(?<name>[a-zа-я]{1}[a-zа-я0-9_-]*)(\((?<params>.*)*\))?/gmiu;
        let output=value;
        inputFunctions.forEach(func => {
            const array = [...func.matchAll(functionParse)];
            const match = array[0];
            const params = match.groups.params ? `,${match.groups.params}` : '';

            let functionName = match.groups.name.toLowerCase();
            let functionCall = "functions";
            if (context.functions[functionName].__proto__.constructor.name === "AsyncFunction") {
                functionCall = "await functions";
            }

            output = `${functionCall}.${functionName}(${output}${params})`;
        })
        delete groups.function
        groups.var = output;
    }
    return groups;
}

const analyzeParams = (match) => {
    return {protect: [], params: [match.groups.var]};
}

module.exports = [
    {
        input: reEcho,
        output: '${:var}',
        params: analyzeParams
    },
    {
        input: reEchoFunc,
        prePut: parseFunc,
        output: '${:var}',
        params: analyzeParams
    }
]
