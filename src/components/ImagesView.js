import React, { Component } from 'react';
import $ from 'jquery';

class ImagesView extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        
    }
    load_data(type) {
    	$.get("/images?type=" + type, (data) => {
            this.setState({data:data});
        },"json");
    	
    }
    componentDidMount() {
        this.load_data(this.props.type);
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props)
            this.load_data(this.props.type);
    }
    render() {
        const images = [];
        for(const [index, value] of this.state.data.entries())
            images.push(<div className="thumbnail" key={index}><img src={value} alt="image" /></div>);
        return (
    		<div className="images-view">
    			{images}
    		</div>
    		);
    }
}

export default ImagesView;