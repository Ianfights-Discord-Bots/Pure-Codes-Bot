function calc(num) {
    var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    return with2Decimals
}


export { calc as trunc }