
const func = (innerData = [], params) => {
    return innerData.join(params);
}

module.exports = {
    name: ["join", "соединить"],
    func: func
}
