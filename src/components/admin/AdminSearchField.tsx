import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

type AdminSearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export function AdminSearchField({
  value,
  onChange,
  placeholder = "Search…",
  className,
}: AdminSearchFieldProps) {
  return (
    <div className={cn("relative w-full min-w-0 max-w-md", className)}>
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className="w-full rounded-md border border-input bg-background/60 py-2 pl-9 pr-9 text-sm outline-none focus:border-primary"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}

export function AdminSearchEmptyState({ query }: { query: string }) {
  if (!query.trim()) return null;
  return (
    <p className="text-muted-foreground">
      No results found.{" "}
      <span className="text-muted-foreground/80">Try a different search term.</span>
    </p>
  );
}
