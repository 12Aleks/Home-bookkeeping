import M from 'materialize-css'
export default {
    install(Vue) {
        Vue.prototype.$message = function(html) {
            M.toast({ html })
        }
        Vue.prototype.$error = function(html) {
            M.toast({ html: `[Ошибка]: ${html}` })
        }
        Vue.prototype.$styleCorrectly = function(color) {
            console.log(color)
            document.getElementById('test').style.color = color
        }
    }
}