import {btoa, atob} from './base64';

export function encode(provider, product, endpoint, params) {
  var re = /[^0-9a-z-]/ig;
  provider = provider.replace(re, '');
  product = product.replace(re, '');
  params = assign({}, params);

  if (endpoint) {
    params.mass = {
      endpoint: endpoint
    };
  }

  var b64 = btoa(JSON.stringify(params));
  b64 = b64.replace(/\+/g, '-').replace(/\//g, '_');

  var encoded = 'mass://' + provider + '/' + product + '?' + b64;

  return encoded;
}

export function decode(encoded) {
  var re = /mass:\/\/([0-9a-z-]+)\/([0-9a-z-]+)\?([0-9a-z-_.!~*'()%{}$=&:/]+)?/i;

  var matches = encoded.match(re);
  if (matches) {
    var decoded = {
      provider: matches[1],
      product: matches[2]
    };

    var query = matches[3].split('&');
    var params = JSON.parse(atob(query[0].replace(/-/g, '+').replace(/_/g, '/')));

    assign(decoded, params.mass);
    delete params.mass;
    decoded.params = params;

    for (var i = 1; i < query.length; i++) {
      if (query[i]) {
        var kv = query[i].split('=');

        if (kv[1]) {
          try {
            kv[1] = decodeURIComponent(kv[1]);
          }
          catch (e) {
          }
        }

        decoded.params[kv[0]] = kv[1] || '';
      }
    }

    return decoded;
  }
}


function assign(dst, src) {
  if (typeof(src) === 'object') {
    for (var k in src) {
      dst[k] = src[k];
    }
  }
  return dst;
}
