export function datePart(date: Date): number {
  return (date.getMonth() + date.getDate() / 31) / 12
}

export function partToPercentage(part:number):string {
  return `${100*part}%`
}
