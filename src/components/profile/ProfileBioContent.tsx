import { parseProfessionalFocusFromBio } from "@/lib/parse-professional-focus";
import { ProfessionalFocusBento } from "@/components/profile/ProfessionalFocusBento";

export function ProfileBioContent({
  bio,
  paragraphClassName,
}: {
  bio: string;
  paragraphClassName?: string;
}) {
  const parsed = parseProfessionalFocusFromBio(bio);
  const paragraphClass = paragraphClassName ?? "whitespace-pre-line leading-relaxed text-muted-foreground";

  if (!parsed) {
    return <p className={paragraphClass}>{bio}</p>;
  }

  return (
    <div className="space-y-8">
      {parsed.beforeFocus && <p className={paragraphClass}>{parsed.beforeFocus}</p>}

      <div className="space-y-4">
        <p className="section-eyebrow">Professional Focus</p>
        <ProfessionalFocusBento pillars={parsed.pillars} />
      </div>

      {parsed.afterFocus && <p className={paragraphClass}>{parsed.afterFocus}</p>}
    </div>
  );
}
