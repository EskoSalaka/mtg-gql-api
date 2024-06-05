import * as _ from 'lodash';

export function replaceKeysDeep(obj, keysMap) {
  if (
    _.isObject(obj) &&
    Reflect.ownKeys(obj).length &&
    typeof Reflect.ownKeys(obj)[0] === 'symbol'
  ) {
    let val = obj[Reflect.ownKeys(obj)[0]];

    obj[Reflect.ownKeys(obj)[0]] = _.isArray(val)
      ? val.map((item) => replaceKeysDeep(item, keysMap))
      : _.isObject(val)
        ? replaceKeysDeep(val, keysMap)
        : val;

    return obj;
  } else {
    return _.transform(obj, function (result, value, key) {
      let symbpolKeys = Reflect.ownKeys(obj).filter((key) => typeof key === 'symbol');

      for (let symbolKey of symbpolKeys) {
        let val = obj[symbolKey];
        result[symbolKey] = _.isArray(val)
          ? val.map((item) => replaceKeysDeep(item, keysMap))
          : _.isObject(val)
            ? replaceKeysDeep(val, keysMap)
            : val;
      }

      let currentKey = keysMap[key] || key;
      result[currentKey] = _.isObject(value) ? replaceKeysDeep(value, keysMap) : value;
    });
  }
}
