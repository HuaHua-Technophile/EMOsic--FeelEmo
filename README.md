<h1 align="center">🎵 依眸音乐 (EMOusic) 🎵</h1>

<h4 align="center">静心感受深夜里的忧伤 🌙</h4>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Vue.js-4FC08D?style=flat&logo=vue.js" alt="Platform">
  <img src="https://img.shields.io/github/repo-size/HuaHua-Technophile/EMOsic--FeelEmo?style=flat" alt="Repo Size">
  <img src="https://img.shields.io/github/stars/HuaHua-Technophile/EMOsic--FeelEmo?style=flat" alt="GitHub stars">
  <img src="https://img.shields.io/github/forks/HuaHua-Technophile/EMOsic--FeelEmo?style=flat" alt="GitHub forks">
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

1.  **克隆仓库并安装依赖**

    本项目使用 `pnpm` 进行依赖管理，以获得更好的性能和磁盘空间效率。

    ```bash
    git clone https://github.com/HuaHua-Technophile/EMOsic--FeelEmo.git
    cd EMOsic--FeelEmo
    # 如果您尚未安装 pnpm，请先执行： npm install -g pnpm
    pnpm install
    ```

2.  **启动前端服务**

    ```bash
    pnpm serve
    ```

    启动成功后，请记下终端提示的 IP 地址 (例如: `192.168.xxx.xxx`)。

3.  **更新后端 API 地址**

    - 用文本编辑器打开 `src/api/http.js`。
    - 将第 2 步记录的 IP 替换掉默认的 IP。

4.  **安装并启动后端服务**

    ```bash
    # 更新并进入子模块
    git submodule update --init --recursive
    cd api

    # 安装依赖
    pnpm install

    # 启动 API 服务
    node app.js
    ```

5.  **访问项目**
    - 根据第 2 步启动成功后的提示，在浏览器中打开本地访问地址 (通常是 `http://localhost:8080`)。
    - **注意**: 本项目为移动端设计，请在浏览器开发者工具中 (按 F12)，切换到移动设备模拟视图 (Ctrl+Shift+M) 以获得最佳体验。

## 🛠️ 技术栈

<table>
  <tr>
    <td><strong>核心框架</strong></td>
    <td><img src="https://img.shields.io/badge/Vue.js-%5E2.6.14-4FC08D?style=flat&logo=vue.js" alt="Vue.js"> <img src="https://img.shields.io/badge/Vue_Router-%5E3.5.1-4FC08D?style=flat&logo=vue.js" alt="Vue Router"> <img src="https://img.shields.io/badge/Vuex-%5E3.6.2-4FC08D?style=flat&logo=vue.js" alt="Vuex"></td>
  </tr>
  <tr>
    <td><strong>UI 与组件库</strong></td>
    <td><img src="https://img.shields.io/badge/Vant-latest--v2-3295FA?style=flat&logo=vant" alt="Vant"> <img src="https://img.shields.io/badge/Bootstrap-%5E5.3.0--alpha3-7952B3?style=flat&logo=bootstrap" alt="Bootstrap"> <img src="https://img.shields.io/badge/Swiper-%5E9.3.1-6332F6?style=flat&logo=swiper" alt="Swiper"> <img src="https://img.shields.io/badge/Better_Scroll-%5E2.5.1-42b983?style=flat" alt="Better Scroll"></td>
  </tr>
  <tr>
    <td><strong>功能与工具库</strong></td>
    <td><img src="https://img.shields.io/badge/Axios-%5E1.4.0-5A29E4?style=flat&logo=axios" alt="Axios"> <img src="https://img.shields.io/badge/Lodash-%5E4.17.21-3492ff?style=flat&logo=lodash" alt="Lodash"> <img src="https://img.shields.io/badge/ColorThief-%5E2.4.0-e67e22?style=flat" alt="ColorThief"> <img src="https://img.shields.io/badge/Lyric_Parser-%5E1.0.1-c299ff?style=flat" alt="Lyric Parser"> <img src="https://img.shields.io/badge/Vue_QR-%5E4.0.9-4FC08D?style=flat&logo=vue.js" alt="Vue QR"></td>
  </tr>
  <tr>
    <td><strong>数据来源</strong></td>
    <td><a href="https://github.com/Binaryify/NeteaseCloudMusicApi">NeteaseCloudMusicApi</a></td>
  </tr>
</table>

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
