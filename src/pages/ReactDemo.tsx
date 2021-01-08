import React from 'react'
import { Link } from 'react-router-dom'
interface StateInerface {
  age: number
}
interface PropsInterface {}
class ReactDemo extends React.Component<PropsInterface, StateInerface> {
  constructor (props: PropsInterface) {
    super(props)
    this.state = {
      age: 1
    }
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({ age: this.state.age + 1 })
      console.log(this.state.age)
    })
    let addDom = document.getElementById('ageAdd')
    if (addDom) {
      addDom.onclick = (e) => {
        e.preventDefault()
        this.setState({ age: this.state.age + 1 })
        console.log(this.state.age)
      }
    }
    
  }
  onAgeAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    this.setState({ age: this.state.age + 1 })
    console.log(this.state.age)
  }
  render () {
    const { age } = this.state 
    return (
      <div>
        <div>
          <Link to="/">index</Link>
        </div>
        <div> 
          <a href="#" id='ageAdd'>age++</a>
          {age}
        </div>
      </div>
    )
  }
}
export default ReactDemo
