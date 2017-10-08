module.exports = function scoreLetter(nilai) {
    if (nilai > 85) {
        return "A"
    } else if (nilai > 70) {
        return "B"
    } else if (nilai > 55) {
        return "C"
    } else if (nilai <= 55) {
        return "E"
    }
}