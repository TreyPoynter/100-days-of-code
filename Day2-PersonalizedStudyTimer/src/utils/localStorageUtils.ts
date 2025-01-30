export function writeToLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value))
}

export function getFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}