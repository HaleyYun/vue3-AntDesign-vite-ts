import { App } from 'vue'
export default (app: App<Element>) => {
    //自定义组件
    app.directive('showClose', (el: HTMLElement,binding:any) => {
        console.log(binding)
        document.body.addEventListener('click',()=>{
            console.log(el);
            el.style.display='none'
        },false);
    });
}