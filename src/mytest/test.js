export default {
    bind(el, bindings) {
        // el.style.color = 'red'
        const arg = bindings.arg

        el.style[arg] = bindings.value

        const font = bindings.modifiers['font']
        if (font) {
            el.style.fontSize = '30px'
        }
    }
}