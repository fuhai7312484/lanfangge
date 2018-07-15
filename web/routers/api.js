/**
 * Created by Moudi on 2017/2/23.
 */
"use strict";
let express = require("express");
let router = express.Router();
let User = require("../models/user");
let Weibo = require("../models/weibo");
let List = require("../models/list");
let Group = require("../models/group");
let multiparty = require("multiparty");
let fs = require("fs");
let resData;

router.use(function(req, res, next) {
  resData = {
    code: 0,
    msg: ""
  };
  next();
});

router.post("/user/login", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username);
  if (username == "" || password == "") {
    resData.code = -1;
    resData.msg = "用户名或密码不能为空";
    res.json(resData);
    return;
  }
  User.findOne({
    username: username,
    password: password
  }).then(userInfo => {
    if (!userInfo) {
      resData.code = -3;
      resData.msg = "用户不存在或密码错误";
      res.json(resData);
      return;
    }
    resData.msg = "登录成功";
    resData.userInfo = {
      _id: userInfo._id,
      username: userInfo.username
    };
    res.json(resData);
  });
});

router.post("/user/register", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  if (username == "") {
    resData.code = -1;
    resData.msg = "用户名不能为空";
    res.json(resData);
    return;
  }
  if (password == "") {
    resData.code = -2;
    resData.msg = "密码不能为空";
    res.json(resData);
    return;
  }
  // let user = new User({
  //   username: username,
  //   password: password
  // });
  // user.save().then(function (newUserInfo) {

  console.log(username, "这个就是前端传的name");
  User.findOne({
    username: username
  }).then(function(newUserInfo) {
    console.log(newUserInfo + "OK");
    if (!newUserInfo) {
      let user = new User({
        username: username,
        password: password
      });
      user.save().then(() => {
        resData.code = 0;
        resData.msg = "注册成功！";
        console.log(resData);
        res.json(resData);
      });
    } else {
      resData.code = 1;
      resData.msg = "用户名已占用!";
      res.json(resData);
    }
  });
});

router.post("/upload", (req, res, next) => {
  //生成对象，配置上传目标路径
  let form = new multiparty.Form({
    uploadDir: "./public/files/",
    encoding: "utf-8"
  });
  form.parse(req, function(err, fields, files) {
    fs.rename(
      files.file[0].path,
      "./public/files/" + files.file[0].originalFilename,
      function(err) {
        if (err) {
          console.log("重命名失败");
        } else {
          resData.code = 0;
          resData.msg = "上传成功！";
          res.json(resData);
        }
      }
    );
  });
});



//gooup权限接口
router.get("/group", (req, res, next) => {
  let act = req.query.act;
  let grname,pid;
  switch (act) {
    case "add":
      grname = req.query.grname;
      if (!grname) {
        resData.code = -1;
        resData.msg = "用户组名不能为空";
        res.json(resData);
      } else {
        Group.findOne({ pname: grname }, (err, data) => {
          if (data && grname == data.pname) {
            resData.code = -3;
            resData.msg = "已存在用户组";
            res.json(resData);
          } else {
            Group.find({}, (err, data) => {
              let pid = data.length + 1;
              let grdesc = req.query.grdesc || null;
              let group = new Group({
              
                pid: pid,
                pname: grname,
                pdesc: grdesc,
                pstate: true
              });
              group.save((err, newgroup) => {
                resData.code = 0;
                resData.msg = "创建用户组成功！";
                resData.pid = newgroup.pid;
                resData.pname = newgroup.pname;
                resData.pdesc = newgroup.pdesc;
                resData.pstate = newgroup.pstate;
                res.json(resData);
              });
            });
          }
        });
      }
      break;
    case "get":
      pid = req.query.pid;
      if (pid) {
        Group.findOne({ pid: pid }, (err, data) => {
          if (!err) {
            resData.code = 0;
            resData.id = data.id;
            resData.pid = data.pid;
            resData.pname = data.pname;
            resData.pdesc = data.pdesc;
            resData.pstate = data.pstate;
            resData.msg = "查询成功";
            res.json(resData);
          } else {
            resData.code = -1;
            resData.msg = "参数错误";
            res.json(resData);
          }
        });
       
      } else {
        Group.find({}, (err, data) => {
          if (!err) {
            // console.log(data);
            resData.code = 0;
            resData.msg = "查询成功";
            let groupArr = [];
            for (let o of data) {
              let obj = {
                id: o.id,
                pid: o.pid,
                pname: o.pname,
                pdesc: o.pdesc,
                pstate: o.pstate
              };
              groupArr.push(obj);
            }
            resData.groupArr = groupArr;
            res.json(resData);
          } else {
            resData.code = -1;
            resData.msg = "参数错误";
            res.json(resData);
          }
        });
      }
      break;
      case 'delgroup':
      let id = req.query.id;
      console.log(id)
      if(!id){
        resData.code = -3;
        resData.msg = "参数错误！或者当前用户不可删除" ;
        res.json(resData);
      }else{
        Group.remove({ _id: id }, err => {
          if (!err) {
            resData.code = 0;
            resData.msg = "用户组删除成功";
            res.json(resData);
          } else {
            resData.code = -1;
            resData.msg = "删除失败";
            res.json(resData);
          }
        });

      }
    
      break;
  }
});

//list接口
router.get("/list", (req, res, next) => {
  let act = req.query.act;
  let listid, newname;
  switch (act) {
    case "add":
      newname = req.query.newname;
      listid = req.query.listid;
      if (!newname) {
      
        resData.code = -1;
        resData.msg = "参数错误";
        res.json(resData);
      } else {
        newname = newname.replace("\n", "");
        let list = new List({
          newname: newname,
          listid: listid
        });
        list.save((err, newlist) => {
          resData.code = 0;
          resData.msg = "提交成功！";
          resData.newName = newlist.newname;
          resData.listid = newlist.listid;
          resData.id = newlist.id;
          res.json(resData);
        });
      }
      break;
  }
});
//admin_user
router.get("/user", (req, res, next) => {
  let act = req.query.act;
  let username, password, id, key;
  switch (act) {
    //添加新会员
    case "add":
      username = req.query.username;
      password = req.query.password;
      if (!username) {
        resData.code = -1;
        resData.msg = "用户名不能为空";
        res.json(resData);
      } else {
        User.findOne({ username: username }, (err, data) => {
          if (data && username == data.username) {
            resData.code = -3;
            resData.msg = "用户名有相同不能注册";
            res.json(resData);
          } else {
            if (!password) {
              resData.code = -2;
              resData.msg = "密码不能为空！";
              res.json(resData);
            } else {
              User.find({}, (err, data) => {
                let time = +new Date();
                let adminEmail = req.query.email || null;
                let adminPhone = req.query.phone || null;
                let adder = req.query.adder || "注册用户";
                let userstate = req.query.userstate || true;
                let sex = req.query.sex;
              
                let user = new User({
                  username: username,
                  password: password,
                  adminEmail: adminEmail,
                  adminPhone: adminPhone,
                  adder: adder,
                  time: time,
                  sex:sex,
                  userstate: userstate
                });
                user.save((err, newuser) => {
                  resData.code = 0;
                  resData.msg = "提交成功！";
                  resData.username = newuser.username;
                  resData.password = newuser.password;
                  resData.adminEmail = newuser.adminEmail;
                  resData.id = newuser.id;
                  resData.sex = newuser.sex;
                  resData.adminPhone = newuser.adminPhone;
                  resData.adder = newuser.adder;
                  resData.time = newuser.time;
                  resData.userstate = newuser.userstate;
                  res.json(resData);
                });
              });
            }
          }
        });
      }
      break;
    case "userUpdate":
      key = req.query.key;
      User.findOne({ _id: key }, (err, data) => {
        if (!err) {
          let adminEmail = req.query.email;
          let adminPhone = req.query.phone;
          let sex = req.query.sex;
          let password =
            req.query.password == "undefined"
              ? data.password
              : req.query.password;
          let userstate = req.query.userstate || true;
          let upObj = {
            adminEmail: adminEmail,
            adminPhone: adminPhone,
            sex:sex,
            password: password,
            userstate: userstate
          };
          User.update({ _id: key }, upObj, (err, data) => {
            if (!err) {
              resData.code = 0;
              resData.msg = "更新成功！";
              resData.upObj = upObj;
              resData.id = data.id;
              res.json(resData);
            } else {
              resData.code = -1;
              resData.msg = "更新失败";
              res.json(resData);
            }
          });
        }
      });
      break;
    case "updataState":
      // let userstate = req.query.userstate;
      id = req.query.key;
      let userstate = req.query.userstate;
      User.update({ _id: key }, { userstate: userstate }, (err, data) => {
        if (!err) {
          resData.code = 0;
          resData.msg = "状态更新成功！";
          resData.userstate = userstate;
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = "状态更新失败！";
          res.json(resData);
        }
      });

      break;
    case "del":
      id = req.query.id;
      User.remove({ _id: id }, err => {
        if (!err) {
          resData.code = 0;
          resData.msg = "用户删除成功";
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = "删除失败";
          res.json(resData);
        }
      });
      break;
    //获取全部会员列表
    case "getAllUser":
      User.find({}, (err, data) => {
        if (err) {
          resData.code = -1;
          resData.msg = "参数错误";
          res.json(resData);
        } else {
          resData.code = 0;
          resData.msg = "查询成功";
          let arr = [];
          for (let o of data) {
            let obj = {
              id: o.id,
              username: o.username,
              password: o.password,
              adminEmail: o.adminEmail,
              adminPhone: o.adminPhone,
              sex:o.sex,
              adder: o.adder,
              time:o.time,
              userstate: o.userstate
            };
            arr.push(obj);
          }
          resData.arr = arr;
          res.json(resData);
        }
      });
      break;
    //通过会员名称获取单个会员信息
    case "getOneUser":
      username = req.query.username;
      if (!username) {
        resData.code = -1;
        resData.msg = "参数错误";
        res.json(resData);
      } else {
        User.findOne({ username: username }, (err, data) => {
          if (!data) {
            resData.code = -2;
            resData.msg = "没有找到您查询的会员！";
            res.json(resData);
          } else {
            resData.code = 0;
            resData.msg = "查询成功";
            let arr = [];
            let obj = {
              id: data.id,
              sex:data.sex,
              username: data.username,
              password: data.password,
              adminEmail: data.adminEmail,
              adminPhone: data.adminPhone,
              adder: data.adder,
              time:data.time,
              userstate: data.userstate
            };
            arr.push(obj);
            resData.arr = arr;
            res.json(resData);
          }
        });
      }
      break;
  }
});

//weibo
router.get("/weibo", (req, res, next) => {
  let act = req.query.act;
  let id, content;
  const PAGE_SIZE = 6;
  console.log(act);
  switch (act) {
    case "add":
      content = req.query.content;
      let num = req.query.index;
      console.log(num);
      if (!content) {
        resData.code = -1;
        resData.msg = "参数错误";
        res.json(resData);
      } else {
        let time = +new Date();
        content = content.replace("\n", "");

        let weibo = new Weibo({
          content: content,
          time: time,
          like: 0,
          dislike: 0,
          index: num
        });
        weibo.save((err, newWeiboInfo) => {
          resData.code = 0;
          resData.msg = "提交成功！";
          resData.id = newWeiboInfo._id;
          resData.time = newWeiboInfo.time;
          resData.index = newWeiboInfo.index;
          resData.content = newWeiboInfo.content;
          res.json(resData);
        });
      }
      break;
    case "get_page_count":
      Weibo.count({}, (err, n) => {
        resData.code = 0;
        resData.msg = "页数获取成功！当前设置为" + PAGE_SIZE + "条数据一分页";
        resData.count = Math.ceil(n / PAGE_SIZE);
        res.json(resData);
      });
      break;
    case "getOne":
      let id = req.query.id;
      Weibo.findOne({ _id: id }, (err, data) => {
        if (err) {
          resData.code = -1;
          resData.msg = "参数错误";
          res.json(resData);
        } else {
          resData.msg = "查询成功";
          resData.id = data.id;
          resData.content = data.content;
          resData.time = data.time;
          resData.like = data.like;
          resData.index = data.index;
          resData.dislike = data.dislike;
          resData.alldata = data;

          res.json(resData);
        }
      });
      break;

    case "index":
      let id1 = req.query.id;
      Weibo.findOne({ _id: id1 }, (err, data) => {
        if (err) {
          resData.code = -1;
          resData.msg = "参数错误";
          res.json(resData);
        } else {
          resData.msg = "查询成功";

          resData.index = data.index;

          res.json(resData);
        }
      });
      break;

    case "get":
      let page = Number(req.query.page);
      if (!page) {
        resData.code = -1;
        resData.msg = "参数错误";
        res.json(resData);
      } else {
        Weibo.find({})
          .sort("-time")
          .skip(PAGE_SIZE * (page - 1))
          .limit(PAGE_SIZE)
          .exec((err, data) => {
            let arr = [];
            for (let o of data) {
              let obj = {
                id: o._id,
                content: o.content,
                time: o.time,
                like: o.like,
                dislike: o.dislike,
                index: o.index
              };
              arr.push(obj);
            }
            res.json(arr);
          });
      }
      break;
    case "like":
      id = req.query.id;
      Weibo.findOne({ _id: id }, (err, data) => {
        if (err) console.log(err);
        data.like = data.like + 1;
        data.save(err => {
          if (!err) {
            resData.code = 0;
            resData.msg = "点赞成功";
            res.json(resData);
          } else {
            resData.code = -1;
            resData.msg = "点赞失败";
            res.json(resData);
          }
        });
      });
      break;
    case "dislike":
      id = req.query.id;
      Weibo.findOne({ _id: id }, (err, data) => {
        if (err) console.log(err);
        data.dislike = data.dislike + 1;
        data.save(err => {
          if (!err) {
            resData.code = 0;
            resData.msg = "踩成功";
            res.json(resData);
          } else {
            resData.code = -1;
            resData.msg = "踩失败";
            res.json(resData);
          }
        });
      });
      break;
    case "del":
      id = req.query.id;
      Weibo.remove({ _id: id }, err => {
        if (!err) {
          resData.code = 0;
          resData.msg = "删除成功";
          res.json(resData);
        } else {
          resData.code = -1;
          resData.msg = "删除失败";
          res.json(resData);
        }
      });
      break;
    default:
      resData.code = -1;
      resData.msg = "参数错误";
      res.json(resData);
  }
});

module.exports = router;
