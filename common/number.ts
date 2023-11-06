export function formatNumber(val: any, defaultVal?: number, floatNum?: number): number {
  const n = Number.parseFloat(val)
  return n
    ? val.toLocaleString('en-GB', {
      minimumFractionDigits: floatNum,
    })
    : defaultVal || val
}
