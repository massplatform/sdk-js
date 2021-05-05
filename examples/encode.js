const { encode } = require('../dist');

const uri = encode('provider-x', 'product-y', 'https://example.com/mass.js', {
  some: 'params'
});

console.log(uri);
