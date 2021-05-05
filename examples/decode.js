const { decode } = require('../dist');

const uri = 'mass://some-provider/some-product?eyJoZWxsbyI6IndvcmxkIiwibWFzcyI6eyJlbmRwb2ludCI6Imh0dHBzOi8vZXhhbXBsZS5jb20vbWFzcy5qcyJ9fQ==';

console.log(JSON.stringify(decode(uri), null, 2));
