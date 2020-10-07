import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

class PhotoDisplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouse_down: false,
            start_x: 0,
            start_y: 0,
            x: 0,
            y: 0,
            choice: null,
            cover_opacity:0
        };
        this.on_mouse_down = this.on_mouse_down.bind(this);
        this.on_mouse_up = this.on_mouse_up.bind(this);
        this.on_mouse_move = this.on_mouse_move.bind(this);        
    }
    get_event_cordinates(e) {
        if(e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel'){
            var touch = e.touches[0] || e.changedTouches[0];
            return {x: touch.pageX, y: touch.pageY};
        } else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover'|| e.type ==='mouseout' || e.type ==='mouseenter' || e.type ==='mouseleave') {

            return {x: e.clientX, y: e.clientY};
        }
    }
    on_mouse_down(e) {
        let cords = this.get_event_cordinates(e);
        this.setState({mouse_down:true, start_x: cords.x, start_y: cords.y});
    }
    on_mouse_up(e) {
        if (this.state.choice !== null)
            if (this.state.choice)
                this.props.photo_action("like");
            else
                this.props.photo_action("unlike");
            this.setState({start_x: 0, start_y: 0, x:0, y:0,choice:null, mouse_down: false, cover_opacity: 0});
        
    }
    on_mouse_move(e) {
        if (this.state.mouse_down) {
            let cords = this.get_event_cordinates(e);
            let state = {x: cords.x - this.state.start_x, y: cords.y - this.state.start_y, cover_opacity: 0, choice: null};
            let x_ratio = state.x / (window.screen.width/4);
            if (Math.abs(x_ratio) > 0.3)
            {
                state.cover_opacity = 0.5 * Math.abs(x_ratio);
                if (x_ratio > 0)
                    state.choice = true;
                else
                    state.choice = false
            }
            this.setState(state);
        }
    }
    render() {
        return (
            <div className="photo-display-wrapper">
                <div className="photo-display" onTouchMove={this.on_mouse_move} onTouchStart={this.on_mouse_down} onTouchEnd={this.on_mouse_up}
             onMouseMove={this.on_mouse_move} onMouseDown={this.on_mouse_down} onMouseUp={this.on_mouse_up} 
              style={{position: "relative", left: `${this.state.x}px`, top: `${this.state.y}px`}} >
                    
                    <div className="cover" style={{opacity: this.state.cover_opacity}}>
                        <div className="content">{this.state.choice ? <FontAwesomeIcon icon={faHeart} />: ":("}</div>
                    </div>
                    <img src={this.props.img} />
                </div>
            </div>
        );
  }
}


export default PhotoDisplayer;
