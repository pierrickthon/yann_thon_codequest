const doubleNumbers = (numbers) => numbers.map(n => n * 2);
const filterEven = (numbers) => numbers.filter(n => n % 2 === 0);
const evenDoubled = (numbers) => numbers.filter(n => n % 2 === 0).map(n => n * 2);

module.exports = { doubleNumbers, filterEven, evenDoubled };


