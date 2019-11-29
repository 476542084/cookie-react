import fetch from '../config/fetch'

const url = '/api'

//注册
export const register = (phone, code, password, password2, username) => fetch(url + '/register/', {
    phone,
    code,
    password,
    password2,
    username
}, 'POST')

//账号登录
export const accountLogin = (username, password) => fetch(url + '/login/', {
    username,
    password
}, 'POST')

//手机登录
export const phoneLogin = (phone, code) => fetch(url + '/login_phone\\', {
    phone,
    code
}, 'POST')

//验证手机验证码
export const checkPhone = (phone, code) => fetch(url + '/phone_check\\', {
    phone,
    code
}, 'POST')

//重设密码
export const resetPassword = (userId, password, password2, phone, code) => fetch(url + `/password_forget/${userId}/`, {
    password,
    password2,
    code,
    phone
}, 'PUT')

//获取验证码
export const getIdentiyingCode = phone => fetch(url + '/phone_send_code/', {
    phone 
}, 'POST')

//获取自己信息
export const getOwnInfo = userId => fetch(url + `/userinfo_detail/${userId}/`)

//获取用户信息
export const getUserInfo = userId => fetch(url + `/userinfo_detail/${userId}/`)

//获取地点列表
export const getLocationList = () => fetch(url + '/userinfo_location_list/')

//更新用户资料
export const updateUserSettings = (userId, sex, bio, location, birth_date) => fetch(url + `/userinfo_update/${userId}/`, {
    sex: sex,
    bio: bio,
    location: location,
    birth_date: birth_date
}, 'PUT')

//更新用户头像
export const updateUserPicture = (userId, pic) => fetch(url + `/userinfo_update_pic/${userId}/`, 
    pic
, 'PUT', true)

//获取topic列表
export const getTopicList = () => fetch(url + '/topic_list/')

//上传内容图片
export const postPicUpload = (formData) => fetch(url + `/post_pic_upload/`, 
    formData
, 'POST', true)

//发布帖子
export const postCreate = (formData) => fetch(url + `/post_create/`, 
    formData
, 'POST', true)

//获取全部热帖列表
export const getAllPosts = (page) => fetch(`${url}/post_list/?ordering=-updated_date&page=${page}`)

//获取指定topic帖子列表
export const getTopicPosts = (topicId, page) => fetch(`${url}/post_list/?topic=${topicId}&ordering=-updated_date&-stick_top&page=${page}`)

//获取用户帖子列表
export const getUserPosts = (userId, page) => fetch(`${url}/post_list/?author=${userId}&ordering=-published_date&page=${page}`)

//获取首页帖子
export const getIndexFeatured = () => fetch(`${url}/post_list_featured/`)

//获取帖子详情
export const getPostDetail = (postId) => fetch(`${url}/post_detail/${postId}/`)

//获取帖子评论
export const getPostComments = (id, page) => fetch(`${url}/post_detail/${id}/comments/?page=${page}`)

//点赞
export const like = (obj_id, obj_type) => fetch(`${url}/like_create/`, {
    obj_id,
    obj_type
}, 'POST')

//帖子是否已点赞
export const postIsLiked = (id) => fetch(`${url}/post_detail/${id}/is_liked/`, {
    id
})

//评论是否已点赞
export const commentIsLiked = (id) => fetch(`${url}/comment_detail/${id}/is_liked/`, {
    id
})

//多级评论是否已点赞
export const subcommentIsLiked = (id) => fetch(`${url}/subcomment_detail/${id}/is_liked/`, {
    id
})

//发布帖子评论
export const createComment = (formData) => fetch(`${url}/comment_create/`, 
    formData
, 'POST', true)

//发布多级评论
export const createSubcomment = (comment, text) => fetch(`${url}/subcomment_create/`, {
    comment,
    text
}, 'POST')

//删除评论
export const deleteComment = (id) => fetch(`${url}/comment_delete/${id}/`, {}, 'DELETE')

//删除多级评论
export const deleteSubcomment = (id) => fetch(`${url}/subcomment_delete/${id}/`, {}, 'DELETE')

//查看用户关系
export const checkUserFollowed = (id) => fetch(`${url}/userfollow_lookup/${id}/`)

//新增用户关系
export const userFollow = (followee) => fetch(`${url}/userfollow_create/`, {
    followee
}, 'POST')

//删除用户关系
export const userUnfollow = (id) => fetch(`${url}/userfollow_delete/${id}/`, {}, 'DELETE')

//获取评论内容
export const getComment = (id) => fetch(`${url}/comment_detail/${id}/`)

//获取评论多级评论内容
export const getCommentSubcomments = (id, page) => fetch(`${url}/comment_detail/${id}/subcomments/?page=${page}`)

//获取用户主页评论
export const getUserComments = (id, page) => fetch(`${url}/userinfo_detail/${id}/comments/?page=${page}`)

//获取用户主页粉丝
export const getUserFans = (id, page) => fetch(`${url}/userinfo_detail/${id}/fans/?page=${page}`)

//获取用户主页关注
export const getUserFollowing = (id, page) => fetch(`${url}/userinfo_detail/${id}/following/?page=${page}`)

//获取用户主页关注帖子
export const getUserFollowedPosts = (id, page) => fetch(`${url}/userinfo_detail/${id}/following_posts/?page=${page}`)

//获取用户主页点赞
export const getUserLikes = (id, page) => fetch(`${url}/userinfo_detail/${id}/likes/?page=${page}`)

//获取用户主页推荐
export const getUserRecommendations = (id, page) => fetch(`${url}/userinfo_detail/${id}/recommendations/?page=${page}`)