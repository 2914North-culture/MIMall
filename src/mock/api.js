import Mock from 'mockjs';
Mock.mock('/api/user/login',{
    "status": 0,
    "data": {
        "id|00000-10000": 0,
        "username": "@name",
        "email": "2849389833@qq.com",
        "phone": 18882564435,
        "role": 0,
        "createTime": 455601546875,
        "updateTime": 785245787451
    },
    "msg": '登录失败，请重试！'
});