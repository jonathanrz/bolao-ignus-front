import { format } from 'date-fns'

export function formatDate(date) {
  if (!date) return 'Invalid Date'
  return format(new Date(date * 1000), 'DD/MM/YYYY')
}

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0
}

export function formatCurrency(value) {
  if (value === undefined || value == null) return 'Invalid Currency'
  if (isFloat(value)) value = value.toFixed(2)
  else value = value.toString() + '.00'
  return '$' + value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}

export function formatNumber(value) {
  if (value === undefined || value == null) return 'Invalid Value'
  if (isFloat(value)) value = value.toFixed(3)
  else value = value.toString()
  return value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')
}