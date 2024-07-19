<template>
    <div class="foot-bar">
        <div class="foot-bar-inner">
            <div class="foot-left">
                <div class="logo">
                    <img
                        class="logo-img"
                        src="@/assets/images/logo.svg"
                        alt="logo"
                    />
                    <p class="logo-name">mint</p>
                </div>
                <p class="top-p">mint 用户交流的留言平台。</p>
                <p class="top-p">
                    一刻时光是本人独自开发的，为便于与用户交流的留言平台。
                    用户将留言便签贴在留言墙上，用户可以自定义便签颜色和内容属性，不仅
                    可以用于交流，也是一场记录。
                </p>
                <p class="state">
                    <span>声明</span>
                    <span>备案/许可证粤ICP备111号</span>
                </p>
            </div>
            <div class="link">
                <p class="title">链接</p>
                <div class="line-inner">
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link-name"
                    >
                        mint
                    </a>
                    <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="link-name"
                    >
                        Github
                    </a>
                </div>
            </div>
            <div class="foot-right">
                <p class="title">联系方式</p>
                <div class="right-inner">
                    <div>
                        <img src="@/assets/images/mint.png" alt="二维码" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup></script>

<style scoped lang="scss">
.foot-bar {
    width: 100%;
    height: 200px;
    background: $gray-1;
    padding: 20px;
    box-sizing: border-box;
    .foot-bar-inner {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        p {
            color: rgba(255, 255, 255, 0.5);
        }
        .foot-left,
        .link,
        .foot-right {
            .title {
                font-size: $size-16;
                padding-bottom: 12px;
            }
        }
        .foot-left {
            .logo {
                display: flex;
                align-items: center;
                margin-bottom: 24px;
                .logo-img {
                    height: 30px;
                    width: 30px;
                }
                .logo-name {
                    font-size: 20px;
                    color: $gray-10;
                    font-weight: 600;
                    padding-left: 10px;
                }
            }
            .top-p {
                font-size: $size-12;
                padding-bottom: 4px;
                width: 400px;
            }
            .state {
                font-size: $size-12;
                padding-top: 26px;
            }
        }

        .link {
            padding: 0 40px;
            flex: 1;
            .line-inner {
                a {
                    color: rgba(255, 255, 255, 0.5);
                    padding-right: 20px;
                    font-size: $size-12;
                }
            }
        }
        .foot-right {
            .right-inner {
                img {
                    width: 100px;
                    padding-right: 40px;
                }
            }
        }
    }
}
</style>
