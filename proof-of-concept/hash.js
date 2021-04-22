const md5 = require('md5');

function* hash() {
  let i = 0;
  while (true) {
    yield `l${md5(i++)}`;
  }
}

module.exports = hash();