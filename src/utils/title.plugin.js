import localizeFilter from "../filter/localize.filter";

export default {
  install(Vue){
    Vue.prototype.$title = function (titleKey) {
        const appName = process.env.VUE_APP_TITLE
        return `${localizeFilter(titleKey)} | ${appName}`
    }
  }
}
