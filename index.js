const vm = require("vm");
let functions = require("./functions");
let commands = require("./command");


const runCode = async (code, params) => {
    code = `result = async () => {${code}}`;
    let vmContext = {
        ...params,
        result: null,
        functions: functions,
        require: null,
        import: null
    }
    // console.log(code);
    vm.createContext(vmContext);
    vm.runInContext(code, vmContext);
    return await vmContext.result();
}

const replaceParams = (groups, template = {}) => {
    let result = template.output;

    if (template.prePut) {
        groups = template.prePut(groups, {functions, commands})
    }

    for (const key in groups) {
        const value = groups[key];
        result = result.replaceAll(`:${key}`, value);
    }
    return result;
}




const render = async (codes = "", params = {}) => {
    let code = codes.main;
    let newCode = `[[start${code}end]]`;
    commands.forEach(regexpConstructor => {
        let match;
        while ((match = regexpConstructor.input.exec(newCode)) !== null) {
            const result = replaceParams(match.groups, regexpConstructor);
            newCode = newCode.replaceAll(match[0], result);
        }
    })


    let stdOut = newCode;
    stdOut = stdOut.replaceAll("[[start", `stdOut.push(\``);
    stdOut = stdOut.replaceAll("end]]", `\`);\n`);
    stdOut = `const stdOut=[];\n${stdOut}\nreturn stdOut.join("");`;

    return await runCode(stdOut, params);
}

const renderCallback = (code = "", params = {}, callback) => {
    render({main: code}, params)
        .then(result => callback(result))
        .catch(err => callback(undefined,err));
}

const appendNewFunctions = (newFunctions) => {
    functions = [...functions, ...newFunctions];
}

const appendNewCommands = (newCommands) => {
    commands = [...commands, ...newCommands];
}

const getParams = ( template ) => {
    let params = [];
    let protectParams = [];
    commands.forEach(regexpConstructor => {
        let match;
        while ((match = regexpConstructor.input.exec(template)) !== null) {
            if (regexpConstructor.params) {
                let localParams = regexpConstructor.params(match);
                params = [...params, ...localParams.params];
                protectParams = [...protectParams, ...localParams.protect];
            }
        }
    })
    let result = params.filter(value => !protectParams.includes(value));
    result = [...new Set(result)];
    return result;
}


module.exports = { render, renderCallback, getParams, appendNewFunctions, appendNewCommands }

