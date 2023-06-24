[![VWNuyE.png](https://i.imgloc.com/2023/05/31/VWNuyE.png)](https://github.com/HuaHua-Technophile/EMOsic--FeelEmo)

<h1 align="center" style="color:pink;font-size:30px;font-weight:bold;">「 依眸音乐(EMOusic) 」</h1>

<h4 align="center" style="color:#ED93AD;">静心感受深夜里的忧伤</h4>

<br />
<br />
<br />
<br />

[🐛 必备依赖](#必备依赖)

[📦 安装并运行](#安装并运行)

[👻 技术栈](#技术栈)

[📖 设计理念](#设计理念)

[📚 功能与特点](#功能与特点)

# 必备依赖

1. 在开始前，请先检查您的电脑是否已经安装了 node.js 环境.
2. 按下<kbd>win</kbd>+<kbd>R</kbd>按键。输入 `cmd`,打开命令终端
3. 在终端中,执行`node -v`,查看 node 版本,若未提示版本号,或版本号提示`<16`,则需安装最新版.若`>16`,则请移步至第 6 步
4. 若 node.js 版本过低,或未安装.则进入[https://nodejs.org/zh-cn](https://nodejs.org/zh-cn)官网,点击下载`长期维护版`.文件下载完毕后双击执行安装.安装过程中一直` next` `下一步 `即可.
5. 安装完毕后,重复第 3 步,查看 node.js 版本号.若`>16`,即可下一步
6. 在命令终端(第 2 步)中执行`Git --version`,若未提示版本号表示未安装.若已安装,则请移步至第 9 步
7. 打开[https://git-scm.com/download/win](https://git-scm.com/download/win),点击安装'Standalone Installer'版本下的 64bit.文件下载完毕后双击执行安装.安装过程中一直` next` `下一步 `即可.
8. 安装完毕后,重复第 6 步,查看 git 版本号.若已安装,即可下一步

# 安装并运行

1. 打开命令终端,执行`git clone https://github.com/HuaHua-Technophile/EMOsic--FeelEmo.git`.将项目克隆至本地
2. 若人在国内,推荐安装'淘宝镜像源'.在命令终端中执行`$ npm install -g cnpm --registry=https://registry.npmmirror.com`即可
3. 在命令终端中执行`cd .\EMOsic--FeelEmo`,移至项目文件夹内(EMOsic--FeelEmo)
4. 在命令终端中执行`cnpm i`或`cnpm install`,使用淘宝镜像源安装项目依赖
5. 在命令终端中执行`npm run serve`,启动服务器(请耐心等待).启动成功后记录下提示的本地 ip 网址(例如:192.168.xxx.xxx).
6. 打开'EMOsic--FeelEmo\src\api\http.js'(用记事本或其他可编辑的软件),将第 5 步记录的网址,替换掉默认的 IP
7. 在命令终端中执行`git submodule update`,因为只有一个子模块,因此直接更新子模块
8. 在命令终端中执行`cd .\api`.然后执行`cnpm i`或`cnpm install`,使用淘宝镜像源安装子项目依赖
9. 在命令终端中执行`node app`或`node app.js`,开启子模块的 api 数据接口
10. 根据第 5 步中,启动完成后在命令行输出的文本提示,打开本地服务器网址[localhost:8080](http://localhost:8080/)。

> 该项目基于移动端设计.请在浏览器中<kbd>右键</kbd>,选择最下方的"检查".然后按下<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>切换至移动端模式.并选择合适的"设备尺寸"(推荐 iPhone XR),然后在右侧'缩放比例'中选择'适合窗口大小'
>
> <div style="display:flex;align-items:center;"><img src="https://i.imgloc.com/2023/05/31/VWgTPv.png"style="width:25%"/><img src="https://i.imgloc.com/2023/05/31/VWg1W3.png"style="width:25%"/><img src="https://i.imgloc.com/2023/05/31/VWgu48.png"style="width:25%"/><img src="https://i.imgloc.com/2023/05/31/VWxZNZ.png"style="width:25%"/></div>

# 技术栈

核心

- ## VUE ^2.6.14
- ## VUE-Router ^3.5.1
- ## VUEX ^3.6.2
- ## axios ^1.4.0(最新)

---

框架

- #### Vant ^2.12.54
- #### Bootstrap ^5.3.0-alpha3(最新)
- #### Swiper ^9.3.1(最新)
- #### Better Scroll ^2.4.2(最新)

---

其他

- ###### Lodash ^4.17.21(最新)
- ###### ColorThief ^2.4.0(颜色计算)
- ###### Lyric Parser ^1.0.1(歌词解析)
- ###### VUE QR ^4.0.9(二维码生成)

---

数据来源

- ###### 网易云 API 接口

# 设计理念

依眸音乐(EMOusic)是我个人开发的一款基于 VUE2 的单页面音乐项目,耗时 14 个夜晚。

依眸音乐的界面设计灵感来源于<span style="color:#00B1D2">酷狗音乐概念版</span>、<span style="color:#81E4BD">QQ 音乐</span>、<span style="color:#FFD700">波点音乐</span>、<span style="color:red">网易云音乐</span>。

emo 一词可以追溯自 1980 年代，美国华盛顿特区开始流行一种叫做「emotional hardcore」（情感化硬核）的音乐类型，当时也被简称为「emocore」或「emo」。这种音乐风格的乐队在表演时，会有自然而然的情绪表现，像是激动、潸然泪下等。后来，emo 也可指情感核音乐迷，他们常追随情感核时尚，典型形象是穿紧身牛仔裤，蓄黑色长发，以冲动、敏感、忧郁为特征。因此，emo 和“丧”、“忧郁”、“伤感”等是划上等号的。由此才引申有“我 emo 了”，“我直接 emo 了”等网络流行语。

网易云音乐以活跃的评论区而出名，而随着现代社会生存压力的不断增大，大量的伤感的短评不断冒出，因此被戏称为“网抑云”（抑郁的抑），慢慢的就演变出了“我 emo 了”这句话。

我的设计理念是想让用户在深夜里，通过音乐来表达和释放自己的情感，无论是快乐、悲伤、孤独还是温暖。因此，“<span style="color:#ED93AD">静心感受深夜里的忧伤</span>”，是非常合适的品牌理念

在这里，会照见自己的生活经历，遇见喜欢的音乐风格，听见打动人心的音乐元素。

软件采用了适配了暗色和亮色两套主题色。深紫色代表着深夜中的孤独，而乳白色则代表着人心的脆弱。

软件在细节处大量应用了非线性过渡，采用了极其灵动的动画效果，使得使用者更加的舒适。

并且，在多处使用了“毛玻璃”效果，以达到视觉上的通透，虚实结合，得到一种轻透高级的美感，并极富层次感，提高界面 UI 的高级感。这也代表着现代社会中，近在眼前却看不透的人心，人心的虚实朦胧不可揣测。

# 功能与特点

- 暗色主题/亮色主题适配。夜间/白日无缝切换
- 精美动效 90%覆盖，精调非线性过渡，纵享德芙般丝滑
- 现代化 UI 设计界面，简约且精致
- 数据与网易云音乐互通，VIP 登陆后会员曲目畅听
- 迷你播放器左右横滑切歌
- 黑胶质感播放器页面，且可左右横滑切换黑胶碟片，努力还原黑胶功放机原汁原味的畅听体验。
- 歌词页面摒弃居中设计，更符合现代人的从左至右阅读习惯。并且向下预览歌词，更符合实际上长时间停留歌词页面的使用场景。
- 点击歌词跳转对应时间点
- 搜索页具有大数据推荐模块，“猜你想搜”，更加懂你的 EMO。
- 伪随机播放，生活就是要“不重复”
- 首页轮播图推荐单曲\专辑、新歌新碟、排行榜、大数据推荐歌单
- 搜索单曲，查看歌手单曲、音乐人翻唱、原创单曲
- 查看他人用户创建歌单、查看官方推荐雷达歌单、查看首页推荐歌单、搜索歌单
- 查看首页推荐专辑、搜索专辑
- 查看歌手、搜索歌手
- 查看用户主页、搜索用户

![VWK7AZ.png](https://i.imgloc.com/2023/06/01/VWK7AZ.png)
![VWKENF.png](https://i.imgloc.com/2023/06/01/VWKENF.png)
![VWKehH.png](https://i.imgloc.com/2023/06/01/VWKehH.png)
![VWKzuQ.png](https://i.imgloc.com/2023/06/01/VWKzuQ.png)
![VWKFHE.png](https://i.imgloc.com/2023/06/01/VWKFHE.png)
![VWKdTP.png](https://i.imgloc.com/2023/06/01/VWKdTP.png)
![VWK5kX.png](https://i.imgloc.com/2023/06/01/VWK5kX.png)
![VWKo9J.png](https://i.imgloc.com/2023/06/01/VWKo9J.png)
![VWKJho.png](https://i.imgloc.com/2023/06/01/VWKJho.png)
![VWKTab.png](https://i.imgloc.com/2023/06/01/VWKTab.png)
![VWK1kq.png](https://i.imgloc.com/2023/06/01/VWK1kq.png)
![VWKYJw.png](https://i.imgloc.com/2023/06/01/VWKYJw.png)
![VWKuAa.png](https://i.imgloc.com/2023/06/01/VWKuAa.png)
![VWLZrx.png](https://i.imgloc.com/2023/06/01/VWLZrx.png)
![VWLtJ5.png](https://i.imgloc.com/2023/06/01/VWLtJ5.png)
![VWLkD8.png](https://i.imgloc.com/2023/06/01/VWLkD8.png)
![VWL03Z.png](https://i.imgloc.com/2023/06/01/VWL03Z.png)
![VWLC5F.png](https://i.imgloc.com/2023/06/01/VWLC5F.png)
![VWLwiH.png](https://i.imgloc.com/2023/06/01/VWLwiH.png)
![VWL2OQ.png](https://i.imgloc.com/2023/06/01/VWL2OQ.png)
![VWLO1C.png](https://i.imgloc.com/2023/06/01/VWLO1C.png)
![VWLj0P.png](https://i.imgloc.com/2023/06/01/VWLj0P.png)
![VWL33c.png](https://i.imgloc.com/2023/06/01/VWL33c.png)
![VWLRSA.png](https://i.imgloc.com/2023/06/01/VWLRSA.png)
![VWLmio.png](https://i.imgloc.com/2023/06/01/VWLmio.png)
![VWLpbN.png](https://i.imgloc.com/2023/06/01/VWLpbN.png)
![VWLxCb.png](https://i.imgloc.com/2023/06/01/VWLxCb.png)
![VWL7Xq.png](https://i.imgloc.com/2023/06/01/VWL7Xq.png)
![VWL63a.png](https://i.imgloc.com/2023/06/01/VWL63a.png)
![VWLFSx.png](https://i.imgloc.com/2023/06/01/VWLFSx.png)
![VWLdVk.png](https://i.imgloc.com/2023/06/01/VWLdVk.png)

<div style="width:100%"><img src="https://i.imgloc.com/2023/05/31/VWrZIC.png" style="width:100%"/></div>
