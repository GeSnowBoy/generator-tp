export function getLanguage() {
  return navigator.language.includes('zh') ? 'zh' : 'en';
}
// 带ts提示的翻译
export function t<T extends { [D: string]: string[] }>(languagePackage: T) {
  let defaultIndex = getLanguage() == 'zh' ? 0 : 1;
  return function<TT extends { [D: string]: string[] }>(
    appendLanguagePackage: TT = {} as any,
    languageIndex?: number,
  ): (key: keyof T | keyof TT) => string {
    let index =
      typeof languageIndex !== undefined ? languageIndex : defaultIndex;
    return key =>
      appendLanguagePackage[key as keyof TT][index] ||
      languagePackage[key as keyof T][index] ||
      'key';
  };
}

//  键值: [中文,英文]
let commonTranslations = {
  'common.cancel': ['取消', 'Cancel'],
  'common.commit': ['提交', 'Commit'],
};

export const _t = t(commonTranslations);
_t()('common.cancel');
