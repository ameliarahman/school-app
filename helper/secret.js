module.exports = function getSecret(nilai) {
    let char = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_'
    let result = '';
    for (let i = 0; i < nilai; i++) {
        result += char[Math.floor(Math.random() * char.length)]
    }
    return result;
}