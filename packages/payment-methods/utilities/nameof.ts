export default function nameof<T>(key: keyof T): keyof T {
	return key;
}
