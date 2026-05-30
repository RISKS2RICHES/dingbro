export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function slugToGoogleMapsUrl(address: string, town: string, postcode: string): string {
  const query = encodeURIComponent(`${address}, ${town}, ${postcode}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
