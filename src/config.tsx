// const locale = 'en-us'
const locale = 'nl-nl'

export const months = Array.from(new Array(12)).map((s, i) => monthName(i))

function monthName(index: number): string {
  const objDate = new Date()
  objDate.setDate(1)
  objDate.setMonth(index)
  return objDate.toLocaleString(locale, {month: 'long'})
}
