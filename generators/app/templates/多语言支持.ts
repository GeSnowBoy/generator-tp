export function getLanguage() {
  return navigator.language.includes('zh') ? 'zh' : 'en';
}
// 带ts提示的翻译
export function transform<T extends { [D: string]: string[] }>(
  languagePackage: T
) {
  let defaultIndex = getLanguage() == 'zh' ? 0 : 1;

  return function<TT extends { [D: string]: string[] }>(
    appendLanguagePackage: TT,
    languageIndex?: number
  ): (key: keyof T | keyof TT) => string {
    appendLanguagePackage = {
      ...languagePackage,
      ...appendLanguagePackage
    };
    let index =
      typeof languageIndex !== 'undefined' ? languageIndex : defaultIndex;
    return (key: any) =>
      (appendLanguagePackage[key] && appendLanguagePackage[key][index]) || key;
  };
}

//  键值: [中文,英文]
let commonTranslations = {
  // 通用
  'common.cancel': ['取消', 'Cancel'],
  'common.ok': ['确认', 'Ok'],
  'common.commit': ['提交', 'Commit'],
  // 菜单
  'menu.product': ['商品', 'Product'],
  'menu.order': ['订单', 'Order'],
  'menu.customer': ['顾客', 'Customer'],
  'menu.store': ['店铺', 'Store']
};
export const _t = transform(commonTranslations);

export default _t;
