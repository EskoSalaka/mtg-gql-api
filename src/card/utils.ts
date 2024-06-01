import * as _ from 'lodash';

export function replaceKeysDeep(obj, keysMap) {
  if (
    _.isObject(obj) &&
    Reflect.ownKeys(obj).length &&
    typeof Reflect.ownKeys(obj)[0] === 'symbol'
  ) {
    let val = obj[Reflect.ownKeys(obj)[0]];

    obj[Reflect.ownKeys(obj)[0]] = _.isObject(val) ? replaceKeysDeep(val, keysMap) : val;

    return obj;
  } else {
    return _.transform(obj, function (result, value, key) {
      let currentKey = keysMap[key] || key;
      result[currentKey] = _.isObject(value) ? replaceKeysDeep(value, keysMap) : value;
    });
  }
}
