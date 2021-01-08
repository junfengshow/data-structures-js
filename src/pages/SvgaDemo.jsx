import React, { Component } from 'react'
import SVGA from 'svgaplayerweb'
const blobToDataURL = (blob, cb) => {
  let reader = new FileReader()
  reader.onload = function (evt) {
    let base64 = evt.target.result
    cb(base64);
  }
  reader.readAsDataURL(blob)
}

class SvgaDemo extends Component {
  constructor (props) {
    super(props)
    this.fileRef = React.createRef()
  }
  componentDidMount () {
    this.player = new SVGA.Player('#demoCanvas');
    this.parser = new SVGA.Parser('#demoCanvas'); 
  }

  onFileChange = (e) => {
    let blob = this.fileRef.current.files[0]
    blobToDataURL(blob, (data) => {
      this.parser.load(data, (videoItem) => {
        this.player.setVideoItem(videoItem);
        this.player.startAnimation();
      })
    })
  }
  render () {
    return (
      <div>
        <div id='demoCanvas' />
        <div>
          <input type='file' onChange={this.onFileChange} ref={this.fileRef} />
        </div>
      </div>
    )
  }
}
export default SvgaDemo
