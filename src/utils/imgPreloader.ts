// 图片，音频，视频预加载

const imgPreloader = (url: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.onload = () => {
            resolve(null);
        };
        image.onerror = () => {
            reject();
        };
        image.src = url;
    });
};

const audioPreloader = (url: string): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        let audio = new Audio();
        audio.oncanplay = () => {
            resolve(null);
        };
        audio.onerror = () => {
            reject();
        };
        audio.src = url;
        audio.load();
    });
};

// const videoPreloader = (url: string): Promise<string | null> => {
//     return new Promise((resolve, reject) => {
//         const video = document.createElement('video');
//         video.autoplay = true;
//         video.muted = true;
//         video.oncanplay = () => {
//             resolve(null);
//         };
//         video.onerror = () => {
//             reject();
//         };
//         video.src = url;
//         video.preload = 'auto';
//         video.load();
//     });
// };

// imgs -- 数组图片列表
export const imgsPreloader = (imgs: string[]) => {
    let promiseArr: Promise<string | null>[] = [];
    imgs.forEach(element => {
        let fileType = element.split('.').pop();
        switch (fileType) {
            case 'mp3':
                promiseArr.push(audioPreloader(element));
                break;
            case 'mp4':
                // promiseArr.push(videoPreloader(element));
                break;
            case 'png':
                promiseArr.push(imgPreloader(element));
                break;
            case 'jpg':
                promiseArr.push(imgPreloader(element));
                break;
            case 'gif':
                promiseArr.push(imgPreloader(element));
                break;
            case 'jpeg':
                promiseArr.push(imgPreloader(element));
                break;
            default:
                break;
        }
    });
    return Promise.all(promiseArr);
};