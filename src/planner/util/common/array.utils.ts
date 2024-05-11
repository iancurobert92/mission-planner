export class ArrayUtils {
  static hasElement<T>(
    object: T,
    array: T[],
    propsToCheck: (keyof T)[]
  ): boolean {
    if (!(object instanceof Object)) return false;

    return array.some((item) => {
      return propsToCheck.every((key) => {
        return item[key] === object[key];
      });
    });
  }
}
