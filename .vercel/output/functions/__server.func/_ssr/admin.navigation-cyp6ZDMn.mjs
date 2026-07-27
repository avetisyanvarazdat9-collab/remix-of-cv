import { o as __toESM } from "../_runtime.mjs";
import { T as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as supabase } from "./client-Ubk6A-Vs.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { $ as CircleCheck, J as Download, et as ChevronUp, it as Check, l as TriangleAlert, rt as ChevronDown } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as CrudPage } from "./CrudPage-tiRdBCo3.mjs";
import { t as Button } from "./button-DVRVaDr-.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.navigation-cyp6ZDMn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var alertVariants = cva("relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7", {
	variants: { variant: {
		default: "bg-background text-foreground",
		destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
	} },
	defaultVariants: { variant: "default" }
});
var Alert = import_react.forwardRef(({ className, variant, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	role: "alert",
	className: cn(alertVariants({ variant }), className),
	...props
}));
Alert.displayName = "Alert";
var AlertTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
	ref,
	className: cn("mb-1 font-medium leading-none tracking-tight", className),
	...props
}));
AlertTitle.displayName = "AlertTitle";
var AlertDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm [&_p]:leading-relaxed", className),
	...props
}));
AlertDescription.displayName = "AlertDescription";
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
var fields = [
	{
		name: "label_hy",
		label: "Label (HY · Հայերեն)",
		type: "text",
		required: true,
		placeholder: "Գլխավոր"
	},
	{
		name: "label_en",
		label: "Label (EN · English)",
		type: "text",
		required: true,
		placeholder: "Home"
	},
	{
		name: "label_ru",
		label: "Label (RU · Русский)",
		type: "text",
		required: true,
		placeholder: "Главная"
	},
	{
		name: "path",
		label: "Path / URL",
		type: "text",
		required: true,
		placeholder: "/about"
	},
	{
		name: "order_index",
		label: "Order",
		type: "number",
		required: true
	},
	{
		name: "is_visible",
		label: "Visible",
		type: "boolean"
	}
];
var EXPECTED_COLUMNS = [
	"Path",
	"Label EN",
	"Label HY",
	"Label RU",
	"Missing Labels"
];
function parseCsvLine(line) {
	const result = [];
	let current = "";
	let inQuotes = false;
	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (inQuotes) if (ch === "\"" && line[i + 1] === "\"") {
			current += "\"";
			i++;
		} else if (ch === "\"") inQuotes = false;
		else current += ch;
		else if (ch === "\"") inQuotes = true;
		else if (ch === ",") {
			result.push(current);
			current = "";
		} else current += ch;
	}
	result.push(current);
	return result;
}
function buildCsv(rows) {
	const header = EXPECTED_COLUMNS;
	const lines = rows.map((r) => [
		r.path,
		r.label_en ?? "",
		r.label_hy ?? "",
		r.label_ru ?? "",
		r.missing.join(", ") || "-"
	]);
	const escape = (v) => `"${v.replace(/"/g, "\"\"")}"`;
	return [header, ...lines].map((line) => line.map(escape).join(",")).join("\n");
}
function validateCsv(csv, expectedRows, mode) {
	const lines = csv.split("\n").filter((l) => l.length > 0);
	if (lines.length === 0) return {
		ok: false,
		message: "CSV is empty"
	};
	const header = parseCsvLine(lines[0]);
	if (JSON.stringify(header) !== JSON.stringify(EXPECTED_COLUMNS)) return {
		ok: false,
		message: `Unexpected header columns: ${header.join(", ")}`
	};
	const dataLines = lines.slice(1);
	if (dataLines.length !== expectedRows.length) return {
		ok: false,
		message: `Expected ${expectedRows.length} data rows, found ${dataLines.length}`
	};
	if (mode === "missing") {
		if (expectedRows.some((r) => r.missing.length === 0)) return {
			ok: false,
			message: "Missing-label export contains a row with no missing labels"
		};
	}
	return {
		ok: true,
		message: `CSV is valid for ${mode} mode (${expectedRows.length} rows).`
	};
}
function downloadCsv(csv, filename) {
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
			const { data, error } = await supabase.from("navigation_menu").select("id, path, label_en, label_hy, label_ru").order("order_index", { ascending: true });
			if (error) throw error;
			return data;
		},
		refetchOnWindowFocus: false
	});
	if (isLoading || !data) return null;
	const audited = data.map((r) => {
		const missing = [];
		if (!r.label_en?.trim()) missing.push("label_en");
		if (!r.label_hy?.trim()) missing.push("label_hy");
		if (!r.label_ru?.trim()) missing.push("label_ru");
		return {
			...r,
			missing
		};
	});
	const issues = audited.filter((x) => x.missing.length > 0);
	const allRows = audited;
	const [exportMode, setExportMode] = (0, import_react.useState)("all");
	const [checkResult, setCheckResult] = (0, import_react.useState)(null);
	const rowsToExport = exportMode === "missing" ? issues : allRows;
	const handleExport = () => {
		downloadCsv(buildCsv(rowsToExport), `navigation-labels-audit-${exportMode}-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-")}.csv`);
	};
	const runCheck = () => {
		setCheckResult(validateCsv(buildCsv(rowsToExport), rowsToExport, exportMode));
	};
	const exportControls = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 space-y-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: exportMode,
					onValueChange: (v) => {
						setExportMode(v);
						setCheckResult(null);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-[220px] h-9",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose rows to export" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "all",
						children: "All navigation rows"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: "missing",
						children: "Missing-label rows only"
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: handleExport,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4 mr-2" }), "Export CSV"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: runCheck,
					children: "Run check"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-muted-foreground text-sm",
					children: [
						rowsToExport.length,
						" row",
						rowsToExport.length === 1 ? "" : "s",
						" selected"
					]
				})
			]
		}), checkResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("text-sm flex items-center gap-2 rounded-md border px-3 py-2 w-fit", checkResult.ok ? "border-green-500/30 bg-green-500/10 text-green-700" : "border-red-500/30 bg-red-500/10 text-red-700"),
			children: [checkResult.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: checkResult.message })]
		})]
	});
	if (issues.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
		className: "mb-4 border-green-500/40",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-green-600" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: "All translations present" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, { children: [
				"All ",
				data.length,
				" navigation item",
				data.length === 1 ? "" : "s",
				" have non-empty HY, EN, and RU labels.",
				exportControls
			] })
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
		variant: "destructive",
		className: "mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "h-4 w-4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertTitle, { children: [
				issues.length,
				" item",
				issues.length === 1 ? "" : "s",
				" missing translations"
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDescription, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-1 text-sm",
				children: issues.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: row.path }),
					" — missing: ",
					row.missing.join(", ")
				] }, row.id))
			}), exportControls] })
		]
	});
}
function NavigationAdminPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TranslationAudit, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CrudPage, {
		title: "Navigation menu",
		description: "Manage the items shown in the public site header. Provide a label for each of the three site languages.",
		table: "navigation_menu",
		orderBy: {
			column: "order_index",
			ascending: true
		},
		displayColumns: [
			"label_hy",
			"label_en",
			"label_ru",
			"path",
			"order_index",
			"is_visible"
		],
		fields
	})] });
}
//#endregion
export { NavigationAdminPage as component };
