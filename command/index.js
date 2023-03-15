const path = require("path");
const fs = require("fs");

const loadCommands = () => {
    let dir = path.join(__dirname);
    let files = fs.readdirSync(dir);
    let cmd = [];
    files.forEach(file => {
        if (file !== "index.js") {
            const ext_command = require(`./${file}`);
            cmd = [...cmd, ...ext_command];
        }
    })
    return cmd;
}

const commands = loadCommands();
module.exports = commands;
