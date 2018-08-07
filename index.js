var phantom = require('phantom');
var express = require('express');
const path = require('path')
const fs = require('fs')
var app = express();
let phantomPage

app.use(express.static(path.join(__dirname, 'public')))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world')
})

app.get('/html_to_jpg', async function(req, res) {
    // let html = req.query.html
    let html = '<p>这是第1段</p><p>这是第2段</p>'
    let fileName = await htmlToJpg(html)
    console.log(req)
    let url = `<img src="/tmp/${fileName}">`
    res.send(url)
})

app.post('/html_to_jpg', async function(req, res) {
    // let html = req.body.html
    let html = '<p>这是第1段</p><p>这是第2段</p>'
    let fileName = await htmlToJpg(html)
    console.log(req)
    let url = `<img src="/tmp/${fileName}">`
    res.send(url)
})

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log('Example app listening at http://%s:%s', host, port);
})

let html= `<div class="article-body"><div class="article-content"><p>7月份，小米Max 3和荣耀Note 10这两款巨屏手机先后发布。它们的主打卖点都包含超大尺寸屏幕和超大容量电池，但还是有很多不同之处。</p><p><br></p><p>现在，小雷已经拿到了这两款手机，一起来看下它们之间的对决吧。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/0537ec2521a440e8920082dd78b8343d.JPG" title="" alt="DSC04396.JPG"></p><p><br></p><h3>外观设计</h3><p><br></p><p>在刘海屏潮流席卷全球的情况下，小米Max 3和荣耀Note 10还是采用了额头下巴缩窄的全面屏设计，它们的屏占比分别为85%和87%。从正面视觉效果来看，二者的差异不是很大。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/7a354d06d80e45d183b4b60d5adc42e6.JPG" title="" alt="DSC04394.JPG"></p><p><br></p><p>在机身背部，两款手机的后置双摄都为竖直排列。不过，小米Max 3采用的是小米手机产品线中非常常见的红绿灯设计，两颗摄像头和居中的闪光灯组合在一起。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/c4d4cc293ff6496c9ce750522464817e.JPG" title="" alt="DSC04386.JPG"></p><p><br></p><p>小米Max 3采用的是金属材质，机身上下两端分布着U型天线条；荣耀Note 10则是2.5D玻璃机身。就小雷个人的眼光来看，颜值方面荣耀Note 10更胜一筹。</p><p><br></p><p>小米Max 3的机身重量为221g，厚度为7.99mm；荣耀Note 10重量为230g，厚度为7.65mm。这两款产品都比一般的手机要重，拿在手里沉甸甸的。小米Max 3两侧做了收窄处理，看起来比较薄，其实它是要比荣耀Note 10略厚的。手感方面，荣耀Note 10会稍好些，小米Max 3的边框略有些割手。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/a51ad54cf222456f8a84218810f6afda.JPG" title="" alt="DSC04389.JPG"></p><p><br></p><h3>性能</h3><p><br></p><p>小米Max 3和荣耀Note 10是两款定位很不一样的产品，前者处在2000元以下的价位，主打中端市场；后者起售价接近3000元，定位旗舰。因此，在处理器方面，骁龙636和麒麟970的性能差距比较大。</p><p><br></p><p>在安兔兔跑分中，小米Max 3的成绩为118749，荣耀Note 10为207101，差距非常明显。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/5f3d4fa5c3f24cd199646340b2db0215.jpeg" title="" alt="IMG_4DDBE86110B5-1.jpeg"></p><p><br></p><p>在GPU子项方面，差距进一步拉大，小米Max 3得成绩为21168，荣耀Note 10为75765。</p><p><br></p><p>当然，跑分只是一个理论值，性能差距最终体现在实际体验中才会有意义。在绝地求生：刺激战场中，<strong>小米Max 3画质最多只能开到高清、帧数只能设置为高。实际运行中，最高帧率只有30帧。</strong></p><p><br></p><p><img src="http://img.leikeji.com/resource/img/ea5045044ad54bc5be481b407f4861fe.png" title="" alt="WechatIMG168.png"></p><p><br></p><p>不过，得益于骁龙636的低功耗和低发热，在性能的持续输出方面表现得相当不错，手机基本不会发热，帧率也比较稳定。<br></p><p><br></p><p style="text-align: center;"><img src="http://img.leikeji.com/resource/img/995d5cdb43b54ee6873d57bf5f785ae1.gif" title="" alt="video2gif_20180806_170644.gif"></p><p><br></p><p>得益于麒麟970处理器、CPU Turbo和GPU Turbo技术的加持，荣耀Note 10玩刺激战场时，画质最高可以设置<strong>为HDR高清、流畅画质下帧数可以设置为超高60帧</strong>。荣耀Note 10还加入了THE NINE液冷散热技术，保证手机性能输出的稳定性。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/73993443510143298970e0712f534f51.jpeg" title="" alt="IMG_4F51F0458BD5-1.jpeg"></p><p><br></p><p>从实际体验来看，荣耀Note 10吃鸡时非常流畅，基本不会出现掉帧的情况，画面顺滑度比小米Max 3要更好。</p><p><br></p><p style="text-align: center;"><img src="http://img.leikeji.com/resource/img/dc91cae87cb54455a382bce1bb7606c4.GIF" title="" alt="20180806164335522.GIF"></p><p><br></p><h3>拍照</h3><p><br></p><p>小米Max 3的相机规格和红米Note 5基本一致，是比较典型的千元机配置，后置双摄组合为12MP+5MP，主摄像素面积为1.4μm，f/1.9 光圈，支持Dual PD双核对焦。荣耀Note 10的后置双摄则为24MP+12MP组合，主摄f/1.8光圈。此外，AI算法的加入也是荣耀手机拍照方面的一大特色。</p><p><br></p><p>先来看下白天的表现，这张小米Max 3拍摄的楼房和树木的样张中，解析力很高，色彩还原也比较真实。不过天空部分的色彩层次感没有展现出来。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/3add81383cda4c53a7bf2d505aec73f3.jpeg" title="" alt="WechatIMG166.jpeg"></p><p><br></p><p>同一场景下，荣耀Note 10的样张有很大不同。色彩方面，比较讨好眼球，植物的颜色非常明亮，第一眼看上去非常舒服。画面的整体亮度也有提升，同时也保持了高解析力。天空方面，颜色过渡也会更自然些。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/c13abc843b274f9f9868f16a3962bc88.JPG" title="" alt="IMG_20180806_145038.JPG"></p><p><br></p><p>当然，在颜色调教上过于大胆，有时候也会翻车。下面这组样张中，小米Max 3对绿叶的色彩还原非常到位，但花瓣的颜色就太过寡淡，和肉眼所见差距比较大。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/6faf07ffe2ee4ba8a87da6c4a990dbbb.jpeg" title="" alt="WechatIMG167.jpeg"></p><p><br></p><p>荣耀Note 10比较精准地还原出花瓣的颜色，但对绿叶的颜色处理有些过了。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/ee1bab04d8be435d99d660ff2866917d.JPG" title="" alt="IMG_20180806_145838.JPG"></p><p><br></p><p>夜间环境下，荣耀Note 10的表现要更好些，画面的亮度更高，细节更丰富。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/e5093f66af504e709c8d609a3fe8c63d.jpg" title="" alt="微信图片_20180806235817.jpg"></p><p><img src="http://img.leikeji.com/resource/img/3c43a0dffbc7415ba05b1bc5af1fb545.jpg" title="" alt="微信图片_20180806235913.jpg"></p><p><img src="http://img.leikeji.com/resource/img/1364fa073512478cb18090145e2ecce1.jpg" title="" alt="微信图片_20180807000110.jpg"><br></p><p><img src="http://img.leikeji.com/resource/img/fd9bca10f16c45989796a377a30b2ab4.jpg" title="" alt="微信图片_20180807000141.jpg"></p><p><br></p><p>但总的来说，荣耀Note 10的日间拍照要比小米Max 3更胜一筹。荣耀Note 10拍出来的照片基本可以直接发朋友圈，小米Max 3或许就要再用修图APP处理下。</p><p><br></p><h3>续航和充电</h3><p><br></p><p>小米Max 3的电池容量为5500mAh，荣耀Note 10为5000mAh，在手机产品中都属于巨无霸水平。</p><p><br></p><p>我们使用的还是连续播放在线视频的测试方法，屏幕亮度调到手动一半、插耳机情况下音量调到一半，播放B站1080P视频。<strong>小米Max 3播放1小时视频耗电8%，荣耀Note 10耗电13%。</strong></p><p><br></p><p>充电方面，小米Max 3支持18W快充，荣耀Note 10则支持22.5W快充。</p><p><br></p><p><strong>小米Max 3：从0充到100%需要2小时20分钟，从0开始充半小时，可获得29%的电量。荣耀Note 10：从0充到100%需要1小时50分钟，从0开始充半小时，可获得42%的电量。</strong></p><p><br></p><h3>小结</h3><p><br></p><p>小米Max 3和荣耀Note 10的出现，满足了大家对巨屏和超长续航的需求。但它们的市场定位其实很不一样，目前小米Max 3的起售价为1699元，荣耀Note 10则为2799元。</p><p><br></p><p><img src="http://img.leikeji.com/resource/img/614dfafc2e5441708492aa86a087da4b.JPG" title="" alt="DSC04391.JPG"></p><p><br></p><p>总体而言，荣耀Note 10在性能、拍照、外观方面的表现更能让人满意，是一款超大屏版的旗舰产品。如果，你日常喜欢拍照、玩大型游戏，那么荣耀Note 10会是你的菜。</p><p><br></p><p>小米Max 3则是一款加强版的千元机，性能、外观、拍照相对比较中规中矩，不算太差，但和高端产品还是有差距。当然，作为一款大屏、长续航的娱乐影音手机来说，它是合格的。毕竟不是所有人都对手机有这么高的性能需求，更长的续航反而更实用些。</p><p><br></p><p>那么，在小米Max 3和荣耀Note 10之间，你会选择哪一款呢？</p><p><br></p></div><div class="signature-qr"><img src="http://img.leikeji.com/resource/img/92ab69fb3fb34e879f55375354f3b9ee.png" alt="雷科技"></div><ul class="tag-list"><li class="tag-item"><a href="/tag/articles/荣耀Note 10">荣耀Note 10</a></li><li class="tag-item"><a href="/tag/articles/小米Max 3">小米Max 3</a></li><li class="tag-item"><a href="/tag/articles/荣耀">荣耀</a></li><li class="tag-item"><a href="/tag/articles/小米">小米</a></li><li class="tag-item"><a href="/tag/articles/智能手机">智能手机</a></li></ul></div>`

let start = new Date().getTime()
phantom.create().then(function(ph) {
    console.log('create', (new Date().getTime() - start) + 'ms')
    start = new Date().getTime()
    ph.createPage().then(function(page) {
        // page.open("https://www.leikeji.com/article/19980").then(function(status) {
        //     page.property('viewportSize',{width: 10000, height: 500});
        //     page.render('leikeji.pdf').then(function(){
        //         console.log('Page rendered');
        //         ph.exit();
        //     });
        // });
        console.log('createPage', (new Date().getTime() - start) + 'ms')
        start = new Date().getTime()
        phantomPage = page

        
    })
})


function htmlToJpg(html) {
    return new Promise((resolve, reject) => {
        let template = fs.readFileSync('template.html', 'utf-8')
        template = template.replace('{HTML}', html)
        // console.log(template,replace('{HTML}', html))
        fs.writeFileSync('public/tmp/test.html', template)
        phantomPage.open('public/tmp/test.html').then(function(status) {
            console.log('open', (new Date().getTime() - start) + 'ms')
            console.log(status)
            start = new Date().getTime()
            phantomPage.property('viewportSize', {
                width: 707,
                height: 100
            })
            phantomPage.render('public/tmp/ok.jpg').then(function(){
                console.log('Page rendered')
                console.log('render', (new Date().getTime() - start) + 'ms')
                start = new Date().getTime()
                // ph.exit()
                resolve('ok.jpg')
            })
        })
    })
}