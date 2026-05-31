export function getLocationTypeLabel(value: string) {
  if (value === 'main-office') return 'Centro principal'
  if (value === 'satellite-office') return 'Centro satelite'
  return 'Punto movil'
}

export function getMapEmbedUrl(address: string | undefined) {
  if (!address) {
    return 'https://www.google.com/maps?output=embed'
  }

  return `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
}
