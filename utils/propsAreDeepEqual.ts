import _ from 'lodash';

export function propsAreDeepEqual<T>(prevProps: T, newProps: T): boolean {
  return _.isEqual(prevProps, newProps);
}
