var express = require('express');
var app = express();
var request = require('request');
var qs = require('qs');

/* 微信登陆 */
var AppID = 'wx91e9f36911f1c6d6';
var AppSecret = '52f517b3a00a3136b0c399027e3ea886';

app.get('/wx_login', function(req, res, next) {
  // 第一步：用户同意授权，获取code
  var return_uri = 'http://192.168.1.100:8800/get_wx_access_token';
  var scope = 'snsapi_userinfo';
  res.redirect(
    'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      AppID +
      '&redirect_uri=' +
      return_uri +
      '&response_type=code&scope=' +
      scope +
      '&state=STATE#wechat_redirect'
  );
});

app.get('/get_wx_access_token', function(req, res, next) {
  // 第二步：通过code换取网页授权access_token
  var code = req.query.code;
  request.get(
    {
      url:
        'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' +
        AppID +
        '&secret=' +
        AppSecret +
        '&code=' +
        code +
        '&grant_type=authorization_code'
    },
    function(error, response, body) {
      if (response.statusCode == 200) {
        // 第三步：拉取用户信息(需scope为 snsapi_userinfo)
        //console.log(JSON.parse(body));
        var data = JSON.parse(body);
        var access_token = data.access_token;
        var openid = data.openid;

        request.get(
          {
            url:
              'https://api.weixin.qq.com/sns/userinfo?access_token=' +
              access_token +
              '&openid=' +
              openid +
              '&lang=zh_CN'
          },
          function(error, response, body) {
            if (response.statusCode == 200) {
              // 第四步：根据获取的用户信息进行对应操作
              var userinfo = JSON.parse(body);
              //console.log(JSON.parse(body));
              console.log('获取微信信息成功！');
              var resUrl =
                'http://192.168.1.100:8080?' +
                qs.stringify({
                  nickname: userinfo.nickname,
                  headimgurl: userinfo.headimgurl,
                  city: userinfo.city,
                  province: userinfo.province,
                  openId: openid
                });
              res.redirect(resUrl);
              // 小测试，实际应用中，可以由此创建一个帐户
              // res.send(
              //   '\
              //                   <h1>' +
              //     userinfo.nickname +
              //     " 的个人信息</h1>\
              //                   <p><img src='" +
              //     userinfo.headimgurl +
              //     "' /></p>\
              //                   <p>" +
              //     userinfo.city +
              //     '，' +
              //     userinfo.province +
              //     '，' +
              //     userinfo.country +
              //     '</p>\
              //               '
              // );
            } else {
              console.log(response.statusCode);
            }
          }
        );
      } else {
        console.log(response.statusCode);
      }
    }
  );
});

var hostName = '192.168.1.100';
app.listen(8800, function() {
  console.log(`服务器运行在http://${hostName}:8800`);
});
