import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CrudPage } from "@/components/admin/CrudPage";
import { supabase } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/admin/navigation")({
  head: () => ({ meta: [{ title: "Navigation — Admin" }] }),
  component: NavigationAdminPage,
});

const fields = [
  { name: "label_hy", label: "Label (HY · Հայերեն)", type: "text" as const, required: true, placeholder: "Գլխավոր" },
  { name: "label_en", label: "Label (EN · English)", type: "text" as const, required: true, placeholder: "Home" },
  { name: "label_ru", label: "Label (RU · Русский)", type: "text" as const, required: true, placeholder: "Главная" },
  { name: "path", label: "Path / URL", type: "text" as const, required: true, placeholder: "/about" },
  { name: "order_index", label: "Order", type: "number" as const, required: true },
  { name: "is_visible", label: "Visible", type: "boolean" as const },
];

type Row = { id: string; path: string; label_en: string | null; label_hy: string | null; label_ru: string | null };

type AuditedRow = Row & { missing: string[] };

const EXPECTED_COLUMNS = ["Path", "Label EN", "Label HY", "Label RU", "Missing Labels"];

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        result.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  result.push(current);
  return result;
}

function buildCsv(rows: AuditedRow[]): string {
  const header = EXPECTED_COLUMNS;
  const lines = rows.map((r) => [
    r.path,
    r.label_en ?? "",
    r.label_hy ?? "",
    r.label_ru ?? "",
    r.missing.join(", ") || "-",
  ]);
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [header, ...lines].map((line) => line.map(escape).join(",")).join("\n");
}

function validateCsv(csv: string, expectedRows: AuditedRow[], mode: "all" | "missing"): { ok: boolean; message: string } {
  const lines = csv.split("\n").filter((l) => l.length > 0);
  if (lines.length === 0) return { ok: false, message: "CSV is empty" };

  const header = parseCsvLine(lines[0]);
  if (JSON.stringify(header) !== JSON.stringify(EXPECTED_COLUMNS)) {
    return { ok: false, message: `Unexpected header columns: ${header.join(", ")}` };
  }

  const dataLines = lines.slice(1);
  if (dataLines.length !== expectedRows.length) {
    return { ok: false, message: `Expected ${expectedRows.length} data rows, found ${dataLines.length}` };
  }

  if (mode === "missing") {
    const hasInvalidRow = expectedRows.some((r) => r.missing.length === 0);
    if (hasInvalidRow) {
      return { ok: false, message: "Missing-label export contains a row with no missing labels" };
    }
  }

  return { ok: true, message: `CSV is valid for ${mode} mode (${expectedRows.length} rows).` };
}

function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function TranslationAudit() {
  const { data, isLoading } = useQuery({
    queryKey: ["navigation_menu", "audit"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("navigation_menu")
        .select("id, path, label_en, label_hy, label_ru")
        .order("order_index", { ascending: true });
      if (error) throw error;
      return data as Row[];
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading || !data) return null;

  const audited = data.map((r) => {
    const missing: string[] = [];
    if (!r.label_en?.trim()) missing.push("label_en");
    if (!r.label_hy?.trim()) missing.push("label_hy");
    if (!r.label_ru?.trim()) missing.push("label_ru");
    return { ...r, missing };
  });

  const issues = audited.filter((x) => x.missing.length > 0);
  const allRows = audited;

  const [exportMode, setExportMode] = useState<"all" | "missing">("all");
  const [checkResult, setCheckResult] = useState<{ ok: boolean; message: string } | null>(null);
  const rowsToExport = exportMode === "missing" ? issues : allRows;

  const handleExport = () => {
    const csv = buildCsv(rowsToExport);
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-");
    downloadCsv(csv, `navigation-labels-audit-${exportMode}-${timestamp}.csv`);
  };

  const runCheck = () => {
    const csv = buildCsv(rowsToExport);
    setCheckResult(validateCsv(csv, rowsToExport, exportMode));
  };

  const exportControls = (
    <div className="mt-3 space-y-2">
      <div className="flex items-center gap-3">
        <Select
          value={exportMode}
          onValueChange={(v) => {
            setExportMode(v as "all" | "missing");
            setCheckResult(null);
          }}
        >
          <SelectTrigger className="w-[220px] h-9">
            <SelectValue placeholder="Choose rows to export" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All navigation rows</SelectItem>
            <SelectItem value="missing">Missing-label rows only</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
        <Button variant="ghost" size="sm" onClick={runCheck}>
          Run check
        </Button>
        <span className="text-muted-foreground text-sm">{rowsToExport.length} row{rowsToExport.length === 1 ? "" : "s"} selected</span>
      </div>
      {checkResult && (
        <div
          className={cn(
            "text-sm flex items-center gap-2 rounded-md border px-3 py-2 w-fit",
            checkResult.ok
              ? "border-green-500/30 bg-green-500/10 text-green-700"
              : "border-red-500/30 bg-red-500/10 text-red-700"
          )}
        >
          {checkResult.ok ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
          <span>{checkResult.message}</span>
        </div>
      )}
    </div>
  );

  if (issues.length === 0) {
    return (
      <Alert className="mb-4 border-green-500/40">
        <CheckCircle2 className="h-4 w-4 text-green-600" />
        <AlertTitle>All translations present</AlertTitle>
        <AlertDescription>
          All {data.length} navigation item{data.length === 1 ? "" : "s"} have non-empty HY, EN, and RU labels.
          {exportControls}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{issues.length} item{issues.length === 1 ? "" : "s"} missing translations</AlertTitle>
      <AlertDescription>
        <ul className="mt-2 space-y-1 text-sm">
          {issues.map((row) => (
            <li key={row.id}>
              <code>{row.path}</code> — missing: {row.missing.join(", ")}
            </li>
          ))}
        </ul>
        {exportControls}
      </AlertDescription>
    </Alert>
  );
}


function NavigationAdminPage() {
  return (
    <div>
      <TranslationAudit />
      <CrudPage
        title="Navigation menu"
        description="Manage the items shown in the public site header. Provide a label for each of the three site languages."
        table="navigation_menu"
        orderBy={{ column: "order_index", ascending: true }}
        displayColumns={["label_hy", "label_en", "label_ru", "path", "order_index", "is_visible"]}
        fields={fields}
      />
    </div>
  );
}
