
const func = (innerData = "", params) => {
    return innerData.split(params);
}

module.exports = {
    name: ["split", "разделить"],
    func: func
}
