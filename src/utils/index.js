export const  CreateDOM = (dom)=>{
    const DOM = document.createElement('div')
    DOM.setAttribute('id', 'Three')
    DOM.appendChild(dom)
    document.querySelector('#Box')?.appendChild(DOM)
    return DOM
} 