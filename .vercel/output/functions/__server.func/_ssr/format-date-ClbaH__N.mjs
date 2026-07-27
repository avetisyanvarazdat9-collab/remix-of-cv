//#region node_modules/.nitro/vite/services/ssr/assets/format-date-ClbaH__N.js
function formatDate(input) {
	if (!input) return "";
	const d = typeof input === "string" ? new Date(input) : input;
	if (Number.isNaN(d.getTime())) return "";
	return `${String(d.getUTCDate()).padStart(2, "0")}.${String(d.getUTCMonth() + 1).padStart(2, "0")}.${d.getUTCFullYear()}`;
}
function formatDateTime(input) {
	if (!input) return "";
	const d = typeof input === "string" ? new Date(input) : input;
	if (Number.isNaN(d.getTime())) return "";
	const hh = String(d.getUTCHours()).padStart(2, "0");
	const min = String(d.getUTCMinutes()).padStart(2, "0");
	return `${formatDate(d)} ${hh}:${min}`;
}
//#endregion
export { formatDateTime as n, formatDate as t };
