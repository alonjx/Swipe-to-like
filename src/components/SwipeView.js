import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud } from '@fortawesome/free-solid-svg-icons'
import PhotoDisplayer from './PhotoDisplayer';
import $ from 'jquery';


class SwipeView extends Component {
    constructor(props) {
        super(props);
        this.state = {img_path:""};
        this.load_photo = this.load_photo.bind(this);
        this.photo_action = this.photo_action.bind(this);
    }
    photo_action(action) {
        let image_id =  this.state.img_path.split("id=");
        image_id = image_id[image_id.length - 1];
        $.get("/image_action?id=" + image_id + "&action=" + action, (data) => {
            this.load_photo();
        },"json");
    }
    load_photo() {
        $.get("/next_image", (data) => {
            this.setState({img_path: data}); 
        }, "json").fail(() => {this.setState({img_path: ""});});
    }
    componentDidMount() {
        this.load_photo();
    }
    render() { 
        return (        
            <div className="wrapper">
                {this.state.img_path ? <PhotoDisplayer img={this.state.img_path} photo_action={this.photo_action}/> : 
                    <div className="no-pic"><div className="thumbnail"><FontAwesomeIcon icon={faCloud} /></div>No more unfiltered pictures</div>}
            </div>
        );
    }
}

export default SwipeView;
