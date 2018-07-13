export function setCookie(key, val, time) {
  if (time) {
    let iDate = new Date();
    iDate.setDate(iDate.getDate() + time);
    document.cookie = key + "=" + val + "; expires=" + iDate;
  } else {
    document.cookie = key + "=" + val;
  }
}

export function getCookie(key) {
  let str = document.cookie.split(";")[0].split("=")[1];
  return str;
}

export function getDataArr(url) {
  // let newData = []

  let arrData = fetch("http://localhost:88/api/" + url).then(e => {
    return e.json();
  });
  //  .then(data=>{
  //     //  console.log(data)
  //     // newData.push(...data);
  //     return data;

  //  })
  //  console.log(newData)
  return arrData;
}
export function rmCookie(name) {
  setCookie(name, "", -1);
}

export function set(key, val, time) {
  localStorage.setItem(key, JSON.stringify(val));
}
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
export function TipInfo(el, txt) {
  el.innerHTML = txt;
}
export function stoRemove(key) {
  localStorage.removeItem(key);
}
export function stClear() {
  localStorage.clear();
}

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
