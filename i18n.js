import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector) // 自动检测用户语言
  .use(initReactI18next) // 初始化 i18next
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to Kirori's Website",
          about: "About Me",
          projects: "Projects",
          music: "Music",
          studio: "Studio",
          contact: "Contact",
        },
      },
      ja: {
        translation: {
          welcome: "Kiroriのウェブサイトへようこそ",
          about: "私について",
          projects: "プロジェクト",
          music: "音楽",
          studio: "スタジオ",
          contact: "連絡先",
        },
      },
      zh: {
        translation: {
          welcome: "欢迎来到 Kirori 的网站",
          about: "关于我",
          projects: "项目",
          music: "音乐",
          studio: "录音室",
          contact: "联系方式",
        },
      },
    },
    fallbackLng: "en", // 默认语言
    interpolation: {
      escapeValue: false, // 允许 HTML 标签
    },
  });

export default i18n;
