/**
 * 存储localStoage
 * @param {*} name 
 * @param {*} content 
 */
export const setStore = (name, content) => {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  }
  
  /**
   * 获取localStorage
   * @param {*} name 
   */
  export const getStore = name => {
    if (!name) return
    return window.localStorage.getItem(name)
  }
  
  /**
   * 删除localStorage
   * @param {*} name 
   */
  export const removeStore = name => {
    if (!name) return
    window.localStorage.removeItem(name)
  }


  /**
   *
   *删除判断是否为移动设备
   * @returns
   */
  export const isMobile = () =>{
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    )return true;
    return false;
  }