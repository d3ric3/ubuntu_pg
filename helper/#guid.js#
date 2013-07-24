module.exports = function(){
    var idx = [], itoh = '0123456789ABCDEF'.split('');
 
    // Array of digits in UUID (32 digits + 4 dashes)
    for (var i = 0; i < 36; i++) { idx[i] = 0xf & Math.random() * 0x10; }
    // Conform to RFC 4122, section 4.4
    idx[14] = 4; // version
    idx[19] = (idx[19] & 0x3) | 0x8; // high bits of clock sequence
 
    // Convert to hex chars
    for (var i = 0; i < 36; i++) { idx[i] = itoh[idx[i]]; }
 
    // Insert dashes
    idx[8] = idx[13] = idx[18] = idx[23] = '-';
 
    return idx.join('');
}
