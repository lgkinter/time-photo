import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import imageURL from './images/100-photos-1.jpg';

const imageWidth = 821;
const imageHeight = 559;

class App extends Component {
  componentDidMount() {
    this.canvas = d3.select(this.refs.canvas);
    this.ctx = this.refs.canvas.getContext('2d');
    // set canvas width and height
    this.refs.canvas.height = imageHeight;
    this.refs.canvas.width = imageWidth;

    var img = new Image();
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
    };
    img.src = imageURL;
  }

  render() {
    return (
      <div className="App">
        <canvas ref="canvas" />
      </div>
    );
  }
}

export default App;
