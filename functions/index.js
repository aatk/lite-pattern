const path = require("path");
const fs = require("fs");

const loadFunctions = () => {
    let dir = path.join(__dirname);
    let files = fs.readdirSync(dir);//, {withFileTypes: true});
    let func = {};
    files.forEach(file => {
        if (file !== "index.js") {
            const ext_functions = require(`./${file}`);
            ext_functions.name.forEach(name => {
                func[name] = ext_functions.func;
            });
        }
    })
    return func;
}

const functions = loadFunctions();
module.exports = functions;
