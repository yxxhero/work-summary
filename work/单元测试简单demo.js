// test.js文件写个方法。
function hi() {
  var a = 1, b = 2;
  return a + b;
}
module.exports = hi;

// test文件夹下，专门放测试文件
// 01_user.js
var assert = require('assert');    //用的是https://mochajs.org/
const hi = require('../src/services/test');
describe('UserController', () => {  //UserController只是一个名字，做标记而已
  it('测试1', function () {
    assert.notEqual(hi(), 'hi')
  })
  it('测试2', function () {
    const num = hi()
    assert.equal(num, 5)
  })
  it('测试3', function () {
    assert.equal(5, 5)
  })
})
//执行命令 npm test



//---------------------------------------------------------------------------- 

// 测试接口，案例：
/* global agent, authToken */
describe('AuthController', () => {
  describe('用户认证', () => {
    it('用户注册', done => {
      const userdata = {
        name: '邮箱注册用户',
        email: 'testregister@sample.com',
        mobile: '13312341234',
        password: '123456',
        username: 'test'
      };
      agent
        .post(`/authorization/signup?redirect=${encodeURIComponent('http://localhost/somewhere')}`)
        .send(userdata)
        .expect(res => {
          res.headers.should.have.property('location').match(/http:\/\/localhost\/somewhere/);
        })
        .expect(302, done);
    });

    it('用户邮箱登陆', done => {
      const userdata = {
        email: 'testregister@sample.com',
        password: '123456'
      };
      agent
        .post(`/authorization/signin?redirect=${encodeURIComponent('http://localhost/somewhere')}`)
        .send(userdata)
        .expect(res => {
          const redirectPattern = /http:\/\/localhost\/somewhere/;
          res.headers.should.have.property('location').match(redirectPattern);
        })
        .expect(302, done);
    });

    it('用户名登陆', done => {
      const userdata = {
        username: 'test',
        password: '123456'
      };
      agent
        .post(`/authorization/signin?redirect=${encodeURIComponent('http://localhost/somewhere')}`)
        .send(userdata)
        .expect(res => {
          const redirectPattern = /http:\/\/localhost\/somewhere/;
          res.headers.should.have.property('location').match(redirectPattern);
        })
        .expect(302, done);
    });

    it('手机号登陆', done => {
      const userdata = {
        mobile: '13312341234',
        password: '123456'
      };
      agent
        .post('/authorization/signin')
        .send(userdata)
        .expect(res => {
          res.body.should.have.property('access_token');
          global.authToken = res.body.access_token;
        })
        .expect(200, done);
    });
  });

  describe('POST /password', () => {
    it('用户更新密码', done => {
      const userdata = {
        password: '123456789',
        oldpassword: '123456'
      };
      agent
        .post('/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send(userdata)
        .expect(res => {
          res.body.should.have.property('access_token');
          global.authToken = res.body.access_token;
        })
        .expect(200, done);
    });

    it('未认证请求:401 Unauthorized', done => {
      const userdata = {
        password: '123456',
        oldpassword: '123456789'
      };
      agent
        .post('/password')
        .send(userdata)
        .expect({
          error: 'Unauthorized',
          statusCode: 401,
          message: '未认证的请求'
        }, done);
    });

    it('错误的老密码:401 Unauthorized', done => {
      const userdata = {
        password: '123456789',
        oldpassword: '123456'
      };
      agent
        .post('/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send(userdata)
        .expect({
          error: 'Unauthorized',
          statusCode: 401,
          message: '用户名或者密码错误'
        }, done);
    });

    it('密码长度不够:400 Bad Request', done => {
      const userdata = {
        password: '12345',
        oldpassword: '123456789'
      };
      agent
        .post('/password')
        .set('Authorization', `Bearer ${authToken}`)
        .send(userdata)
        .expect({
          error: 'Bad Request',
          statusCode: 400,
          message: '参数错误'
        }, done);
    });
  });
});


