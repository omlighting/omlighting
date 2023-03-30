var viceVersion, wenti, huoxinmain;
var viceVersionGetErr, wentiGetErr, huoxinmainGetErr; var date = new Date(),
    nowCoin,//币数量
    storage = storages.create("huobichat"),//储存
    xiaoxiNum = 100;
var yanChi
var intGetPopularityDate=0   //当天是否采集过声望
var intJoinAllGroupDate=0    //当天是否遍历加过所有社群
var intRandomStart=0,intRandomOver=0
var intRS1=1,intRO1=10,intRS2=11,intRO2=50

var 红包探测时间开始,红包探测时间结束
var 减少被踢
var 防踢静默时间开始,防踢静默时间结束
var 看信息,加新群,退废群,看行情,看友圈,看资讯,看快讯,看学堂,看活动,看商城,加好友,清聊天
var 加群最低人数
var 退群发言终期
var 转币集中,接币主号,交易密码
var 减少断流,发信息群
var 每天采集,是否贡献,贡献群名
var 本地火信参数 = storages.create("火信参数设置");
var 参数数组=new Array(),参数临时存放

//******************************************* */
//换头像中使用
var intIconFolderX=[200,550]
var intIconFolderY=[350,690,1030]
var intIconX=[125,355,585]
var intIconY=[285,525,765,1010,1250]
var strTempUserName=""
var strOurGroupName="龘靐齉齾爩"
var blnGetRedPackFlag=false;

var strUserName=new Array()
var fileUserName=open("/storage/emulated/0/HuoxinUserName.txt","r")
strUserName=fileUserName.readlines()
fileUserName.close()
//******************************************* */

//安卓版本适配
if (device.sdkInt < 24) {
    n = 5
    var ra = new RootAutomator(),
        // sh = new Shell(true),
        sPress = ra.press,
        sSwipe = ra.swipe;
    events.on('exit', function () {
        ra.return;
    });
}
else {
    yanChi = 0 * 1000
    n = 0
    var sPress = press,
        sSwipe = swipe;
}
//参数设置
device.setBrightnessMode(0); device.setBrightness(0);//亮度调节
device.keepScreenOn(60 * 60000)//屏幕常亮
if (!files.exists("/storage/emulated/0/ErrorRecord.txt")) files.create("/storage/emulated/0/ErrorRecord.txt");//故障文档

if(本地火信参数.get("红包探测时间开始11",false)==false) {
    for(var i=0;i<10;i++) {
       var 参数临时存放=http.get("https://gitee.com/liangchaoping/HuoxinChat/raw/master/huobiConfig");//get版本信息
       if(参数临时存放.statusCode >= 200 && 参数临时存放.statusCode < 300) {
         参数数组=参数临时存放.body.string().split("\n")
         toast(参数数组)
         sleep(5000)
         红包探测时间开始=参数数组[1].split("=")[1].split("-")[0]
         红包探测时间结束=参数数组[1].split("=")[1].split("-")[1]
         减少被踢=参数数组[2].split("=")[1]
         防踢静默时间开始=参数数组[4].split("=")[1].split("-")[0]
         防踢静默时间结束=参数数组[4].split("=")[1].split("-")[1]
         看信息=参数数组[6].split("=")[1]
         加新群=参数数组[7].split("=")[1]
         退废群=参数数组[8].split("=")[1]
         看行情=参数数组[9].split("=")[1]
         看友圈=参数数组[10].split("=")[1]
         看资讯=参数数组[11].split("=")[1]
         看快讯=参数数组[12].split("=")[1]
         看学堂=参数数组[13].split("=")[1]
         看活动=参数数组[14].split("=")[1]
         看商城=参数数组[15].split("=")[1]
         加好友=参数数组[16].split("=")[1]
         清聊天=参数数组[17].split("=")[1]
         加群最低人数=参数数组[19].split("=")[1]
         退群发言终期=参数数组[21].split("=")[1]
         转币集中=参数数组[23].split("=")[1]
         接币主号=参数数组[24].split("=")[1]
         交易密码=参数数组[25].split("=")[1]
         减少断流=参数数组[27].split("=")[1]
         发信息群=参数数组[28].split("=")[1]
         每天采集=参数数组[30].split("=")[1]
         是否贡献=参数数组[31].split("=")[1]
         贡献群名=参数数组[32].split("=")[1]
 
         //将设置参数写入本地
         本地火信参数.put("红包探测时间开始",红包探测时间开始)
         本地火信参数.put("红包探测时间结束",红包探测时间结束)
         本地火信参数.put("减少被踢",减少被踢)
         本地火信参数.put("防踢静默时间开始",防踢静默时间开始)
         本地火信参数.put("防踢静默时间结束",防踢静默时间结束)
         本地火信参数.put("看信息",看信息)
         本地火信参数.put("加新群",加新群)
         本地火信参数.put("退废群",退废群)
         本地火信参数.put("看行情",看行情)
         本地火信参数.put("看友圈",看友圈)
         本地火信参数.put("看资讯",看资讯)
         本地火信参数.put("看快讯",看快讯)
         本地火信参数.put("看学堂",看学堂)
         本地火信参数.put("看活动",看活动)
         本地火信参数.put("看商城",看商城)
         本地火信参数.put("加好友",加好友)
         本地火信参数.put("清聊天",清聊天)
         本地火信参数.put("加群最低人数",加群最低人数)
         本地火信参数.put("退群发言终期",退群发言终期)
         本地火信参数.put("转币集中",转币集中)
         本地火信参数.put("接币主号",接币主号)
         本地火信参数.put("交易密码",交易密码)
         本地火信参数.put("交易密码",交易密码)
         本地火信参数.put("减少断流",减少断流)
         本地火信参数.put("发信息群",发信息群)
         本地火信参数.put("每天采集",每天采集)
         本地火信参数.put("是否贡献",是否贡献)
         本地火信参数.put("贡献群名",贡献群名)
         break;
       }
     }
  }
 else {
    红包探测时间开始=本地火信参数.get("红包探测时间开始",false)
    红包探测时间结束=本地火信参数.get("红包探测时间结束",false)
    减少被踢=本地火信参数.get("减少被踢",false)
    防踢静默时间开始=本地火信参数.get("防踢静默时间开始",false)
    防踢静默时间结束=本地火信参数.get("防踢静默时间结束",false)
    看信息=本地火信参数.get("看信息",false)
    加新群=本地火信参数.get("加新群",false)
    退废群=本地火信参数.get("退废群",false)
    看行情=本地火信参数.get("看行情",false)
    看友圈=本地火信参数.get("看友圈",false)
    看资讯=本地火信参数.get("看资讯",false)
    看快讯=本地火信参数.get("看快讯",false)
    看学堂=本地火信参数.get("看学堂",false)
    看活动=本地火信参数.get("看活动",false)
    看商城=本地火信参数.get("看商城",false)
    加好友=本地火信参数.get("加好友",false)
    清聊天=本地火信参数.get("清聊天",false)
    加群最低人数=本地火信参数.get("加群最低人数",false)
    退群发言终期=本地火信参数.get("退群发言终期",false)
    转币集中=本地火信参数.get("转币集中",false)
    接币主号=本地火信参数.get("接币主号",false)
    交易密码=本地火信参数.get("交易密码",false)
    交易密码=本地火信参数.get("交易密码",false)
    减少断流=本地火信参数.get("减少断流",false)
    发信息群=本地火信参数.get("发信息群",false)
    每天采集=本地火信参数.get("每天采集",false)
    是否贡献=本地火信参数.get("是否贡献",false)
    贡献群名=本地火信参数.get("贡献群名",false)
 }

// for (var i = 0; i < 10; i++) {
//     viceVersion = http.get("https://code.aliyun.com/auto_js/huobichat/raw/master/vice_version");//get版本信息
//     if (viceVersion.statusCode >= 200 && viceVersion.statusCode <= 300) {
//         viceVersion = viceVersion.body.string();
//         viceVersionGetErr = false;
//         break;
//     }
//     else { viceVersionGetErr = true; toastLog("get版本失败\n10秒钟后重试"); sleep(10000); }
// }
// if (!viceVersionGetErr) {
//     if (viceVersion > storage.get("viceVersion", "0")) {
//         for (var i = 0; i < 10; i++) {
//             toastLog("更新副代码");
//             huoxinmain = http.get("https://code.aliyun.com/auto_js/huobichat/raw/master/huochatmain.js");
//             wenti = http.get("https://code.aliyun.com/auto_js/huobichat/raw/master/wenTi.js");
//             if (huoxinmain.statusCode >= 200 && huoxinmain.statusCode < 300 && wenti.statusCode >= 200 && wenti.statusCode < 300) {
//                 huoxinmain = huoxinmain.body.string();
//                 wenti = wenti.body.string();
//                 storage.put("viceVersion", viceVersion);
//                 storage.put("huoxinmain", huoxinmain);
//                 storage.put("wenti", wenti);
//                 wentiGetErr = huoxinmainGetErr = false;
//                 break;
//             }
//             else { wentiGetErr = huoxinmainGetErr = true; toastLog("get代码失败\n10秒钟后重试"); sleep(10000); }
//         }
//     }
// }
// if ((wentiGetErr || huoxinmainGetErr || viceVersionGetErr) && (storage.get("viceVersion", null) === null || storage.get("huoxinmain", null) === null || storage.get("wenti", null) === null)) { toastLog("获取版本信息或更新代码失败\n退出脚本"); return; }
// else if (wentiGetErr || huoxinmainGetErr || viceVersionGetErr) toastLog("获取版本信息或更新代码失败\n使用老版本");
// toastLog("vice_Version:" + viceVersion)

while (true) {
    let threadsMain = threads.start(main);;//启动主程序线程
    sleep(2000);//等待启动线程
    threadsMain.waitFor();
    id("com.huochat.im:id/tv_receive_btn").waitFor();//红包界面阻塞
    if (threadsMain.isAlive()) threadsMain.interrupt();//停止主程序线程
    let threadsWenTi = threads.start(wenTi);//启动回答问题线程
    sleep(2000);
    threadsWenTi.waitFor();
    threadsWenTi.join(60000);//等待线程执行完成
}

function formatTime() {
    var year = date.getFullYear();
    var month = date.getMonth() + 1, month = month < 10 ? '0' + month : month;
    var day = date.getDate(), day = day < 10 ? '0' + day : day;
    return year + '-' + month + '-' + day;
}
function backTime(a) {
    if (typeof (a) == "number") {
        date.setDate(date.getDate() - a);
        var backtime = formatTime(date);
        date.setDate(date.getDate() + a);
        return backtime;
    }
}
function backHome(num) {
    while (!id("com.huochat.im:id/ll_navi_me").exists()) {
        if (!packageName("com.huochat.im").exists()) {
            if (launch("com.huochat.im")) { 
                if(id("org.codeaurora.gallery:id/action_cancel").exists()||id("org.codeaurora.gallery:id/filtershow_done").exists()) {
                    toast("检测到了头像更新改失败！")
                    sleep(1500)
                    back()
                    sleep(1500)
                }
                toastLog("回到火信"); 

                sleep(20 * 1000); } 
            else toastLog("打开火信失败");
        }
        else if (id("com.huochat.im:id/tv_receive_btn").findOne(5000) === null && id("com.huochat.im:id/ll_navi_me").findOne(5000) === null && packageName("com.huochat.im").findOne(5000) !== null) {
            back();
            if(id("com.huochat.im:id/tv_cancel").exists()&&id("com.huochat.im:id/tv_confirm").exists()) {
                id("com.huochat.im:id/tv_cancel").findOne(2000).click()
                sleep(1500)
            }
            toastLog("返回");
            sleep(1000)
        }
        else return false
    }
    if (num === 4) {
        if (!id("com.huochat.im:id/ll_navi_me").findOne(5000).click()) return false
    }
    else if (num === 3) {
        if (!id("com.huochat.im:id/ll_navi_finds").findOne(5000).click()) return false
    }
    else if (num === 2) {
        if (!id("com.huochat.im:id/ll_navi_contacts").findOne(5000).click()) return false
    }
    else if (num === 1) {
        if (!id("com.huochat.im:id/ll_navi_chats").findOne(5000).click()) return false
    } return true
}
function getCoinSize() {
    let coin = 0, i = 0;
    const DATE = formatTime();
    if (backHome(4)) {
        do {
            coin = id("com.huochat.im:id/tv_total_assets").findOne(5000).text().replace(/[^\d\.]/g, '');
            coin = parseInt(Number(coin));
            sleep(1000); i++;
        } while (coin === 0 && i < 10);
        while (storage.get("Coin" + DATE, 0) !== coin) {
            storage.put("Coin" + DATE, coin);
            sleep(1000)
        }
        storage.remove("Coin" + backTime(4));
        storage.remove("Coin" + backTime(5));
        const nowCoin = coin - storage.get("Coin" + backTime(1), 0);
        return nowCoin;
    } else return false;
}
function qiangHongBao() {
    if (backHome(1)) {
        if(text(strOurGroupName).findOne(2000)!=null) {
            if(text(strOurGroupName).findOne(5000).parent().parent().parent().parent().click()) {
                if(id("com.huochat.im:id/et_msg").findOne(5000)!=null) {
                id("com.huochat.im:id/et_msg").setText(strUserName[random(0,strUserName.length)])
                if(id("com.huochat.im:id/tv_send_msg").findOne(5000).click()) {
                    if(!id("com.huochat.im:id/rl_back").findOne(5000).click()) return false
                    }
                else return false
                }
            else return false
            }
            else return false
        }
        toastLog("执行红包监控");
        var HongBao; //单次抢到的红包个数 

        // var msg = new Array();
        // var emoji = new Array();
        var HongBao; //单次抢到的红包个数
        // msg[0] = ("谢谢老板红包");
        // msg[1] = ("谢谢");
        // msg[2] = ("谢谢!");
        // msg[3] = ("谢谢老板");
        // msg[4] = ("多谢");
        // msg[5] = ("谢谢");
        // msg[6] = ("多谢老板红包");
        // msg[7] = ("谢谢！")
        // emoji[0] = "[亲亲]";
        // emoji[1] = "[微笑]";
        // emoji[2] = "[开心]";
        // emoji[3] = "[脸红]";
        // emoji[4] = "[笑]";
        // emoji[5] = "[亲亲][亲亲][亲亲]";
        // emoji[6] = "[微笑][微笑][微笑]";
        // emoji[7] = "[开心][开心][开心]";
        // emoji[8] = "[脸红][脸红][脸红]";
        // emoji[9] = "[笑][笑][笑]";
        while (id("com.huochat.im:id/tv_title").findOne(5000) !== null && !className("android.widget.TextView").text("搜索").exists()) {
            var x1 = random(device.width * 1 / 3, device.width * 2 / 3);
            var x2 = random(device.width * 1 / 3, device.width * 2 / 3);
            var y1 = random(device.height * 2 / 8, device.height * 3 / 8);
            var y2 = random(device.height * 5 / 8, device.height * 7 / 8);
            sSwipe(x1, y1, x2, y2, random(500, 1000));
            sleep(random(3000, 6000));
        }
        blnGetRedPackFlag=false  //是否抢到红包的标志
        if (id("com.huochat.im:id/tv_chat_msg").className("android.widget.TextView").textStartsWith("[红包]").findOne(120 * 1000) !== null) {
            if (id("com.huochat.im:id/tv_chat_msg").className("android.widget.TextView").textStartsWith("[红包]").findOne(5000).parent().parent().parent().parent().click()) {
                HongBao = 0;
                if (id("com.huochat.im:id/chat_content").className("android.widget.LinearLayout").clickable(true).findOne(5000) !== null) {
                    // if (!isNaN(yanChi)) sleep(yanChi);
                    var LOG = new Array(),//储存历史控件
                        H = h = id("com.huochat.im:id/tv_hb_pay").className("android.widget.TextView").text("红包").find().length;
                    while (h > 0) {
                        // 领取红包
                        if (id("com.huochat.im:id/tv_hb_pay").className("android.widget.TextView").text("红包").findOnce(h - 1).parent().click()) {
                            LOG[LOG.length] = h;
                            if (id("com.huochat.im:id/iv_open").findOne(5000) !== null || id("com.huochat.im:id/ll_left").exists() || text("手慢了，红包抢完了").exists()) {
                                if (id("com.huochat.im:id/iv_open").exists()) {
                                    if (id("com.huochat.im:id/iv_open").findOne(5000).click()) {
                                        if (id("com.huochat.im:id/ll_left").findOne(5000) !== null) {
                                            if (id("com.huochat.im:id/ll_left").findOne(5000).click()) {
                                                HongBao++;
                                                blnGetRedPackFlag=true;
                                                break;
                                             }
                                            else return false;
                                        }
                                        //遇见红包抢完了等情况直接退出
                                        else if (text("手慢了，红包抢完了").exists()) {
                                            if (id("com.huochat.im:id/iv_close").findOne(5000).click()) break;
                                            return false;
                                        } else return false;
                                    } else return false;
                                }
                                else if (id("com.huochat.im:id/ll_left").exists()) {
                                    if (id("com.huochat.im:id/ll_left").findOne(5000).click()) break;
                                    return false;
                                }
                                else if (text("手慢了，红包抢完了").exists()) {
                                    if (id("com.huochat.im:id/iv_close").findOne(5000).click()) break;
                                    return false;
                                }
                                else return false;
                            } else return false;
                        } else return false;
                        //红包数量变化更新
                        sleep(200);
                        if (id("com.huochat.im:id/chat_content").className("android.widget.LinearLayout").clickable(true).find().length !== H) {
                            h = H = id("com.huochat.im:id/chat_content").className("android.widget.LinearLayout").clickable(true).find().length;
                        };
                        //跳过历史控件
                        while (LOG.indexOf(h) !== -1) h--;
                    }
                    if (id("com.huochat.im:id/rl_back").findOne(5000) !== null && id("com.huochat.im:id/et_msg").findOne(5000) !== null) {
                        toastLog("抢到" + HongBao + "个红包");
                        id("com.huochat.im:id/rl_back").findOne(5000).click()
                        if(blnGetRedPackFlag) ChangeUserIcon()   
                        // if ((HongBao >= 1) && (1 === random(0, 6)) && date.getHours() > 8) {
                        //     if (random(0, 13) > 9) setClip(msg[random(0, 7)]);
                        //     else { setClip(msg[random(0, 7)] + emoji[random(0, 9)]); }
                        //     sPress(id("com.huochat.im:id/et_msg").findOne().bounds().centerX(), id("com.huochat.im:id/et_msg").findOne().bounds().centerY(), 200)//) {
                        //     sleep(5000);
                        //     id("com.huochat.im:id/et_msg").findOne(5000).paste();
                        //     sleep(200);
                        //     if (id("com.huochat.im:id/tv_send_msg").text("发送").findOne(2000) !== null) {
                        //         if (!id("com.huochat.im:id/tv_send_msg").text("发送").findOne(5000).click()) return false;
                        //     } else return false;
                        //     //} else return false;
                        // }
                        // if (!id("com.huochat.im:id/rl_back").findOne(5000).click()) return false;
                    } else return false;
                }
                else if ((id("com.huochat.im:id/rl_back").findOne(5000) !== null) && (id("com.huochat.im:id/et_msg").findOne(5000) !== null)) {
                    if (!id("com.huochat.im:id/rl_back").findOne(5000).click()) return false;
                } else return false;
            } else return false;
        };
        return backHome();
    } else return false;
}
function xiaoXi() {
    var Num//消息数量
    if (backHome(1)) {
        sleep(3000);
        id("com.huochat.im:id/tv_chat_count").find().forEach(function (num) {
            if (id("com.huochat.im:id/ll_navi_chats").exists()) {
                Num = Number(num.text());
                if (Num > xiaoxiNum || isNaN(Num)) {
                    if (num.parent().parent().parent().parent().click()) {
                        toastLog("***执行消息");
                        sleep(3000);
                        for (var i = 0; i < 20 && id("com.huochat.im:id/lv_chat").exists() && !id("com.huochat.im:id/tv_receive_btn").exists(); i++) {
                            var x1 = random(device.width * 1 / 3, device.width * 2 / 3);
                            var x2 = random(device.width * 1 / 3, device.width * 2 / 3);
                            var y1 = random(device.height * 2 / 8, device.height * 3 / 8);
                            var y2 = random(device.height * 5 / 8, device.height * 7 / 8);
                            sSwipe(x1, y1, x2, y2, random(500, 1000));
                            sleep(random(3000, 6000));
                        }
                        return true;
                    } else return false;
                }
            } else return false;
        });
        return true;
    } else return false;
}
function ziXun() {
    if (backHome(3)) {
        toastLog("***执行资讯");
        if (id("com.huochat.im:id/rl_finder_information").findOne(5000) !== null) {
            sleep(random(5, 10) * 1000);
            toastLog("进入资讯");
            if (id("com.huochat.im:id/rl_finder_information").findOne(5000).click()) {
                if (id("com.huochat.im:id/tv_item_index_lastednews_title").findOne(15000) !== null) {
                    sPress(id("com.huochat.im:id/tv_item_index_lastednews_title").findOne().bounds().centerX(), id("com.huochat.im:id/tv_item_index_lastednews_title").findOne().bounds().centerY(), 200)//) {
                    toastLog("进入资讯网页");
                    sleep(random(60, 120) * 1000);
                    // if (id("com.huochat.im:id/wv").exists() || desc("网页视图").id("com.huochat.im:id/web_wv").exists()) {
                    //     (80, device.height - 40)//) {
                    if (desc("网页视图").id("com.huochat.im:id/web_wv").exists() || id("com.huochat.im:id/wv").exists()) {
                        sPress(device.width / 4, device.height - 40, 200)//) {
                        toastLog("点赞");
                        sleep(3000);
                        // if (desc("网页视图").id("com.huochat.im:id/web_wv").exists() || id("com.huochat.im:id/wv").exists()) {
                        //     sPress(device.width - 80, device.height - 40, 200);
                        //     if ((desc("网页视图").id("com.huochat.im:id/web_wv").exists() || id("com.huochat.im:id/wv").exists()) && random(0, 1) == 0) {
                        //         sPress(device.width - 80, device.height - 40, 200); toastLog("分享");
                        //         sleep(3000)
                        //         toastLog("分享byq");
                        //         if (id("com.huochat.im:id/ll_share_byq").findOne(5000) !== null) {
                        //             toastLog("点击byq")
                        //             if (id("com.huochat.im:id/ll_share_byq").findOne(5000).click()) {
                        //                 if (id("com.huochat.im:id/right_layout").findOne(5000) !== null) {
                        //                     toastLog("发送byq")
                        //                     if (id("com.huochat.im:id/right_layout").findOne(5000).click()) {
                        sleep(5000);
                        toastLog("返回主页");
                        if (backHome()) return true; else return false
                        //} else return false;
                    } else return false;
                    //} else return false;
                    //} else return false;
                    //} else return false;
                } else return false;
            } else return false;
        } else return false;
    } else return false;
    //                     } else return false;
    //                 } else return false;
    //             } else return false;
    //         } else return false;
    //     } else return false;
    // } else return false;
}
function kuaiXun() {
    if (backHome(3)) {
        var rd;
        toastLog("***执行快讯");
        sleep(random(5, 10) * 1000);
        if (id("com.huochat.im:id/rl_finder_quicknews").findOne(5000) !== null) {
            toastLog("进入快讯");
            if (id("com.huochat.im:id/rl_finder_quicknews").findOne(5000).click()) {
                rd = random(1, 3);
                sleep(random(30, 60) * 1000);
                if ((rd === 2 || rd === 3) && id("com.huochat.im:id/rb_item_flashnews_bull").findOne(10000) !== null) {
                    sPress(id("com.huochat.im:id/rb_item_flashnews_bull").findOne().bounds().centerX(), id("com.huochat.im:id/rb_item_flashnews_bull").findOne().bounds().centerY(), 200)//) {
                    toastLog("利好");
                    sleep(5000);
                    if (backHome()) return true; else return false;
                    //} else return false;
                    //     if (id("com.huochat.im:id/iv_item_flashnews_share").findOne(5000).click()) {
                    //         toastLog("分享byq");
                    //         if (id("com.huochat.im:id/ll_share_byq").findOne(5000) !== null) {
                    //             if (id("com.huochat.im:id/ll_share_byq").findOne(5000).click()) {
                    //                 if (id("com.huochat.im:id/right_layout").findOne(5000) !== null) {
                    //                     if (id("com.huochat.im:id/right_layout").findOne(5000).click()) {
                    //                         sleep(5000)
                    //                         toastLog("返回主页")
                    //                         if (backHome()) { return true } else { return false }
                    //                     } else return false;
                    //                 } else return false;
                    //             } else return false;
                    //         } else return false;
                    //     } else return false;
                }
                else if (id("com.huochat.im:id/rb_item_flashnews_bear").findOne(10000) !== null) {
                    sPress(id("com.huochat.im:id/rb_item_flashnews_bear").findOne().bounds().centerX(), id("com.huochat.im:id/rb_item_flashnews_bear").findOne().bounds().centerY(), 200)//) {
                    toastLog("利空");
                    sleep(5000);
                    if (backHome()) return true; else return false;
                    //} else return false;
                } else return false;
            } else return false;
        } else return false;
    } else return false;
}
function jiFen() {
    if (backHome(4)) {
        toastLog("***执行积分");
        getCoinSize()
        sleep(random(5, 10) * 1000);
        if (id("com.huochat.im:id/rl_rank_invite").findOne(5000) !== null) {
            toastLog("进入积分排行");
            if (id("com.huochat.im:id/rl_rank_invite").findOne(5000).click()) {
                sleep(random(5, 10) * 1000);
                if (id("com.huochat.im:id/tv_racord").findOne(5000) !== null) {
                    toastLog("持有记录");
                    if (id("com.huochat.im:id/tv_racord").findOne(5000).click()) {
                        sleep(random(20, 60) * 1000);
                        toastLog("返回主页");
                        if (backHome()) return true; else return false;
                    } else return false;
                } else return false;
            } else return false;
        } else return false;
    } else return false;
}
function qianBao() {
    if (backHome(4)) {
        toastLog("***执行钱包");
        getCoinSize()
        sleep(random(5, 10) * 1000);
        if (id("com.huochat.im:id/rl_me_menu_row").findOne(5000).click()) {
            toastLog("进入钱包");
            sleep(random(10, 30) * 1000);
            if (text("闪兑").exists() && random(0, 1) === 0) {
                if (text("闪兑").findOne(5000).parent().click()) {
                    toastLog("进入闪兑");
                    sleep(random(10, 30) * 1000);
                    if (text("我发起的").exists() && random(0, 1) === 0) {
                        toastLog("我发起的");
                        if (text("我发起的").findOne(5000).click()) {
                            sleep(random(5, 10) * 1000);
                            if (text("我兑换的").exists()) {
                                toastLog("我兑换的");
                                if (text("我兑换的").findOne(5000).click()) {
                                    sleep(random(5, 10) * 1000);
                                    toastLog("返回主页");
                                    if (backHome()) return true; else return false;
                                } else; return false;
                            } else return false;
                        } else return false;
                    } else return false;
                } else return false;
            } else return false;
        } else return false;
    } else return false;
}
function biYouQuan() {
    if (backHome(1)) {
        toastLog("***执行币友圈");
        sleep(random(5, 10) * 1000);
        if (className("android.widget.RelativeLayout").clickable(true).findOnce(1).click()) {
            toastLog("进群");
            sleep(random(5, 10) * 1000);
            if (className("android.widget.FrameLayout").id("com.huochat.im:id/ulv_avatar").findOne(5000).click()) {
                toastLog("个人信息");
                sleep(random(5, 10) * 1000);
                if (className("android.widget.LinearLayout").id("com.huochat.im:id/ll_friends_circle").findOne(5000).click()) {
                    toastLog("币友圈");
                    sleep(random(20, 40) * 1000);
                    if (id("com.huochat.im:id/iv_praise").findOne(5000) !== null) {
                        id("com.huochat.im:id/iv_praise").clickable(true).find().forEach(function (dianZ) {
                            if (id("com.huochat.im:id/iv_praise").exists()) {
                                if (dianZ.click()) {
                                    toastLog("点赞"); sleep(1000);
                                } else return false;
                            } else return false;
                        });
                    } else if (!backHome()) return false;
                } else return false;
            } else return false;
        } else return false;
    } else return false;
    if (backHome(3) && random(0, 5) === 0) {
        sleep(random(20, 40) * 1000);
        if (id("com.huochat.im:id/rl_finder_coinfriends").exists()) {
            if (id("com.huochat.im:id/rl_finder_coinfriends").findOne(5000).click()) {
                sleep(random(20, 40) * 1000);
                if (id("com.huochat.im:id/iv_praise").exists()) {
                    id("com.huochat.im:id/iv_praise").clickable(true).find().forEach(function (dianZ) {
                        if (id("com.huochat.im:id/iv_praise").exists()) {
                            if (dianZ.click()) {
                                toastLog("点赞"); sleep(1000);
                            } else return false;
                        } else return false;
                    });
                    if (backHome()) return true;
                } else return false;
            } else return false;
        } else return false;
    } else return false;
}
// while (1) qiangHongBao();
function main() {
    toastLog("今日产量", getCoinSize());
    while (true) {
        PointA: {
            try {
                // var yanChi, intRandomStart=0,intRandomOver=50
                // var intRS1=1,intRO1=7,intRS2=9,intRO2=9
                //根据时间来确定哪些动作[8:00~24:00只抢红包和挖矿，其他时间不抢红包，只做动作和挖矿]
                // var NowDate=new Date()
                // if((NowDate.getHours()>=0&&NowDate.getHours()<8)) {
                //    intRandomStart=intRS1
                //    intRandomOver=intRO1
                //  }
                // else {
                //    intRandomStart=intRS2
                //    intRandomOver=intRO2
                // }
                intRandomStart=10
                intRandomOver=60
                if (backHome()) {
                    switch (random(intRandomStart, intRandomOver)) {
                        case 1: {if (!ziXun()) break PointA; }
                        case 2: {if (!kuaiXun()) break PointA; }
                        case 3: {if (!jiFen()) break PointA; }
                        case 4: {
                            // if (!qianBao()) break PointA; 
                        }
                        case 5: {if (!biYouQuan()) break PointA; }
                        case 6: {
                                 break PointA;}
                        case 7: { //采集声望
                            if(intGetPopularityDate!=NowDate.getDate()) {
                               //采集声望函数
                               break PointA;
                             }
                        }
                        case 8: { //删群 
                            break PointA;}
                        case 9: { 
                            //加好友
                        }
                        case 10: { //向主帐号付款

                        }
                        case 11: {
                            //删除冗余文件
                                var result
                                result=shell("chmod -R 777 /data/data/com.huochat.im/databases/*.*",true)
                                sleep(5000)
                                result=shell("rm -f /data/data/com.huochat.im/databases/product_*conttact.db",true)
                                result=shell("rm -f /data/data/com.huochat.im/databases/product_*msg*.db",true)
                                result=shell("rm -f /data/data/com.huochat.im/databases/sensorsdata",true)
                                break PointA;  
                        }
                        default: { qiangHongBao(); break PointA; }
                    }
                }
                else if (id("com.huochat.im:id/tv_receive_btn").exists()) return;
                else toastLog("不在火信");
                sleep(random(2, 5) * 1000);
            }
            catch (err) {
                log(err);
                toastLog(" * 捕获错误，自适应处理");
                sleep(3000);
                break PointA;
            }
        }
    }
}

function wenTi() {
    var date = new Date();
    var fileError; //用于记录出现问题的题目
    var strQuestion, strAnswerA, strAnswerB, strAnswerC, strAnswerD; //挖矿问题、挖矿答案A、B、C、D
    var ctlQuestion, ctlAnswerA, ctlAnswerB, ctlAnswerC, ctlAnswerD; //A、B、C、D四个答案的控件
    var intWaitTimeCount, intMaxDelay = 30; //等待的时间，最大能等待的时间
    var blnQuestionFind; //挖矿问题数组、挖矿答案数组、是否发现挖矿问题的标志
    const strAnswerObject = {
        "邀请一次好友": "10HCT",
        "发红包至少拥有多少": "100",
        "是哪个币的英文缩写": "泰达币",
        "哪一种数字货币的总量是": "比特币",
        "的积分名是什么": "HCT",
        "火信商品用什么可以兑换": "HCT",
        "莱特币的英文全称": "Litecoin",
        "火信群口令最长有效时间": "24小时",
        "中本聪创建的第一个区块": "0",
        "不是同类的是": "TCL",
        "哪个不是区块链的核心": "人工智能",
        "哪个不属于数字货币": "人民币",
        "以太坊创始人是": "V神",
        "产生第一批比特币的区块": "创世区块",
        "火信群公告最多可以输入": "500字",
        "首个推出国家版数字货币": "厄瓜多尔",
        "是哪个区块链系统发布的": "EOS.IO",
        "矿机中最核心的部分是": "芯片",
        "比特币白皮书第一次发表": "密码朋克",
        "比特币采用的共识机制是": "PoW",
        "权益证明的英文缩写是": "PoS",
        "比特币的英文是什么": "Bitcoin",
        "火信目前支持多少种语言": "4种",
        "运用了哪种共识算法": "POS",
        "哪个火信号属于开元号": "10199999",
        "比特币是哪一年被发明": "2008",
        "以下哪一种数字货币的英文缩写是": "比特币",
        "一键买币不支持那个币种": "HPT",
        "中多少数量用于社交挖矿": "60亿",
        "中本聪是哪个数字资产": "比特币",
        "比特币总量是多少": "2100万",
        "积分的中文名": "火车头",
        "维尔克开发了以下哪一种数字货币": "以太坊",
        "最重要的是保护自己的": "私钥",
        "发行总量是多少": "100亿",
        "哪个不是区块链的应用特征": "融合性",
        "比特币区块大小的单位": "MB",
        "完整区块链账本的节点": "全节点",
        "比特币网络里进行记账的常被称作": "矿工",
        "被誉为什么": "区块链3.0",
        "比特币区块高度为": "创世区块",
        "区块链项目的主流算法": "POW",
        "以太坊初版白皮书是哪年发布": "2013",
        "火信群最多可以设置几个管理员": "4个",
        "账户余额低于多少": "1000",
        "哪个选项具有全员参与记账的特点": "比特币",
        "是以下哪一种数字货币的英文缩写": "莱特币",
        "的中文名称": "柚子",
        "哪一种数字货币的系统奖励会在": "比特币",
        "比特币大约多久出块一次": "10分钟",
        "莱特币客户端第一版的发布时间": "2009",
        "比特币矿工挖矿奖励每隔多少年减半": "4年",
        "群聊的默认人数是多少": "1000人",
        "火信形象物叫": "小火",
        "以太坊的英文缩写": "ETH",
        "的中文翻译": "密码朋克",
        "区块链的第一个成功应用是": "BTC",
        "比特币第一个区块获得多少个": "50",
        "区块链的英文名": "Blockchain",
        "比特币的记账方式被称为": "挖矿",
        "工作量证明的英文简写": "PoW",
        "火信群可以最大升级到": "10000人",
        "区块链是什么": "去中心化DB",
        "比特币的总量": "2100万",
        "比特币区块结构中不包含": "交易人姓名",
        "闪兑确认交易后": "5分钟",
        "创世皇冠的价格是": "1000",
        "中文名字叫什么": "火车头",
        "挖矿成功率的大小取决": "计算能力",
        "比特币的英文缩写": "BTC",
        "数字货币的出块速度是": "比特币",
        "比特币可以细分到小数点后": "8",
        "共识机制PoW是什么": "工作量证明",
        "比特币系统奖励什么时候会挖完": "2140",
        "比特币英文": "BitCoin",
        "哪种共识机制效率最低": "PoW",
        "ETH是以下哪一种数字货币": "以太坊",
        "的以下哪一个选项的英文名": "区块链",
        "以太坊简写是什么": "ETH",
        "火信可以通过以下哪种方式": "红包",
        "波的英文缩写": "XRP",
        "比特币创世区块的系统奖励": "50",
        "哪个选项没有发行主体": "比特币",
        "闪兑要收取多少个": "10",
        "比特币一个区块大约能装": "4000",
        "维尔克开发了以下哪种": "以太坊",
        "莱特币的英文缩写": "LTC",
        "闪兑功能是在哪个版本": "1.2.3",
        "共识机制PoS是什么": "权益证明",
        "哪种数字货币的价格与美元": "USDT",
        "以下哪一种数字货币的共识机制是": "比特币",
        "挖矿奖励每隔4年减半": "比特币",
        "火币的CEO是谁": "李林",
        "公有链的特征不包": "中心化",
        "比特币如何生产": "“挖矿”",
        "火信的创始人是谁": "币圈老王"
    };//问题答案
    while (true) {
        PointA: {
            try {
                if (id("com.huochat.im:id/tv_receive_btn").findOne(6000) !== null) {
                    toastLog("***执行挖矿")
                    id("com.huochat.im:id/tv_receive_btn").findOne(6000).click(); intWaitTimeCount = 0; blnQuestionFind = false;
                    //按下“领取HCT”后20秒内必须出问题，否则就是出现“TOKEN错误”或“网络不通”等情况，
                    while (1) {
                        if ((ctlQuestion = id("com.huochat.im:id/tv_issue").findOne(6000)) !== null &&
                            (ctlAnswerA = id("com.huochat.im:id/tv_q_a").findOne(6000)) !== null &&
                            (ctlAnswerB = id("com.huochat.im:id/tv_q_b").findOne(6000)) !== null &&
                            (ctlAnswerC = id("com.huochat.im:id/tv_q_c").findOne(6000)) !== null &&
                            (ctlAnswerD = id("com.huochat.im:id/tv_q_d").findOne(6000)) !== null) {
                            strQuestion = ctlQuestion.text().replace(/(^\s*)|(\s*$)/g, "");
                            strAnswerA = ctlAnswerA.text().replace(/(^\s*)|(\s*$)/g, "");
                            strAnswerB = ctlAnswerB.text().replace(/(^\s*)|(\s*$)/g, "");
                            strAnswerC = ctlAnswerC.text().replace(/(^\s*)|(\s*$)/g, "");
                            strAnswerD = ctlAnswerD.text().replace(/(^\s*)|(\s*$)/g, "");
                            sleep(1000); break;
                        }
                        else {
                            sleep(1000); intWaitTimeCount++;
                            if (intWaitTimeCount === 15) { click("领取HCT"); } //必须用“领取HCT"，用座标有可能刚好进问题，点到“提交领取”
                            else if (intWaitTimeCount > intMaxDelay) //延迟时间大于最大设定数，就视为“TOKEN错误”或“网络不通”等情况，
                            { //退出当前挖矿，关闭APP，并重新启动APP
                                fileError = open("/storage/emulated/0/ErrorRecord.txt", "a");
                                fileError.write(date.getMonth() + "-" + date.getDate() + "　" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "出现了[TOKEN错误]或[网络不通]的特殊情况");
                                fileError.close();
                                sPress(id("com.huochat.im:id/iv_cancle").findOne(6000).bounds().centerX(), id("com.huochat.im:id/iv_cancle").findOne(6000).bounds().centerY(), 200);

                                //关闭火信，然后重启的程序段
                                sleep(1500); intWaitTimeCount = 0;
                                app.openAppSetting("com.huochat.im")
                                while (1) {
                                    if (className("android.widget.Button").text("结束运行").findOne(6000) !== null) {
                                        click("结束运行");
                                        while (1) {
                                            if (className("android.widget.Button").text("确定").findOne(6000) !== null) {
                                                click("确定");
                                                sleep(2000);
                                                sPress(35, 88, 200);
                                                sleep(2000);
                                                KeyCode("KEYCODE_HOME");
                                                sleep(1500); intWaitTimeCount = 0;
                                                while (1) {
                                                    if (id("icon_title").className("android.widget.TextView").text("火信").findOne(6000) !== null) {
                                                        click("火信");
                                                        return;
                                                    }
                                                    else {
                                                        sleep(1000); intWaitTimeCount++;
                                                        if (intWaitTimeCount > intMaxDelay) //延迟时间大于最大设定数，视为卡机退出
                                                        {
                                                            toastLog(" 发生未知错误，导致程序中断执行！错误号--在当前桌面找不到火信APP!");
                                                            return;
                                                        }
                                                    }
                                                }
                                            }
                                            else {
                                                sleep(1000); intWaitTimeCount++;
                                                if (intWaitTimeCount > intMaxDelay) //延迟时间大于最大设定数，视为卡机退出
                                                {
                                                    toastLog(" 发生未知错误，导致程序中断执行！错误号--中断系统确定部份出错!");
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        sleep(1000); intWaitTimeCount++;
                                        if (intWaitTimeCount > intMaxDelay) //延迟时间大于最大设定数，视为卡机退出
                                        {
                                            toastLog(" 发生未知错误，导致程序中断执行！错误号--中断系统结束运行出错");
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //问题比较判别
                    for (var key in strAnswerObject) {
                        if (strQuestion.indexOf(key) !== -1) {
                            blnQuestionFind = true;
                            if (strAnswerA === strAnswerObject[key]) id("com.huochat.im:id/ll_a").findOne(6000).click();
                            else if (strAnswerB === strAnswerObject[key]) id("com.huochat.im:id/ll_b").findOne(6000).click();
                            else if (strAnswerC === strAnswerObject[key]) id("com.huochat.im:id/ll_c").findOne(6000).click();
                            else if (strAnswerD === strAnswerObject[key]) id("com.huochat.im:id/ll_d").findOne(6000).click();
                            else {
                                //都找不到的情况下，代表可能程序本身出问题了，则记录入文件，并点击B
                                fileError = open("/storage/emulated/0/ErrorRecord.txt", "a");
                                fileError.write("********所有答案均未匹配********");
                                fileError.write(date.getMonth() + "-" + date.getDate() + "　" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "\n");
                                fileError.write(strQuestion + "\n" + strAnswerA + "\n" + strAnswerB + "\n" + strAnswerC + "\n" + strAnswerD + "\n\n库中标准答案是：" + strAnswerObject[key]);
                                fileError.close();
                                id("com.huochat.im:id/ll_b").findOne(6000).click();
                            }
                            sleep(1500); id("com.huochat.im:id/tv_conmit_btn").click();//提交领取
                            while (1) {
                                if (id("com.huochat.im:id/tv_ok_btn").findOne(6000) !== null) { sleep(1000); id("com.huochat.im:id/tv_ok_btn").findOne(6000).click(); return true; }
                                else if (id("com.huochat.im:id/tv_error_btn") !== null) {
                                    fileError = open("/storage/emulated/0/ErrorRecord.txt", "a");
                                    fileError.write("********回答错误了********");
                                    fileError.write(date.getMonth() + "-" + date.getDate() + "　" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "\n");
                                    fileError.write(strQuestion + "\n" + strAnswerA + "\n" + strAnswerB + "\n" + strAnswerC + "\n" + strAnswerD + "\n\n");
                                    fileError.close();
                                    sleep(1000); id("com.huochat.im:id/tv_error_btn").findOne(6000).click();
                                    break;
                                }
                            }
                            break;
                        }
                    }
                    // 问题库轮询过后没有一个匹配，则视为发现新问题，默认选B，并记入记录文件
                    if (blnQuestionFind = false) {
                        id("ll_b").click();
                        sleep(1500); id("com.huochat.im:id/tv_conmit_btn").click();//提交领取
                        while (1) {
                            if (id("com.huochat.im:id/tv_ok_btn").findOne(6000) !== null) { sleep(1000); id("com.huochat.im:id/tv_ok_btn").findOne(6000).click(); break; }
                            else if (id("com.huochat.im:id/tv_error_btn").findOne(6000) !== null) {
                                fileError = open("/storage/emulated/0/ErrorRecord.txt", "a");
                                fileError.write("********发现新问题，但猜答案B猜错了********");
                                fileError.write(date.getMonth() + "-" + date.getDate() + "　" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "\n");
                                fileError.write(strQuestion + "\n" + strAnswerA + "\n" + strAnswerB + "\n" + strAnswerC + "\n" + strAnswerD + "\n\n");
                                fileError.close();
                                sleep(1000); id("com.huochat.im:id/tv_error_btn").findOne(6000).click();
                                break;
                            }
                        }
                    }
                } else return;
            }
            catch (err) {
                log(err);
                toastLog(" * 捕获错误，自适应处理");
                sleep(10000);
                break PointA;
            }
        }
    }
}

function ChangeUserIcon() { //快速修改头像和昵称
    //修改昵称
    var strNewUserName=""
    if (id("com.huochat.im:id/ll_navi_me").findOne(5000).click()) {
        if(id("com.huochat.im:id/tv_me_username").findOne(5000).click()) {
            if(id("com.huochat.im:id/ll_right").findOne(5000).click()) {
               if(id("com.huochat.im:id/data_nick").findOne(5000).click()) {
                  if(id("com.huochat.im:id/et_input").findOne(5000).click()) {
                     sleep(500)
                     strOldUserName=id("com.huochat.im:id/et_input").findOne(3000).text()  
                     while(strNewUserName==""||strNewUserName==strOldUserName) {strNewUserName=strUserName[random(0,strUserName.length)]}
                     while(id("com.huochat.im:id/et_input").findOne(3000).text()==strOldUserName ||
                          id("com.huochat.im:id/et_input").findOne(3000).text().replace(/\s*/g,"")=="") {
                          id("com.huochat.im:id/et_input").findOne(3000).setText(strNewUserName)
                          sleep(500)
                        }
                     if(id("com.huochat.im:id/tv_confirm").findOne(5000).click()) {
                        if(id("com.huochat.im:id/ll_right").findOne(5000).click()) {
                           if(id("com.huochat.im:id/ll_left").findOne(5000).click()) {
                              if(id("com.huochat.im:id/tv_cancel").findOne(500)!=null) {
                                 id("com.huochat.im:id/tv_cancel").click()
                             }
                           }
                        }
                     }
                    } 
                }
                else return false
            }
            else return false
        }
        else return false
        // //修改头像
        // if(id("com.huochat.im:id/iv_me_usericon").findOne(5000).click()) {
        //     if(id("com.huochat.im:id/ll_right").findOne(5000).click()) {
        //         sleep(1500)
        //         if(id("com.huochat.im:id/fl_user_logo").findOne(5000).click()) {
        //             sleep(1500)
        //             if(id("com.huochat.im:id/tv_select_gallery").findOne(5000).click()) {
        //                 while(className("android.widget.TextView").text("选择照片").findOne(1000)==null) {sleep(1000)}
        //                 sleep(500)
        //                 //相册文件夹翻页
        //                 for(var intPicTunPage=0;intPicTunPage<random(0,1);intPicTunPage++) sSwipe(100,1270,100,50,500);   
        //                 //选择相册文件夹
        //                 sleep(500);click(intIconFolderX[random(0,1)],intIconFolderY[random(0,2)]);sleep(500)
        //                 //照片翻页
        //                 for(var intPicTunPage=0;intPicTunPage<random(0,8);intPicTunPage++) sSwipe(100,1270,100,168,500);
        //                 sleep(500);click(intIconX[random(0,2)],intIconY[random(0,4)])
        //                 while(id("org.codeaurora.gallery:id/filtershow_done").findOne(3000)==null)
        //                    {click(intIconX[random(0,2)]+20,intIconX[random(0,4)]+20)}
        //                 sleep(1000)
        //                 if(id("org.codeaurora.gallery:id/filtershow_done").findOne(15000).click()) {
        //                     if(id("com.huochat.im:id/ll_right").findOne(10000).click()) {
        //                           if(id("com.huochat.im:id/ll_left").findOne(5000).click()) {
        //                              if(id("com.huochat.im:id/tv_cancel").findOne(1000)!=null) {
        //                                 id("com.huochat.im:id/tv_cancel").click()
        //                              }
        //                           }
        //                         }
        //                     else return false
        //                     }  
        //                 else return false      
        //              }
        //             else return false
        //          }
        //         else return false
        //      }
        //     else return false
        //  }
    }
    else return false
}

function JoinAllGroup(intCyc,strItemName) {
   //数组查询比较函数
   Array.prototype.contains = function (obj) { 
    var index = this.length; 
    while(index--) {if(this[index] === obj) {return true;}} 
    return false; 
    }

    //先打开存储不能加入群名的文件，读入不能加的群名
    var 不能加的群文件=open("/storage/emulated/0/BlueFire/不能加的群.txt","r")
    var 不能加的群=new Array(),临时过渡数组=new Array()
    临时过渡数组=不能加的群文件.readlines()
    不能加的群文件.close()

    for(var i=0;i<临时过渡数组.length;i++) {不能加的群.push(临时过渡数组[i].replace(/\n/,""))}

    //读取可划屏坐标
    var 划屏下横坐标,划屏下纵坐标,划屏上横坐标,划屏上纵坐标
    while(id("com.huochat.im:id/ll_navi_finds").findOne(3000)==null) {back();sleep(2000)}
    sleep(2000)
    id("com.huochat.im:id/ll_navi_finds").click()
    sleep(2000)
    划屏下纵坐标=parseInt(id("com.huochat.im:id/ll_navi_finds").findOne(3000).bounds().toString().replace(/[-]/g,",").replace(/[^0-9,]/g,"").split(",")[3])-1
    划屏上纵坐标=parseInt(id("com.huochat.im:id/rl_finder_coinfriends").findOne(3000).bounds().toString().replace(/[-]/g,",").replace(/[^0-9,]/g,"").split(",")[3])
    划屏下横坐标=划屏上横坐标=200

    //进入社群推荐
    id("com.huochat.im:id/rl_finder_groups").findOne(5000).click()
    sleep(8000)
    var 按钮控件=new Array(),群名称控件=new Array(),群人数控件=new Array()
    var 三选项卡总拉屏次数=15
    var 按钮循环检测总数=0
    var 临时群控件数组,群控件高度
    while(id("com.huochat.im:id/ulv_group_logo").findOne(5000)!=null) {
    临时群控件数组=id("com.huochat.im:id/ulv_group_logo").find()
    break
    }
    群控件高度=parseInt(临时群控件数组[0].bounds().toString().replace(/[-]/g,",").replace(/[^0-9,]/g,"").split(",")[3])-
    parseInt(临时群控件数组[0].bounds().toString().replace(/[-]/g,",").replace(/[^0-9,]/g,"").split(",")[1])

    var 执行加入的群=new Array()
    //读取“火币旗下”的可加入群
    for(var 拉屏次数=0;拉屏次数<三选项卡总拉屏次数;拉屏次数++) {
    while(id("com.huochat.im:id/btn_add").findOne(5000)!=null) {
        按钮控件=id("com.huochat.im:id/btn_add").find()
        群名称控件=id("com.huochat.im:id/tv_group_name").find()
        群人数控件=id("com.huochat.im:id/tv_group_members_count").find()
        break;
    } 
    按钮循环检测总数=按钮控件.length-1-Math.ceil((划屏下纵坐标-划屏上纵坐标)/群控件高度)
    for(var i=按钮循环检测总数;i>0;i--) {
        if(按钮控件[i].text()=="加入" && 
            parseInt(群人数控件[i].text().replace(/[^0-9]/g, ''))>parseInt(加群最低人数) &&
            !不能加的群.contains(群名称控件[i].text()) && 
            !执行加入的群.contains(群名称控件[i].text())) {
            执行加入的群.push(群名称控件[i].text())
        }
    }
    swipe(划屏下横坐标,划屏下纵坐标,划屏上横坐标,划屏上纵坐标,2000)
    sleep(10000)
    text("榜单").findOne(5000).click()
    sleep(2000)
    swipe(划屏下横坐标,划屏下纵坐标,划屏上横坐标,划屏上纵坐标,2000)
    sleep(10000)
    text("猜你喜欢").findOne(5000).click()
    sleep(10000)
    }

    for(i=0;i<执行加入的群.length-1;i++) {
        while(id("com.huochat.im:id/ll_navi_chats").findOne(3000)==null) {back();sleep(2000)}

        if(id("com.huochat.im:id/ll_navi_chats").findOne(5000).click()) {
            if(text("搜索").findOne(5000).parent().parent().click()) {
                if(id("com.huochat.im:id/et_contact_search").findOne(5000).click()) { 
                    id("com.huochat.im:id/et_contact_search").setText(执行加入的群[i])
                    sleep(1500)
                    if(id("com.huochat.im:id/iv_search_icon").findOne(5000).parent().parent().click()) {
                        if(id("com.huochat.im:id/tv_common_name").text(执行加入的群[i]).findOne(5000)!=null) {
                            if(className("android.widget.TextView").text(执行加入的群[i]).findOne(5000).parent().parent().parent().click()) {
                                if(id("com.huochat.im:id/btn_confirm").findOne(5000).click()) {
                                    if(id("com.huochat.im:id/rl_back").findOne(5000)==null) {
                                        //写入不能加群的文件（后补）
                                        不能加的群.push(执行加入的群[i])
                                        files.append("/storage/emulated/0/BlueFire/不能加的群.txt", 执行加入的群[i]+"\n");
                                    }
                                    else {
                                        toast("【"+执行加入的群[i]+"】成功加入")
                                        sleep(2000)
                                        ChangeUserIcon()
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function JoinDesignGroup() {
    var i,j
    var blnJoinSuccess=false
    var GroupFlag = http.get("https://gitee.com/liangchaoping/HuoxinChat/raw/master/WantJoinGroup");
    var strGroupFlag=new Array()
    strGroupFlag=GroupFlag.body.string().spliif("\n")
    for(i=0;i<strGroupFlag.length-1;i++) {
       blnJoinSuccess=false //加入成功，则将blnJoinSuccess改成true,然后调用“意图”改昵称和头像
       if(strGroupFlag[i].sliceslice(-7)=="未加-名称进群"||strGroupFlag[i].sliceslice(-6)=="未加-密码进群") {
          if(strGroupFlag[i].sliceslice(-7)=="未加-名称进群") {
             if(id("com.huochat.im:id/fl_user_logo").findOne(5000).click()) { //点击搜索，要改控件名，找clickabale控件
                id("com.huochat.im:id/fl_user_").findOne(5000).setText(strGroupFlag[i].substring(0,strGroupFlag[i].length-8))
                if("点击搜索") {}

             }
           }  
          else if(strGroupFlag[i].sliceslice(-6)=="未加-口令进群") { //直接调用“意图”
            if(id("com.huochat.im:id/iv_right_ico_more").findOne(5000).click()) { //点击加号
               id("com.huochat.im:id/pv_pwd").findOne(5000).setText(strGroupFlag[i].substring(0,strGroupFlag[i].length-8))
               //情况一，已经加入过
                    //直接进入群了
               //情况二，未加入过
                   //出来一个蓝色按钮
               //情况三，被禁止加入
               //情况四，网络慢，在原地不动

            }  
        }
    }
  }
}

function ExitGroup() {
    //往上拉X屏
    //取整屏的聊天的日期，不符合的就退出群，直到第一个符合日期条件的群出现，程序退出
    
}

function ContributionLightning() { //贡献声望，直接调用“意图”来修改
    //先到“我的”
   id("com.huochat.im:id/rl_me_tast_center").findOne(5000).click() //点击菜单条“任务中心”

   button_task_sign_in  //签到
   button_task_sign_info_share  //已经签到
   text_view_task_top_repution_score //声望值
   //id("button_task_sign_info_share").text("立即分享") 

   //试一下“社区贡献”、“游戏道具"、“使用特权"能不能点击
}
