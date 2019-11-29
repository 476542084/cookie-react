// 全局配置

let baseUrl = ''
let imgUrl
if (process.env.NODE_ENV === 'development'){
  imgUrl = '//cookie/api'
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = '//cookie/api'
  imgUrl = '//cookie/api'
}

export  {
  baseUrl,
  imgUrl
}

