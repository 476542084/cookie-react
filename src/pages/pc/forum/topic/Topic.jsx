import React, { Component } from 'react'
import ForumHeader from '../forumHeader/ForumHeader'
import TopicsList from './topicsList/TopicsList'
import Posts from '../topicPosts/TopicPosts'
import Scrollbar from '@/components/common/scrollbar/Scrollbar'
import { getTopicList, getAllPosts, getTopicPosts } from '@/api/getData'

class Topic extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            page: 1,
            posts: [],
        }
    }


    storeTopicData = async () => {
        try {
            if (this.state.topicId === 'all') {
                this.setState({topic: '全部热帖', page: 1})
                this.getPostData(1)
            } else if (this.state.topicId) {
                for (let i = 0; i < this.state.topics.length; i++) {
                    if (this.state.topics[i].id === parseInt(this.state.topicId)) {
                        this.setState({topic: this.state.topics[i].title, page: 1})
                    }
                }
                this.getPostData(1)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    getPostData = async (page) => {
        if (this.state.topicId === 'all') {
            const postData = await getAllPosts(page)
            if (postData.status === 200) {
                this.setState({
                    posts: postData.results,
                    pages: Math.ceil(postData.count / 12)
                })
            }
        } else if (this.state.topicId) {
            const postData = await getTopicPosts(this.state.topicId, page)
            if (postData.status === 200) {
                console.log(postData)
                this.setState({
                    posts: postData.results,
                    pages: Math.ceil(postData.count / 12)
                })
            }
        }
    }


    componentDidMount = async () => {
        const topicId = window.location.href.split('/')[window.location.href.split('/').indexOf('topics') + 1]
        this.setState({topicId: topicId})
        const data = await getTopicList()
        if (data.status === 200) {
            this.setState({topics: [...data]})
        } else {
            console.log(data.msg)
        }
        this.storeTopicData()
    }


    changeTopic = (e) => {
        this.setState({topicId: e.currentTarget.id}, () => this.storeTopicData())
    }


    firstPage = () => {
        const page = 1
        if (page) {
            this.setState({page: page}, async () => {
                await this.getPostData(page)
                window.scrollTo(0, 0)
            })
        }
    }


    previousSkipPage = () => {
        const page = this.state.page - 2
        if (page) {
            this.setState({page: page}, async () => {
                await this.getPostData(page)
                window.scrollTo(0, 0)
            })
        }
    }


    prevPage = () => {
        const page = this.state.page - 1
        if (page) {
            this.setState({page: page}, async () => {
                await this.getPostData(page)
                window.scrollTo(0, 0)
            })
        }
    }


    nextPage = () => {
        const page = this.state.page + 1
        if (page <= this.state.pages) {
            this.setState({page: page}, async () => {
                await this.getPostData(page)
                window.scrollTo(0, 0)
            })
        }
    }


    nextSkipPage = () => {
        const page = this.state.page + 2
        if (page <= this.state.pages) {
            this.setState({page: page}, async () => {
                await this.getPostData(page)
                window.scrollTo(0, 0)
            })
        }
    }


    lastPage = () => {
        const page = this.state.pages
        if (page <= this.state.pages) {
            this.setState({page: page}, async () => {
                await this.getPostData(page)
                window.scrollTo(0, 0)
            })
        }
    }


    render() {
        const pageMethods = {
            firstPage: this.firstPage,
            previousSkipPage: this.previousSkipPage,
            prevPage: this.prevPage,
            nextPage: this.nextPage,
            nextSkipPage: this.nextSkipPage,
            lastPage: this.lastPage
        }
        return (
            <React.Fragment>
                <TopicsList changeTopic={this.changeTopic} />
                <ForumHeader value={this.state.topic} />
                <Posts posts={this.state.posts} />
                <Scrollbar methods={pageMethods} page={this.state.page} pages={this.state.pages} />
            </React.Fragment>
        )
    }
}

export default Topic
