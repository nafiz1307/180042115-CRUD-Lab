var crypto = require('crypto');
function randU32Sync() {
  return crypto.randomBytes(4).readUInt32BE(0, true);
}
console.log(randU32Sync);