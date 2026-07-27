export type ProfessionalFocusPillar = {
  title: string;
  description: string;
  tags: string[];
};

export type ParsedProfessionalFocusBio = {
  beforeFocus: string;
  pillars: ProfessionalFocusPillar[];
  afterFocus: string;
};

const FOCUS_MARKER = "Professional Focus";
const AFTER_FOCUS_MARKER = "Academic & Industry Impact";

function splitTags(description: string): string[] {
  if (!description.includes(",")) return [];
  return description
    .split(/,|\band\b/i)
    .map((part) => part.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

function parsePillarLine(line: string): ProfessionalFocusPillar | null {
  const colonIdx = line.indexOf(":");
  if (colonIdx <= 0) return null;

  const title = line.slice(0, colonIdx).trim();
  const description = line.slice(colonIdx + 1).trim();
  if (!title || !description) return null;

  return {
    title,
    description,
    tags: splitTags(description),
  };
}

export function parseProfessionalFocusFromBio(bio: string): ParsedProfessionalFocusBio | null {
  const focusIdx = bio.indexOf(FOCUS_MARKER);
  if (focusIdx === -1) return null;

  const beforeFocus = bio.slice(0, focusIdx).trim();
  let rest = bio.slice(focusIdx + FOCUS_MARKER.length).trim();

  let afterFocus = "";
  const afterIdx = rest.indexOf(AFTER_FOCUS_MARKER);
  if (afterIdx !== -1) {
    afterFocus = rest.slice(afterIdx).trim();
    rest = rest.slice(0, afterIdx).trim();
  }

  const pillars = rest
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parsePillarLine)
    .filter((pillar): pillar is ProfessionalFocusPillar => pillar !== null);

  if (pillars.length === 0) return null;

  return { beforeFocus, pillars, afterFocus };
}
