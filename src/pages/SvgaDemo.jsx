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

const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(fileName);
    }, 3000);
  });
};


function add () {
  const _args = Array.prototype.slice.call(arguments, 0);
  
  const _call = function () {
    _args.push(...arguments)
    return _call;
  }
  _call.toString = function () {
    return _args.reduce((acumulator, current) => acumulator + current, 0);
  }
  return _call;
}

class SvgaDemo extends Component {
  constructor (props) {
    super(props)
    this.fileRef = React.createRef()
  }
  componentDidMount () {
    this.player = new SVGA.Player('#demoCanvas');
    this.parser = new SVGA.Parser('#demoCanvas'); 

    // const generator = this.testGenerate();
    // console.log('generator', generator)
    // const res = generator.next();
    // let loop;
    // do {
    //   loop = generator.next()
    //   if (typeof loop.value === 'function') {
    //     loop.value();
    //   }
    // } while (!loop.done)

    // const sg = this.asyncGenerate();
    // this.runAsyncGenerate(sg);
    // 函数科里化
    // console.log(add(1)(2)(3))
  }

  runAsyncGenerate (sg, value) {
    const nextRes = sg.next(value);
    if (nextRes.value instanceof Promise) {
      nextRes.value.then((res) => {
        this.runAsyncGenerate(sg, res);
      })
    }
  }

  * asyncGenerate () {
    const a = yield readFile('aaaa');
    console.log('a=', a)
    const b = yield readFile('bbbb');
    console.log('b=', b)
  }

  * testGenerate () {
    console.log('this is testGenerate')
    const aRes = yield 'aaaa'
    console.log('yield aaaa; aRes: ', aRes)
    yield 'bbbb';
    console.log('yield bbbb')
    yield 'cccc';
    console.log('yield cccc')
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
