<h1 align="center">🎵 依眸音乐 (EMOusic) 🎵</h1>

<h4 align="center">静心感受深夜里的忧伤 🌙</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-2.6-4FC08D?style=for-the-badge&logo=vue.js" alt="Vue.js">
  <img src="https://img.shields.io/badge/Vue_Router-3.5-4FC08D?style=for-the-badge&logo=vue.js" alt="Vue Router">
  <img src="https://img.shields.io/badge/Vuex-3.6-4FC08D?style=for-the-badge&logo=vue.js" alt="Vuex">
  <img src="https://img.shields.io/badge/Vant-2.12-3295FA?style=for-the-badge&logo=vant" alt="Vant">
  <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap" alt="Bootstrap">
  <img src="https://img.shields.io/badge/Swiper-9.3-6332F6?style=for-the-badge&logo=swiper" alt="Swiper">
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Node.js-%3E%3D16-339933?style=for-the-badge&logo=nodedotjs" alt="Node.js version">
  <img src="https://img.shields.io/github/stars/HuaHua-Technophile/EMOsic--FeelEmo?style=for-the-badge" alt="GitHub stars">
  <img src="https://img.shields.io/github/forks/HuaHua-Technophile/EMOsic--FeelEmo?style=for-the-badge" alt="GitHub forks">
</p>

## 📖 设计理念

**依眸音乐(EMOusic)** 是我个人开发的一款基于 Vue 2 的单页面音乐项目，耗时 14 个夜晚。

项目的设计灵感来源于 <span style="color:#00B1D2">酷狗音乐概念版</span>、<span style="color:#81E4BD">QQ 音乐</span>、<span style="color:#FFD700">波点音乐</span>、<span style="color:red">网易云音乐</span>。

"emo" 一词源于 80 年代的 "emotional hardcore" 音乐，其特点是充满情感的表达。如今，"emo" 常与“丧”、“忧郁”、“伤感”等情绪关联。我的设计理念是希望用户在深夜里，通过音乐来表达和释放自己的情感。因此，“**<span style="color:#ED93AD">静心感受深夜里的忧伤</span>**”成为了这个项目的品牌理念。在这里，你将照见自己的生活经历，遇见喜欢的音乐风格，听见打动人心的音乐。

软件采用了适配了暗色和亮色两套主题色。深紫色代表着深夜中的孤独，而乳白色则代表着人心的脆弱。在细节处大量应用了非线性过渡与“毛玻璃”效果，以达到视觉上的通透、虚实结合，得到一种轻透高级的美感，并极富层次感，提高界面 UI 的高级感。这也代表着现代社会中，近在眼前却看不透的人心，人心的虚实朦胧不可揣测。

## ✨ 功能特性

- 🎨 **明暗主题**：支持亮色/暗色主题，日夜无缝切换。
- 💃 **精美动效**：90% 覆盖精美动效，精调非线性过渡，纵享丝滑体验。
- 📱 **现代 UI**：简约精致的现代化 UI 设计。
- 🎵 **数据互通**：与网易云音乐数据互通，登录后 VIP 曲目畅听。
- ↔️ **快捷切歌**：迷你播放器支持左右横滑切歌。
- 💿 **黑胶播放页**：质感黑胶播放器，可横滑切换碟片，还原真实体验。
- 🎤 **创新歌词**：歌词页左对齐，更符合阅读习惯，支持点击跳转。
- 🧠 **智能推荐**：搜索页具备“猜你想搜”大数据推荐，更懂你的 EMO。
- 🔀 **伪随机播放**：让你的生活充满“不重复”的惊喜。
- 🔍 **丰富探索**：支持发现、搜索单曲、专辑、歌手、歌单及用户。

## 🚀 快速开始

在开始之前，请确保您的电脑已安装 `Node.js` (版本 >= 16) 和 `Git`。

> 推荐使用 [pnpm](https://pnpm.io/installation) 作为包管理器以获得更快的安装速度。

1.  **克隆仓库**

    ```bash
    git clone https://github.com/HuaHua-Technophile/EMOsic--FeelEmo.git
    cd EMOsic--FeelEmo
    ```

2.  **安装主项目依赖**

    ```bash
    # 使用 npm
    npm install

    # 或者使用 pnpm
    # pnpm install
    ```

3.  **启动前端服务**

    ```bash
    npm run serve
    ```

    启动成功后，请记下终端提示的 IP 地址 (例如: `192.168.xxx.xxx`)。

4.  **更新后端 API 地址**

    - 用文本编辑器打开 `src/api/http.js`。
    - 将第 3 步记录的 IP 替换掉默认的 IP。

5.  **安装并启动后端服务**

    ```bash
    # 更新并进入子模块
    git submodule update --init --recursive
    cd api

    # 安装依赖
    npm install

    # 或者使用 pnpm
    # pnpm install

    # 启动 API 服务
    node app.js
    ```

6.  **访问项目**
    - 根据第 3 步启动成功后的提示，在浏览器中打开本地访问地址 (通常是 `http://localhost:8080`)。
    - **注意**: 本项目为移动端设计，请在浏览器开发者工具中 (按 F12)，切换到移动设备模拟视图 (Ctrl+Shift+M) 以获得最佳体验。

## 🛠️ 技术栈

- **核心**: `Vue 2`, `Vue Router`, `Vuex`, `Axios`
- **UI 框架**: `Vant 2`, `Bootstrap 5`, `Swiper 9`, `Better Scroll 2`
- **其他工具**: `Lodash`, `ColorThief`, `Lyric Parser`, `Vue QR`
- **数据来源**: [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 📁 项目结构

```
.
├── api/                  # NeteaseCloudMusicApi 后端服务 (子模块)
├── public/               # 公共资源
│   └── index.html        # 入口 HTML
├── src/                  # 核心源码
│   ├── api/              # API 请求模块
│   ├── assets/           # 静态资源 (图片、字体、样式)
│   ├── components/       # 公共组件
│   │   └── son/          # 子组件
│   ├── router/           # 路由配置
│   ├── store/            # Vuex 状态管理
│   ├── tool/             # 工具函数
│   └── views/            # 页面视图组件
├── App.vue               # 根组件
└── main.js               # 应用入口文件
```

## 📸 项目预览

<table align="center">
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-43-191f623a93d58da98c.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-46-353e91145f82fa4c05.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-47-317bb61219d3a917af.png" /></td>
    </tr>
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-48-25e2f64c1b9cc230c3.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-49-050a3603d015b850d2.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-49-323d05120350f28f79.png" /></td>
    </tr>
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-50-37cfbf9bc3563f0b80.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-50-5548222a2f8675c303.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-51-3986978bccbd1ee36a.png" /></td>
    </tr>
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-53-192374aa1a916c3929.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-54-057b61237ec41c6156.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-55-0443f067e6c9cec0b5.png" /></td>
    </tr>
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-55-297ed1a65d7111bfde.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-56-186bad6f270e0e0a6b.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-56-3725cf47dd0507d23b.png" /></td>
    </tr>
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-56-559fead382939a8dfa.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-57-25b6cb437a8b0e1fb3.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-57-386f4bb47925af5ffb.png" /></td>
    </tr>
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-58-1594a11b45126c5484.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-59-05cba613e5c70b332b.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-59-279923266741cc564c.png" /></td>
    </tr>
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_09-59-44ae6507b9d4b2b5fc.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_10-00-0593300a7153d6181e.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_10-01-564917fe959bda172b.png" /></td>
    </tr>
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_10-02-44b71a5695636a576d.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_10-03-1053606c2f67ad0a31.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_10-06-401864c0440d12c3bb.png" /></td>
    </tr>
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_10-07-06f98aedff85e9bab6.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_10-07-144f12955b0b5d3efe.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_10-07-54430ec5735ddc7ec1.png" /></td>
    </tr>
    <tr>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_10-09-41364ffceb747aca81.png" /></td>
        <td><img src="https://www.imageoss.com/images/2023/07/31/Snipaste_2023-06-01_10-12-507500f0909b56786e.png" /></td>
        <td></td>
    </tr>
</table>
