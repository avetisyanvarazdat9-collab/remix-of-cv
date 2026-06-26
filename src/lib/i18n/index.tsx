import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "hy" | "en" | "ru";
export const LANGS: { code: Lang; label: string; native: string }[] = [
  { code: "hy", label: "HY", native: "Հայերեն" },
  { code: "en", label: "EN", native: "English" },
  { code: "ru", label: "RU", native: "Русский" },
];

const STORAGE_KEY = "site.lang";
const DEFAULT_LANG: Lang = "en";

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LanguageContext = createContext<Ctx>({ lang: DEFAULT_LANG, setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && (stored === "hy" || stored === "en" || stored === "ru")) {
        setLangState(stored);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    try { document.documentElement.lang = lang; } catch { /* ignore */ }
  }, [lang]);

  const value = useMemo<Ctx>(() => ({
    lang,
    setLang: (l) => {
      setLangState(l);
      try { window.localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
    },
  }), [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  return useContext(LanguageContext);
}

/** Resolve a translatable field from a row that may have an `i18n` JSONB column.
 *  Falls back through requested lang → en → hy → ru → the plain column value. */
export function localized<T extends Record<string, any> | null | undefined>(
  row: T,
  field: string,
  lang: Lang,
): string {
  if (!row) return "";
  const bag = (row as any).i18n?.[field] as Record<string, string> | undefined;
  if (bag) {
    const v = bag[lang] ?? bag.en ?? bag.hy ?? bag.ru;
    if (v && String(v).trim() !== "") return v;
  }
  const fallback = (row as any)[field];
  return fallback ?? "";
}

/** Hook returning a `loc(row, field)` bound to the current language. */
export function useLocalized() {
  const { lang } = useLang();
  return useMemo(() => <T extends Record<string, any> | null | undefined>(row: T, field: string) =>
    localized(row, field, lang), [lang]);
}

// ---------- Static UI dictionary ----------

type Dict = Record<string, { hy: string; en: string; ru: string }>;

export const DICT: Dict = {
  "nav.home": { hy: "Գլխավոր", en: "Home", ru: "Главная" },
  "nav.about": { hy: "Իմ մասին", en: "About", ru: "Обо мне" },
  "nav.projects": { hy: "Նախագծեր", en: "Projects", ru: "Проекты" },
  "nav.courses": { hy: "Դասընթացներ", en: "Courses", ru: "Курсы" },
  "nav.video": { hy: "Տեսադաս", en: "Video", ru: "Видео" },
  "nav.talks": { hy: "Ելույթներ", en: "Talks", ru: "Доклады" },
  "nav.blog": { hy: "Բլոգ", en: "Blog", ru: "Блог" },
  "nav.companies": { hy: "Ընկերություններ", en: "Companies", ru: "Компании" },
  "nav.contact": { hy: "Կապ", en: "Contact", ru: "Контакты" },
  "nav.admin": { hy: "Ադմին", en: "Admin", ru: "Админ" },

  "common.signIn": { hy: "Մուտք", en: "Sign in", ru: "Войти" },
  "common.signOut": { hy: "Ելք", en: "Sign out", ru: "Выйти" },
  "common.backHome": { hy: "Դեպի գլխավոր էջ", en: "Back to home page", ru: "На главную" },
  "common.viewAll": { hy: "Տեսնել բոլորը", en: "View all", ru: "Смотреть все" },
  "common.learnMore": { hy: "Իմանալ ավելին", en: "Learn more", ru: "Подробнее" },
  "common.loading": { hy: "Բեռնում…", en: "Loading…", ru: "Загрузка…" },
  "common.save": { hy: "Պահպանել", en: "Save", ru: "Сохранить" },
  "common.cancel": { hy: "Չեղարկել", en: "Cancel", ru: "Отмена" },
  "common.delete": { hy: "Ջնջել", en: "Delete", ru: "Удалить" },
  "common.edit": { hy: "Խմբագրել", en: "Edit", ru: "Изменить" },
  "common.new": { hy: "Նոր", en: "New", ru: "Новый" },
  "common.language": { hy: "Լեզու", en: "Language", ru: "Язык" },
  "common.viewAllArrow": { hy: "Տեսնել բոլորը →", en: "View all →", ru: "Смотреть все →" },

  "footer.contact": { hy: "Կապ", en: "Contact", ru: "Контакты" },

  "home.stats.years": { hy: "Տարիների փորձ", en: "Years of experience", ru: "Лет опыта" },
  "home.stats.courses": { hy: "Դասավանդված դասընթացներ", en: "Courses taught", ru: "Прочитанных курсов" },
  "home.stats.students": { hy: "Մենթորած ուսանողներ", en: "Students mentored", ru: "Учеников под наставничеством" },
  "home.stats.companies": { hy: "Հիմնադրած ընկերություններ", en: "Companies founded", ru: "Основанных компаний" },
  "home.role.phd": { hy: "Դոկտոր (PhD)", en: "PhD", ru: "PhD" },
  "home.role.professor": { hy: "Պրոֆեսոր", en: "Professor", ru: "Профессор" },
  "home.role.researcher": { hy: "AI հետազոտող", en: "AI Researcher", ru: "ИИ-исследователь" },
  "home.role.cto": { hy: "Տեխնիկական տնօրեն", en: "CTO", ru: "CTO" },
  "home.partners.universities": { hy: "Համալսարաններ", en: "Universities", ru: "Университеты" },
  "home.partners.training": { hy: "Ուսումնական կենտրոններ", en: "Training Centers", ru: "Учебные центры" },
  "home.partners.companies": { hy: "Ընկերություններ", en: "Companies", ru: "Компании" },
  "home.partners.organizations": { hy: "Կազմակերպություններ", en: "Organizations", ru: "Организации" },
  "home.photoPlaceholder": { hy: "Ավելացրեք լուսանկար ադմինում", en: "Add photo in admin", ru: "Добавьте фото в админке" },

  "about.heading": { hy: "Իմ մասին", en: "About", ru: "Обо мне" },
  "about.skills": { hy: "Հմտություններ", en: "Skills", ru: "Навыки" },
  "about.education": { hy: "Կրթություն", en: "Education", ru: "Образование" },
  "about.present": { hy: "ներկա", en: "present", ru: "наст. время" },

  "projects.heading": { hy: "Նախագծեր", en: "Projects", ru: "Проекты" },
  "projects.lead": {
    hy: "Հետազոտական գործիքակազմ, կիրառական AI համակարգեր և ուսանողների ու գործընկերների հետ ստեղծված ծրագրեր։",
    en: "Research toolkits, applied AI systems, and software built with students and partners.",
    ru: "Исследовательские инструменты, прикладные ИИ-системы и ПО, созданное со студентами и партнёрами.",
  },
  "projects.back": { hy: "← Նախագծեր", en: "← Projects", ru: "← Проекты" },
  "projects.visit": { hy: "Բացել նախագիծը", en: "Visit project", ru: "Открыть проект" },
  "projects.source": { hy: "Սկզբնական կոդ", en: "Source code", ru: "Исходный код" },
  "projects.notFound": { hy: "Նախագիծը չի գտնվել", en: "Project not found", ru: "Проект не найден" },
  "projects.backList": { hy: "Վերադառնալ նախագծերին", en: "Back to projects", ru: "К проектам" },
  "projects.loadError": { hy: "Չհաջողվեց բեռնել նախագիծը", en: "Couldn't load project", ru: "Не удалось загрузить проект" },

  "courses.heading": { hy: "Դասընթացներ", en: "Courses", ru: "Курсы" },
  "courses.lead": {
    hy: "Ուսումնական ուղիներ AI-ի, տվյալների գիտության և ծրագրավորման ոլորտներում։",
    en: "Curated learning paths in AI, Data Science, and Software Engineering.",
    ru: "Подобранные программы по ИИ, Data Science и разработке ПО.",
  },
  "courses.empty": { hy: "Դասընթացներ դեռ չկան։", en: "No courses yet.", ru: "Курсов пока нет." },

  "blog.heading": { hy: "Բլոգ", en: "Blog", ru: "Блог" },
  "blog.empty": { hy: "Դեռ գրառումներ չկան։", en: "No posts yet.", ru: "Записей пока нет." },
  "blog.back": { hy: "← Բլոգ", en: "← Blog", ru: "← Блог" },
  "blog.notFound": { hy: "Գրառումը չի գտնվել", en: "Post not found", ru: "Запись не найдена" },
  "blog.backList": { hy: "Վերադառնալ բլոգին", en: "Back to blog", ru: "К блогу" },
  "blog.loadError": { hy: "Չհաջողվեց բեռնել գրառումը", en: "Couldn't load post", ru: "Не удалось загрузить запись" },

  "contact.heading": { hy: "Կապ", en: "Get in touch", ru: "Связаться" },
  "contact.lead": {
    hy: "Համագործակցության, ելույթների, մենթորության կամ պարզապես բարևելու համար։",
    en: "For collaborations, talks, mentorship requests, or to say hello.",
    ru: "Для сотрудничества, докладов, менторства или просто чтобы поздороваться.",
  },
  "contact.name": { hy: "Անուն", en: "Name", ru: "Имя" },
  "contact.email": { hy: "Էլ. փոստ", en: "Email", ru: "Email" },
  "contact.subject": { hy: "Թեմա", en: "Subject", ru: "Тема" },
  "contact.message": { hy: "Հաղորդագրություն", en: "Message", ru: "Сообщение" },
  "contact.send": { hy: "Ուղարկել", en: "Send message", ru: "Отправить" },
  "contact.sending": { hy: "Ուղարկվում է…", en: "Sending…", ru: "Отправка…" },
  "contact.invalid": { hy: "Խնդրում ենք ստուգել դաշտերը։", en: "Please check the form fields.", ru: "Проверьте поля формы." },
  "contact.success": { hy: "Հաղորդագրությունն ուղարկված է։ Շնորհակալություն!", en: "Message sent. Thank you!", ru: "Сообщение отправлено. Спасибо!" },
  "contact.failed": { hy: "Չհաջողվեց ուղարկել։", en: "Couldn't send.", ru: "Не удалось отправить." },

  "video.heading": { hy: "Տեսադասընթացներ", en: "Video Courses", ru: "Видеокурсы" },
  "video.lead": { hy: "Դիտեք ամբողջական դասախոսություններ և սեմինարներ։", en: "Watch full lectures and workshop sessions.", ru: "Полные лекции и записи воркшопов." },
  "video.empty": { hy: "Տեսանյութեր դեռ չկան։", en: "No videos yet.", ru: "Видео пока нет." },

  "talks.heading": { hy: "Ելույթներ և միջոցառումներ", en: "Talks & Events", ru: "Доклады и мероприятия" },
  "talks.empty": { hy: "Ելույթներ դեռ չկան։", en: "No talks listed yet.", ru: "Докладов пока нет." },
  "talks.slides": { hy: "Սլայդեր", en: "Slides", ru: "Слайды" },
  "talks.video": { hy: "Տեսանյութ", en: "Video", ru: "Видео" },

  "companies.heading": { hy: "Ընկերություններ", en: "Companies", ru: "Компании" },
  "companies.lead": { hy: "Կազմակերպություններ, որտեղ եղել եմ հիմնադիր, ղեկավար կամ համագործակցել եմ։", en: "Organizations I've founded, led, or worked with.", ru: "Организации, которые я основал, возглавлял или с которыми сотрудничал." },
  "companies.empty": { hy: "Ընկերություններ դեռ չկան։", en: "No companies yet.", ru: "Компаний пока нет." },
  "companies.visit": { hy: "Բացել կայքը →", en: "Visit website →", ru: "Открыть сайт →" },
  "companies.present": { hy: " — ներկա", en: " — present", ru: " — наст. время" },

  "auth.title": { hy: "Ադմինիստրատորի մուտք", en: "Admin sign in", ru: "Вход администратора" },
  "auth.restricted": { hy: "Սահմանափակ տարածք", en: "Restricted area", ru: "Закрытая зона" },
  "auth.username": { hy: "Օգտանուն", en: "Username", ru: "Имя пользователя" },
  "auth.password": { hy: "Գաղտնաբառ", en: "Password", ru: "Пароль" },
  "auth.signIn": { hy: "Մուտք", en: "Sign in", ru: "Войти" },
  "auth.signingIn": { hy: "Մուտք գործում…", en: "Signing in…", ru: "Вход…" },
  "auth.backHome": { hy: "← Դեպի գլխավոր էջ", en: "← Back to Home Page", ru: "← На главную" },
  "auth.invalid": { hy: "Սխալ օգտանուն կամ գաղտնաբառ", en: "Invalid username or password", ru: "Неверное имя пользователя или пароль" },
};

export function useT() {
  const { lang } = useLang();
  return useMemo(() => (key: string, fallback?: string) => {
    const entry = DICT[key];
    if (!entry) return fallback ?? key;
    return entry[lang] || entry.en || fallback || key;
  }, [lang]);
}
