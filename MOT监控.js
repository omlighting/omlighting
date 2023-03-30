toast("程序开始")

if(!requestScreenCapture()){
  toast("请求截图失败");
  exit();
}
//连续截图10张图片(间隔1秒)并保存到存储卡目录
var scr,clipSellPrice1,clipSellTotal1,clipSellPrice2,clipSellTotal2
var hitWindow=floaty.rawWindow(
 <frame gravity="center">
     <text text={"MOT监控运行中......"} textColor="red" textSize="15sp" />
 </frame>
);
hitWindow.setPosition(5,34)

while(1) {
  captureScreen("/storage/emulated/0/DCIM/AllScreen.jpg");

  var src =images.read("/storage/emulated/0/DCIM/AllScreen.jpg");
  var clipSellPrice1=images.clip(src,410,520,85,30);
  var clipSellTotal1=images.clip(src,620,520,85,30);
  var clipSellPrice2=images.clip(src,410,480,85,30);
  var clipSellTotal2=images.clip(src,620,480,85,30);
  images.save(clipSellPrice1,"/storage/emulated/0/DCIM/卖1.jpg");
  images.save(clipSellTotal1,"/storage/emulated/0/DCIM/卖1数量.jpg");
  images.save(clipSellPrice2,"/storage/emulated/0/DCIM/卖2.jpg");
  images.save(clipSellTotal2,"/storage/emulated/0/DCIM/卖2数量.jpg");

  if((parseFloat(Baidu_OCR("/storage/emulated/0/DCIM/卖1.jpg"))<=0.071&&
      parseFloat(Baidu_OCR("/storage/emulated/0/DCIM/卖1数量.jpg"))>500)||
      (parseFloat(Baidu_OCR("/storage/emulated/0/DCIM/卖2.jpg"))<0.072&&
      parseFloat(Baidu_OCR("/storage/emulated/0/DCIM/卖2数量.jpg"))>500)) {
      click(210,740)
      media.playMusic("/storage/emulated/0/DCIM/hit.mp3")
      log("检查到一次"+clipSellTotal1+" | "+clipSellTotal2)
      break;
  }
  sleep(1000)
}

//百度OCR引擎，一天只能用50000次
// BDOcr.login('14280778','ZKXMo3HOxVj1qFgZXjZmQ7eM','GO0e93D9ARCupTkt33VOtfmawjuEvq9E'); //加载百度OCR引擎0
// BDOcr.login('14383181','HzFGftfvbbgGcRBG63jGZGQw','zmDNFe9pxocpAC5n7NTe1KAUbIFFkrVM'); //加载百度OCR引擎1
// BDOcr.login('14383195','tC9GCe2WeyTxf7MdG3pux48C','DqbTGcaHEGct6dwLCmRpSlY9it04nHhd'); //加载百度OCR引擎2
// BDOcr.login('14383209','kFxaMVZ1y80FDIieyg9QVVYC','ApcpApjuZzK3Tiz63Y7uPTqOPv1vqovU'); //加载百度OCR引擎3
// BDOcr.login('14383222','W5kURzgkgfC2ziK0MgMfHKlO','vBcMvNyDAgViyuu8xuwGbAqAD6Gzd7Yi'); //加载百度OCR引擎4
// BDOcr.login('14383231','jnXi0xmqeGxZz85ieGMXnPmk','eQMRL1Qe5zjV8VKQnlMusDuLV2XuUVcM'); //加载百度OCR引擎5
// BDOcr.login('14383242','cTbxUf8fTaORm4ZxLOoloei0','MfmlG6zvOs48Uh2nrdTU5UvWhUn9OwUE'); //加载百度OCR引擎6
// BDOcr.login('14383250','tFxR5THBonemPYCQ3Ay4Okxm','GId4AkkM6bqV4EUqkI9xGg4GwULHiA52'); //加载百度OCR引擎7

function Baidu_OCR(imgFile) {
  // access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=ZKXMo3HOxVj1qFgZXjZmQ7eM&client_secret=GO0e93D9ARCupTkt33VOtfmawjuEvq9E").body.json().access_token;
  // access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=HzFGftfvbbgGcRBG63jGZGQw&client_secret=zmDNFe9pxocpAC5n7NTe1KAUbIFFkrVM").body.json().access_token;
  access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=tC9GCe2WeyTxf7MdG3pux48C&client_secret=DqbTGcaHEGct6dwLCmRpSlY9it04nHhd").body.json().access_token;
  // access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=kFxaMVZ1y80FDIieyg9QVVYC&client_secret=ApcpApjuZzK3Tiz63Y7uPTqOPv1vqovU").body.json().access_token;
  // access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=W5kURzgkgfC2ziK0MgMfHKlO&client_secret=vBcMvNyDAgViyuu8xuwGbAqAD6Gzd7Yi").body.json().access_token;
  // access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=jnXi0xmqeGxZz85ieGMXnPmk&client_secret=eQMRL1Qe5zjV8VKQnlMusDuLV2XuUVcM$").body.json().access_token;
  // access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=cTbxUf8fTaORm4ZxLOoloei0&client_secret=MfmlG6zvOs48Uh2nrdTU5UvWhUn9OwUE").body.json().access_token;
  // access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=tFxR5THBonemPYCQ3Ay4Okxm&client_secret=GId4AkkM6bqV4EUqkI9xGg4GwULHiA52").body.json().access_token;
  url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + "?access_token=" + access_token;
  imag64 = images.toBase64(images.read(imgFile));
  res = http.post(url, {headers: {'Content-Type': 'application/x-www-form-urlencoded'},image: imag64,image_type: "BASE64",language_type:"JAP"});
  str = JSON.parse(res.body.string()).words_result.map(val => val.words).join('\n');
  return str;
}


sleep(5000)
toast("程序OVER")
