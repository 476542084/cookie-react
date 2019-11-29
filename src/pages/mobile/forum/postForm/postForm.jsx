import React, {Component} from 'react'
import {compressImage, canvasToBlob, getObjectURL, parseDom} from '@/utils/commons'
import {postPicUpload, postCreate} from '@/api/getData'
import {Loading, postFormError} from '@/components/common/postFormDialog/postFormDialog'
import store from '@/store/store'
import E from 'wangeditor'
import styles from './postForm.module.css'
import './postForm.css'

class PostForm extends Component {
    state = {
        editor: null,
        title: '',
        coverFile: null,
        coverImage: '',
        topicLists: [{'value':1,'text':'饼干渣'},
                    {'value':2,'text':'原创'},
                    {'value':3,'text':'国潮'},
                    {'value':4,'text':'高街'},
                    {'value':5,'text':'时装'},
                    {'value':6,'text':'美式街头'},
                    {'value':7,'text':'暗黑先锋'},
                    {'value':8,'text':'日系'}],
        postError: [{'status':'default','text':'标题不能为空'},
                    {'status':'default','text':'必须上传封面图'},
                    {'status':'default','text':'必须上传两张以上的内容图'},
                    {'status':'default','text':'内容文字必须50字以上'}],
        topicSelected: 1
    }
    handleInputChange = e => {
        if(e.target.files[0]){
            //压缩
            compressImage(e.target.files[0] , 1200, 1200, 0.95).then(canvasToBlob).then((afterFile) => {
                let url = getObjectURL(afterFile)
                this.setState({'coverFile':afterFile})
                this.setState({'coverImage':url})
            })  
        }
    }
    handleChange = (item,e) => {
        this.setState({[item]: e.target.value})
    }
    checkPostForm = () => {
        let postError = this.state.postError
        this.state.title.trim() === '' ? postError[0].status  = 'error' : postError[0].status  = 'default'
        this.state.coverFile === null ? postError[1].status  = 'error' : postError[1].status  = 'default'
        this.patch(this.state.editor.txt.html(), '<img') < 2 ? postError[2].status  = 'error' : postError[2].status  = 'default'
        this.state.editor.txt.text().length <= 50 ? postError[3].status  = 'error' : postError[3].status  = 'default'
        this.setState({'postError':postError})
        let flag = postError.every(item => {return item.status == 'default'})
        return flag
    }
    //检测图片张数
    patch = (s, re) => {
        re = eval("/" + re + "/ig")
        return s.match(re) ? s.match(re).length : 0;
      }
    handleCoverImg = () =>{
        this.refs.refInput.click()
    }
    //首次监听句柄
    handleRemoveListener = () =>{
        if(this.state.editor.$textElem[0].innerText.trim() === '畅所欲言添加图片和文字内容(封面图片不在文章内容显示)'){
            this.state.editor.txt.clear()
            document.querySelector('.w-e-text').removeEventListener('click',this.handleRemoveListener)
        }
    }
    //上传
    handleUploadImg = async(formData) => {
        let div = document.querySelector('.w-e-text')
        Loading.showLoading()
        try {
            let res = await postPicUpload(formData)
            if(res.status == 200 || res.status == 201){
                for(let i = 0 ;i<res.files.length;i++){
                    this.state.editor.txt.append('<p><img src="'+res.files[i].url+'"></p><p><br></p>')
                    setTimeout(function(){div.scrollTop = div.scrollHeight},500)
                }
            }
            Loading.hideLoading()
        } catch (error) {
            Loading.hideLoading()
            console.log('error',error)
        }
        
    }
    //发布
    handlePostCreate = async() => {
        if(!this.checkPostForm()){
            postFormError.show()
            return
        }
        let formData = new FormData();
        formData.append('topic',this.state.topicSelected)
        formData.append('title',this.state.title)
        formData.append('content',this.state.editor.txt.html())
        formData.append('cover_image',this.state.coverFile)
        try {
            let res = await postCreate(formData)
            if(res.status == 200 || res.status == 201){
                this.props.history.push({pathname:`/post/${res.id}`})
            }
        } catch (error) {
            console.log('error',error)
        }
    }
    componentDidMount() {
        const elem = this.refs.editorElem
        const that = this
        this.state.editor = new E(elem)
        // 自定义菜单配置
        this.state.editor.customConfig.menus = [
            'bold',
            'link',
            'image',
            'list'
        ]
        this.state.editor.customConfig.onchange = html => {
            if(html.indexOf('畅所欲言添加图片和文字内容(封面图片不在文章内容显示)') > -1){
                document.querySelector('.w-e-text').removeChild(document.querySelector('.w-e-text').firstChild)
                that.state.editor.txt.clear()
            }
        }
        this.state.editor.customConfig.showLinkImg = false
        //自定义uploadImage
        this.state.editor.customConfig.customUploadImg = function (files, insert) {
            for(let i = 0 ; i<files.length;i++){
                compressImage(files[i] , 1200, 1200, 0.95).then(canvasToBlob).then(function(data){
                    let formData = new FormData();
                    formData.append('files',files[i])
                    that.handleUploadImg(formData)
                })
            }
        }
  
        this.state.editor.create()

        document.querySelector('.w-e-toolbar').appendChild(parseDom('<button type="button" id="btn-enter-mobile">发布<button>'))
        //监听首次点击

        document.querySelector('.w-e-text').addEventListener('click',this.handleRemoveListener)
        document.querySelector('#btn-enter-mobile').addEventListener('click',this.handlePostCreate)

        document.querySelector('.w-e-toolbar').addEventListener('click',this.handleRemoveListener,true)

        let id  =this.state.editor.imgMenuId
        document.querySelector(`#${id}`).addEventListener('click',function(e){
            e.preventDefault();
            document.querySelector('.w-e-icon-upload2').click()
            document.querySelector('.w-e-panel-container').length === 2 ? (document.querySelectorAll('.w-e-panel-container').style.display = 'none') : document.querySelector('.w-e-panel-container').style.display = 'none'
        })
    }
    render() {
        return (
            <div className={styles.container} id="post-form">
                <div className={styles['editor-left']}>
                    <div className={styles.top}>
                        <div className={styles.title}>
                            <input type="text" value={this.state.title} onChange={this.handleChange.bind(this,'title')}  maxLength={30} id={styles['id_title']} placeholder="好的标题可以吸引更多读者" />
                        </div>
                        <div className={styles.select}>
                        <select defaultValue={this.state.topicSelected} onChange={this.handleChange.bind(this,'topicSelected')} name="topic" className={styles['form-control']}>
                            {this.state.topicLists.map((item,index) =>
                                <option key={index} value={item['value']}>{item['text']}</option>
                            )}
                        </select>
                        </div>
                        <div onClick={this.handleCoverImg.bind(this)} className={styles.covers}>
                            {this.state.coverImage !== '' ?
                            <img src={this.state.coverImage} />
                            :<span >添加封面图</span>
                            }
                        </div>
                        <input id={styles['id_cover_image']} onChange={this.handleInputChange.bind(this)} ref="refInput" type="file" accept="image/png, image/jpeg, image/pjpeg"/>
                    </div>
                    <div className={styles.bottom}>
                        <div id={styles.toolbar}>
                        </div>
                        <div  ref="editorElem" id={styles.editor}>
                        <p style={{color: '#999999'}}><span>畅所欲言添加图片和文字内容(封面图片不在文章内容显示)</span></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default PostForm