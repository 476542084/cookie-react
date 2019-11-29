import React, { Component } from 'react'
import IndexFeatured from './index/indexFeatured/IndexFeatured'
import IndexTopics from './index/indexTopics/IndexTopics'
import ForumHeader from './forum/forumHeader/ForumHeader'
import { getTopicList } from '@/api/getData'

class Index extends Component{
    constructor(props){
        super(props)

        this.state = {
            topics: []
        }
    }


    componentDidMount = async () => {
        try {
            const data = await getTopicList()
            if (data.status === 200) {
                this.setState({topics: [...data]})
            } else {
                console.log(data.msg)
            }
        }
        catch {
            console.log('api data error')
        }
    }


    render() {
        return(
            <main>
                <IndexFeatured />
                <ForumHeader value='热门分类' />
                <IndexTopics topics={this.state.topics} />
            </main>
        )
    }
}

export default Index;