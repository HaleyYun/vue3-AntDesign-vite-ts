<template>
    <div class="canvas-page">
        <div ref="canvasDad" class="canvas-box">
            <canvas style="display: block" :id="drawCanvasClass" :width="csListObj.csWidth" :height="csListObj.csHeight"  :style="{transform : `rotateX(${count}deg)`}"></canvas>
        </div>
    </div>
</template>
<script>
import { reactive, onMounted, toRefs, ref, watch, onUpdated, getCurrentInstance } from "vue";
import { useState } from '@/stores/state';
const setMocaData = useState();

export default {
    /**
     * 组件使用方法（暂无默认配置）
     * 抛出参数
     *  pageIndex  非fixed定位，使用getBoundingClientRect获取距离，页面非当前页面显示元素，导致距离不正确
     *  pencilColor: 画笔颜色
     *  pencilWidth: 画笔粗细
     *  rubberWidth: 橡皮大小
     *  isNeedImg: true, // 是否需要导入图片
        csBgColor: '#ccc', // canvas背景色
        csWidth: 600, // canvas宽
        csHeight: 500, // canvas高
        imgWidth: 300, // 图片宽
        imgHeight: 300, // 图片高
        imgUrla: require('../static/images/1.png'), // 图片路径
        imgX: 10, // 图片横坐标
        imgY: 10, // 图片纵坐标

      抛出方法：（父级组件直接调用即可）
        pencilBtn  开启画笔fcanvasObj
        cancelBtn  开启橡皮擦
        resetCanvas   清空画布
        savePic     将图片保存至本地
        returnBaseUrl 返回图片路径base64地址 console.log( returnBaseUrl() )
     * 
     */
    props: {
        canvasObj:{
            type:Object,
            required:true
        },
        count:{
          type:Number,
          required:true
        }
    },

    setup(props, { emit }) {
        const canvasDad = ref(null);
        const imgDom = ref(null);
        const setAttr = reactive({
            csListObj: {
                pencilColor: "#ea382a",
                pencilWidth: 6,
                rubberWidth: 12,
                csBgColor: "#fff",
                imgX: 0,
                imgY: 0,
                isNeedImg: false
            },
            drawCanvasClass: 'canvas' + props.canvasObj.pageIndex, // 画板canvas
            concatPicCanvasClass: '', // 合成图片canvas
            showPicUrl: '',
            showPicClass: '',
            isAppendPic: false, // 是否需要图片
            asideIsPicShow: false, // 侧边是否有图片
            picListClass: '',
            setCanvas: null,
            ctx: null,
            canvasBackgroundColor: "#ccc",
            getLeft: 0,
            getTop: 0,
            getCanvasPageIndex: 0,
            pageClientWidth: 0,
            setImgEleUrl: "",
            canvasArr: [],
            isAgainRender: true,
            pageCanvasIndex: 0,
            getPageIndex: 0,
        });
        setAttr.csListObj = { ...setAttr.csListObj, ...props.canvasObj }

        onMounted(() => {
            setAttr.pageClientWidth = document.body.clientWidth; // 获取屏幕宽度
            setAttr.getCanvasPageIndex = props.canvasObj.pageIndex || 0; // 获取当前页面索引
            initCanvas();
        });

        const resizeCanvas = () => {
            // 设置canvas宽高
            setAttr.csListObj.csWidth = canvasDad.value.clientWidth;
            setAttr.csListObj.csHeight = canvasDad.value.clientHeight;
        };
        const computedDistance = () => {
            // 计算距离
            let infectDistance = document.getElementById(setAttr.drawCanvasClass).getBoundingClientRect().left
            return infectDistance;
        };
        const computedDistance2 = () => {
            // 计算距离
            let infectDistance = document.getElementById(setAttr.drawCanvasClass).getBoundingClientRect().top
            return infectDistance;
        };

        const initCanvas = async () => {
            // 初始化canvas
            await resizeCanvas();
            setAttr.setCanvas = document.getElementById(setAttr.drawCanvasClass)
            // 获取当前CAVAS元素距离顶部与左边距离，否则开始画笔处为页面像素位置
            setAttr.getLeft = parseInt(setAttr.setCanvas.getBoundingClientRect().left);
            setAttr.getTop = parseInt(setAttr.setCanvas.getBoundingClientRect().top);
            let getCanvasWidth =
                document.getElementById(setAttr.drawCanvasClass).clientWidth;
            let getCanvasHeight =
                document.getElementById(setAttr.drawCanvasClass).clientHeight;
            setAttr.ctx = setAttr.setCanvas.getContext("2d");

            setAttr.ctx.translate(getCanvasWidth, getCanvasHeight)
            setAttr.ctx.rotate(Math.PI)
            setAttr.ctx.fillStyle = setAttr.csListObj.csBgColor;
            setAttr.ctx.fillRect(
                0,
                0,
                setAttr.csListObj.csWidth,
                setAttr.csListObj.csHeight
            );
        };
        const draw = (strokeStyle, size) => {
            // 划线部分
            setAttr.setCanvas.ontouchstart = (e) => {
                const x1 = e.changedTouches[0].clientX;
                const y1 = e.changedTouches[0].clientY - setAttr.getTop;
                setAttr.ctx.lineWidth = size;
                setAttr.ctx.beginPath();
                setAttr.setCanvas.ontouchmove = (e) => {
                    let x2 = e.changedTouches[0].clientX - computedDistance();
                    const y2 = e.changedTouches[0].clientY - setAttr.getTop;
                    setAttr.ctx.lineTo(x2, y2);
                    setAttr.ctx.strokeStyle = strokeStyle;
                    setAttr.ctx.stroke();
                };
                setAttr.setCanvas.ontouchend = () => {
                    setAttr.ctx.closePath();
                    setAttr.setCanvas.onmousemove =
                        setAttr.setCanvas.onmouseup = null;
                };
            };
        };

        const returnBaseUrl = async () => { // 保存画板
            const canvasDom = document.getElementById(setAttr.drawCanvasClass); //获取canvas DOM对象
            if (!setAttr.isAppendPic) { // 是否插入图片
                const imageData = canvasDom.toDataURL("image/png"); //返回base64的URL
                // console.log(imageData);
                // resetCanvas()
                setAttr.isAgainRender = false
                return imageData;
            } else {
                let imageData = await concatPicture();
                setAttr.isAgainRender = false
                console.log(imageData)
                return imageData
            }
        };
        const returnBaseUrl2 = () => {
            // 获取当前画板画出的笔迹
            return new Promise((resolve, reject) => {
                const canvasDom = document.getElementById(setAttr.drawCanvasClass)  //获取canvas DOM对象
                const imageData = canvasDom.toDataURL("image/png"); //返回base64的URL
                resolve(imageData);
            });
        };
        const concatPicture = () => {
            // 合成图片(拼接图片以及画出的笔迹图片)
            return new Promise((resolve, reject) => {
                returnBaseUrl2().then((url) => {
                    // CSS图片的真实高度
                    let getPicWidth = document.getElementsByClassName('bb' + setAttr.csListObj.pageIndex)[0].clientWidth;
                    let getPicHeight = document.getElementsByClassName('bb' + setAttr.csListObj.pageIndex)[0].clientHeight;

                    // 获取canvas的真实高度
                    let getCanvasWidth =
                        document.getElementById(setAttr.concatPicCanvasClass).clientWidth;
                    let getCanvasHeight =
                        document.getElementById(setAttr.concatPicCanvasClass).clientHeight;
                    // 计算图片居中坐标
                    let setImgX = (getCanvasWidth - getPicWidth) / 2;
                    let setImgY = (getCanvasHeight - getPicHeight) / 2;
                    const getConcatPic = document.getElementById(setAttr.concatPicCanvasClass);
                    const ctxa = getConcatPic.getContext("2d");
                    ctxa.translate(getCanvasWidth, getCanvasHeight)
                    ctxa.rotate(Math.PI)
                    ctxa.fillStyle = "#ccc";
                    ctxa.fillRect(
                        0,
                        0,
                        setAttr.csListObj.csWidth,
                        setAttr.csListObj.csHeight
                    );
                    let userImg = new Image(); // 用户画出来的图片
                    let setImg = new Image(); // 原本插入的图片
                    userImg.src = url;
                    userImg.onload = () => {
                        ctxa.drawImage(
                            userImg,
                            0,
                            0,
                            setAttr.csListObj.csWidth,
                            setAttr.csListObj.csHeight
                        );
                        setImg.onload = () => {
                            ctxa.drawImage(
                                setImg,
                                setImgX,
                                setImgY,
                                getPicWidth,
                                getPicHeight
                            );
                            const getConcatPic = document.getElementById(setAttr.concatPicCanvasClass);
                            const imageData = getConcatPic.toDataURL("image/png"); //返回base64的URL
                            resolve(imageData);
                        };
                        setImg.setAttribute("crossOrigin", "anonymous");
                    };
                    userImg.setAttribute("crossOrigin", "anonymous");
                });
            });
        };

        const pencilBtn = (penColor) => {
            // 画笔
            let strokeStyle = penColor
                ? penColor
                : setAttr.csListObj.pencilColor;
            draw(strokeStyle, setAttr.csListObj.pencilWidth);
        };

        const cancelBtn = () => {
            // 橡皮擦
            let strokeStyle = setAttr.csListObj.csBgColor; // canvas背景底色
            draw(strokeStyle, setAttr.csListObj.rubberWidth);
        };

        const resetCanvas = (url) => {
            // 还原画布
            let w = setAttr.csListObj.csWidth;
            let h = setAttr.csListObj.csHeight;
            setAttr.ctx.fillStyle = setAttr.csListObj.csBgColor;
            setAttr.ctx.fillRect(
                0,
                0,
                setAttr.csListObj.csWidth,
                setAttr.csListObj.csHeight
            );
            setAttr.isAgainRender = true
        };
        const savePic = () => {
            // 保存图片
            const canvasDom = document.querySelector(
                "." +
                document.getElementsByTagName("canvas")[
                    setAttr.csListObj.pageIndexa - 1
                ].className
            ); //获取canvas DOM对象
            const imageData = canvasDom.toDataURL("image/png"); //返回base64的URL
            const elink = document.createElement("a");
            elink.download = "图片";
            elink.style.display = "none";
            elink.href = imageData;
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); //释放URL对象
            document.body.removeChild(elink);
        }

        const imageUrlToBase64 = (img) => {
            let image = new Image();
            let dataURL = "";
            //解决跨域问题
            image.setAttribute("crossOrigin", "anonymous");
            let imageUrl = img;
            image.src = imageUrl;
            //image.onload为异步加载
            image.onload = () => {
                let canvas = document.createElement("canvas");
                canvas.width = image.width;
                canvas.height = image.height;
                let context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                let quality = 0.8;
                //这里的dataurl就是base64类型
                dataURL = canvas.toDataURL("image/jpeg", quality); //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
                // console.log(dataURL);//dataURL就是转好的base64编码
            };
        };

        return {
            imgDom,
            concatPicture,
            canvasDad,
            returnBaseUrl,
            savePic,
            pencilBtn,
            resetCanvas,
            cancelBtn,
            ...toRefs(setAttr),
        };
    },
    methods: {},
};
</script>
<style scoped>
.canvas-page,
.canvas-box {
    width: 100%;
    height: 100%;
}
.mycanvas {
    width: 100%;
    height: 100%;
    display: block;
}
.img-css {
    width: 90%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 2;
}
#concatPic {
    position: fixed;
    left: 0;
    top: 0;
    z-index: -1;
    opacity: 0;
}
</style>