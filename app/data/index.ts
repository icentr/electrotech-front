export const COMPANY_PHONE = "+7 (495) 120-04-85";
export const COMPANY_PHONE_NORMALIZED = "+74951200485";
export const COMPANY_ADDRESS = "г. Москва, пр-кт Волгоградский, д. 32, кор 31";
export const COMPANY_EMAIL = "info@icentr.pro";
export const COMPANY_NAME = 'ООО "Инжиниринговый центр Электротехника"';
export const COMPANY_INN = "9701038746";
export const COMPANY_KPP = "772301001";
export const SHORT_NAME = "ИЦ Электротехника";
export const COMPANY_OGRN = "1167746412624";

export const SITE_PRETTY_ADDRESS = "shop-icentr.pro";

type SiteDocument = {
  prettyName: string;
  link: string;
  disabled?: Boolean;
  type: "page" | "file";
};

export const privacyPolycy: SiteDocument = {
  prettyName: "Политика конфиденциальности",
  link: "/docs/privacy-policy",
  type: "page",
};

export const personalDataAgreement: SiteDocument = {
  prettyName: "Согласие на обработку персональных данных",
  link: "/personal-data.pdf",
  type: "file",
};
export const userAgreement: SiteDocument = {
  prettyName: "Пользовательское соглашение",
  link: "/user-agreement.pdf",
  type: "file",
};

export const DOCS: SiteDocument[] = [
  privacyPolycy,
  personalDataAgreement,
  userAgreement,
];
