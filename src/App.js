import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as d3 from 'd3';
import clusterfck from 'clusterfck';
import imageURL from './images/100-photos-1.jpg';

const imageWidth = 821;
const imageHeight = 559;

class App extends Component {
  componentDidMount() {
    this.canvas = d3.select(this.refs.canvas);
    this.ctx = this.refs.canvas.getContext('2d');

    // set canvas width and height
    this.refs.canvas.height = 2 * imageHeight;
    this.refs.canvas.width = 2 * imageWidth;

    var img = new Image();
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, imageWidth, imageHeight);

      // get the colors
      let data = this.ctx.getImageData(0, 0, imageWidth, imageHeight).data;
      let colors = [];
      for (let x = 0; x < imageWidth; x += 12) {
        for (let y = 0; y < imageHeight; y += 12) {
          let offset = x * 4 + y * 4 * imageWidth;
          let color = [data[offset + 0], data[offset + 1], data[offset + 2]];
          colors.push(color);
        }
      }

      // cluster the colors
      let clusters = clusterfck.hcluster(colors, 'euclidean', 'complete', 75);
      let x = 0;
      let swatchSize = 2;
      clusters = clusters.map(hcluster => {
        let cluster = this.leaves(hcluster); //flatten the cluster
        let groupWidth = Math.ceil(Math.sqrt(cluster.length));
        console.log(groupWidth);
        cluster.forEach((leaf, i) => {
          let swatchX = x + (i % groupWidth) * swatchSize;
          let swatchY = imageHeight + Math.floor(i / groupWidth) * swatchSize;
          this.ctx.fillStyle = 'rgb(' + leaf.value + ')';
          this.ctx.fillRect(swatchX, swatchY, swatchSize, swatchSize);
        });
        x += groupWidth * swatchSize;
      });

      // draw the clusters
    };
    img.src = imageURL;
  }

  leaves(hcluster) {
    // flatten cluster hierarchy
    if (!hcluster.left) return [hcluster];
    else return this.leaves(hcluster.left).concat(this.leaves(hcluster.right));
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
