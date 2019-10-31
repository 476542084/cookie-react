import Mock from 'mockjs'

export default Mock.mock('/user', 'get', {
    success:true,
    "data": {
        "fullName": "@CNAME", // 随机生成中文人名
        'userId|5':'',
      }
})