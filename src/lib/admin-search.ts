type Row = Record<string, unknown>;

function appendValue(parts: string[], value: unknown) {
  if (value === null || value === undefined || value === "") return;
  if (typeof value === "boolean") {
    parts.push(value ? "yes" : "no");
    return;
  }
  if (Array.isArray(value)) {
    parts.push(value.map(String).join(" "));
    return;
  }
  parts.push(String(value));
}

function appendField(parts: string[], row: Row, name: string) {
  appendValue(parts, row[name]);
  const bag = row.i18n as Record<string, { hy?: string; en?: string; ru?: string }> | undefined;
  const tri = bag?.[name];
  if (tri && typeof tri === "object") {
    appendValue(parts, tri.hy);
    appendValue(parts, tri.en);
    appendValue(parts, tri.ru);
  }
}

/** Case-insensitive client-side filter for admin list rows. */
export function rowMatchesAdminSearch(row: Row, query: string, fieldNames: string[]): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  const parts: string[] = [];
  for (const name of fieldNames) appendField(parts, row, name);
  return parts.join(" ").toLowerCase().includes(q);
}

/** Match when any provided string value contains the query. */
export function textMatchesAdminSearch(values: Array<string | null | undefined>, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return values.some((v) => (v ?? "").toLowerCase().includes(q));
}
