// 根据图片URL获取图片文件
export function imgUrlToFile(url, watermarker, filename = 'a') {
    return new Promise(resolve => {
        const image = new Image();
        //如果图片url是网络url，要加下一句代码，解决跨域
        image.crossOrigin = "*";
        image.onload = function () {
            const dataUrl = imgToDataURL(image, watermarker);
            const imgFile = dataURLToFile(dataUrl, filename);
            resolve(imgFile)
        };
        image.src = url;
    })

}

// 将img经过canvas绘图后输出为dataURL
export function imgToDataURL(img, watermarker = '我是一段水印') {
    const { width, height } = img;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    ctx.fillStyle = 'red';
    ctx.font = '50px sans-serif';
    ctx.fillText(watermarker, 100, 100);
    const ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
    const type = `image/${ext}`
    const dataURL = canvas.toDataURL(type);
    return dataURL
}

// 将dataURL转换成file文件
export function dataURLToFile(dataurl, filename) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

// file或blob转img标签
export function fileOrBlobToImg(blob) {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            let img = new Image();
            img.src = reader.result;
            img.addEventListener('load', () => resolve(img));
        });
        reader.readAsDataURL(blob);
    });
}