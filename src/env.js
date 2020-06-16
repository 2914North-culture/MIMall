let baseURL;

switch(process.env.NODE_ENV){
    // 在判断运行环境的时候 如果出错的话 可以在src下创建  .env.[测试环境] 测试环境就是package.json的script里定义项里的--mode后面指定值
    case 'development':
        baseURL = 'http://dev-mall-pre.springboot.cn/api';
        break;
    case 'test':
        baseURL = 'http://test-mall-pre.springboot.cn/api';
        break;
    case 'production':
        baseURL = 'http://mall-pre.springboot.cn/api';
        break;
    default:
        baseURL = 'http://mall-pre.springboot.cn/api';
        break;
}

export default {
    baseURL
}