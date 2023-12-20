import _ from 'lodash';

export function convertToCamelCase(data) {
  if (Array.isArray(data)) {
    return data.map((item) => convertToCamelCase(item));
  }

  if (_.isObject(data)) {
    return Object.keys(data).reduce((acc, key) => {
      acc[_.camelCase(key)] = convertToCamelCase(data[key]);
      return acc;
    }, {});
  }

  return data;
}

export function convertToSnakeCase(data) {
  if (Array.isArray(data)) {
    return data.map((item) => convertToSnakeCase(item));
  }

  if (_.isObject(data)) {
    return Object.keys(data).reduce((acc, key) => {
      acc[_.snakeCase(key)] = convertToSnakeCase(data[key]);
      return acc;
    }, {});
  }

  return data;
}

// Parse query params types to filter types - fixes string to number conversions
export function parseQueryToFilter<T>(query: any, filterType: DefaultValues<T>): Partial<T> {
  const filter: any = {};
  const keys = Object.keys(filterType) as Array<keyof T>;

  for (const key of keys) {
    if (query[key] !== undefined) {
      const expectedType = typeof filterType[key];
      if (expectedType === 'number') {
        filter[key] = Number(query[key]);
      } else {
        filter[key] = query[key];
      }
    }
  }

  return filter as Partial<T>;
}

// Get default values of a type
export type DefaultValues<T> = {
  [K in keyof T]: T[K];
};