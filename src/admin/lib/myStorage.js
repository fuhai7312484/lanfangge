//设置Cookie
export function setCookie(key, val, time) {
  if (time) {
    let iDate = new Date();
    iDate.setDate(iDate.getDate() + time);
    document.cookie = key + "=" + val + "; expires=" + iDate;
  } else {
    document.cookie = key + "=" + val;
  }
}
//获取Cookie
export function getCookie(key) {
  let str = document.cookie.split(";")[0].split("=")[1];
  return str;
}
//删除Cookie
export function rmCookie(name) {
  setCookie(name, "", -1);
}
//url接口获取数据
export function getDataArr(url) {
  let arrData = fetch("http://localhost:88/api/" + url).then(e => {
    return e.json();
  });
  return arrData;
}

//设置localStorage
export function set(key, val, time) {
  localStorage.setItem(key, JSON.stringify(val));
}
//获取localStorage
export function get(key) {
  var json = localStorage.getItem(key);
  let dataObj = JSON.parse(json);
  // console.log(json)
  if (dataObj) {
    if (dataObj.time) {
      let newDate = new Date().getTime();
      // console.log(dataObj.time,newDate,newDate-dataObj.time,(1000*60*60*24*7))
      // console.log(newDate-dataObj.time,(1000*60*60*24*7))
      // console.log(newDate-dataObj.time,(1000*60*60*24*7))
      if (newDate - dataObj.time > 3000) {
        console.log("信息已过期");
        stoRemove(key);
      } else {
        return dataObj;
      }
    } else {
      return dataObj;
    }
  }

  // if(json){
  //     return JSON.parse(json);
  // }
}

export function stoRemove(key) {
  localStorage.removeItem(key);
}
export function stClear() {
  localStorage.clear();
}

export function TipInfo(el, txt) {
  el.innerHTML = txt;
}
//设置react的key
export function getDealKey(arr) {
  let dataArr = []
  for(let i=0;i<arr.length;i++){
    dataArr.push({key:(i+1),...arr[i]})
 
  }
 return dataArr;
 
}

//处理手机号显示
export function strPhone(phone) {
  if(phone){
    let str = phone + "";
    return str.substr(0, 3) + "****" + str.substr(7, 11);
  }else{
    return ;

  }
 
}
//时间戳转时间
export function getToTime(timeStamp,str){
  if(!timeStamp)return
  function toDou(n){
    return n<10?'0'+n:''+n;

  }
  str = str?{dateY:str,dateM:str,dateD:' '}:{dateY:'年',dateM:'月',dateD:'日'}
var date = new Date(timeStamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
       let Y = date.getFullYear() + str.dateY;
       let  M = toDou(date.getMonth()+1) + str.dateM;
       let D = toDou(date.getDate()) + str.dateD;
       let h = toDou(date.getHours()) + ':';
       let m = toDou(date.getMinutes()) + ':';
       let s = toDou(date.getSeconds());
        return Y+M+D+h+m+s;


}
