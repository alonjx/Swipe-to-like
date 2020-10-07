import React, { Component } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faThumbsUp , faThumbsDown} from '@fortawesome/free-solid-svg-icons'
import SwipeView from './components/SwipeView';
import ImagesView from './components/ImagesView';


class App extends Component {
    constructor(props) {
        super(props);
        this.views = {swipe: <SwipeView />, liked_view: <ImagesView type="liked" />, unliked_view: <ImagesView type="unliked" />};
        this.state = {current_view: this.views.swipe};
        this.changeView = this.changeView.bind(this);
    }
    changeView(view) {
        this.setState({current_view: view});
    }
    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <div className="left">
                        <div className="logo">SwipeToLike</div>
                    </div>
                    <div className="right">
                        <div className="btn" onClick={() => this.changeView(this.views.liked_view)}><FontAwesomeIcon icon={faThumbsUp} /> Liked</div>
                        <div className="btn" onClick={() => this.changeView(this.views.unliked_view)}><FontAwesomeIcon icon={faThumbsDown} /> Unliked</div>
                        <div className="btn" onClick={() => this.changeView(this.views.swipe)}><FontAwesomeIcon icon={faHome} /></div>

                    </div>
                </header>
                {this.state.current_view}
            </div>
        );
    }
}

export default App;
