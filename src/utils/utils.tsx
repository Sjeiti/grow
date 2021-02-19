export function datePart(date: Date): number {
  return (date.getMonth() + date.getDate() / 31) / 12
}

export function partToPercentage(part:number):string {
  return `${100*part}%`
}

export function rgba(color:string, alpha:number):string {
  const hexes = color.substr(1)
  const isThree = hexes.length===3
  const rgb = isThree?(hexes.match(/./g)||[]).map(s=>s+s):(hexes.match(/.{2}/g)||[])
  return `rgba(${rgb.map(s=>parseInt(s,16)).join(',')},${alpha})`
}


export function px(n:number):string {
	return `${n}px`
}

export function square(s:string):string {
	return `${s} ${s}`
}
