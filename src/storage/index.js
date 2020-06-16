/**
 * Storage封装
 */
const STORAGE_KEY = 'mall';
export default {
    // 存储值
    _setItem (key,value,module_name) {
        if(module_name){
            if(!this._getStorage()[module_name]) return;
            let val = this._getItem(module_name);
            val[key] = value;
            this._setItem(module_name,val);
        }else{
            let val = this._getStorage();
            val[key] = value;
            window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));
        }
    },
    // 获取值
    _getItem (key,module_name) {
        if(module_name){    // 这里判断的是moule_name参数名，说明这里能保证是两个参数，所以判断里的key是存在的
            if(!this._getStorage()[module_name] || !this._getStorage()[key]) return;
            let val = this._getItem(module_name); // 因为这里只传了一个参数，所以这里的module_name相当于key
            if(val) return val[key];
         }
        return this._getStorage()[key];
    },
    // 获取整个Storage数据
    _getStorage () {
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
    },
    // 用于清空某一个值
    _clear (key,module_name) {
        let val = this._getStorage();
        if(module_name){
            if(!val[module_name]) return;
            delete val[module_name][key];
        }else{
            delete val[key];
        }
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));
    }
}

