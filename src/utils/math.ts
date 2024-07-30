// 保留 n 位小数，并向上取整
export function mathCeil(num, byte) {
  const n = Math.pow(10, byte)
  return Math.ceil(num * n) / n
}
