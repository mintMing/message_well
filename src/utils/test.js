const monitorWindowSizeAndScroll = () => {
    function printWindowSizeAndScroll() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;
        console.log(
            `窗口宽度: ${windowWidth}, 窗口高度: ${windowHeight}, 滚动距离X: ${scrollX}, 滚动距离Y: ${scrollY}`,
        );
    }
    // 在窗口大小改变时打印数据
    window.addEventListener("resize", printWindowSizeAndScroll);

    // 在窗口滚动时打印数据
    window.addEventListener("scroll", printWindowSizeAndScroll);

    // 初始时打印一次数据
    printWindowSizeAndScroll();
};

export { monitorWindowSizeAndScroll };
