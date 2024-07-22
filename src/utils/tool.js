const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}.${month}.${day}`;
};

/**
 * 上传文件，浏览器不能直接显示用户计算机上的文件路径
 * File 对象包含了文件的一些基本信息，
 * 调用 createObjectURL(file) 时，创建一个临时的、唯一的URL，这个URL指向浏览器内存中的文件内容。
 * 将这个URL赋值给一个 <img> 或 <video> 标签的 src 属性，浏览器就会从内存中读取文件内容并将其显示出来。
 * @param {*} file 
 * @returns 
 */
const getObjectURL = (file) => {
    console.log(file)
    let url = null;
    if (window.createObjectURL != undefined) {        // basic
        url = window.createObjectURL(file);
    } else if (window.URL != undefined) {   // mozilla(firefox) 
        url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) { // webkit or chrom 
        url = window.webkitURL.createObjectURL(file);
    }
    console.log(url)
    return url;
}

export { formatDate, getObjectURL };
