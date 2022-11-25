export function saveToLocalStorage(key, obj: Record<string, unknown>) {
	localStorage.setItem(key, JSON.stringify(obj))
	return
}