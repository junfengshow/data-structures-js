import React from 'react'
import { connect } from 'dva'
import { setName } from '../models/user'

interface PropsInterface {
  setName: () => void,
  name: string
}
interface StateInterface {}
class ReduxDemo extends React.Component<PropsInterface, StateInterface> {
  componentDidMount () {
  }
  setName = () => {
    const { setName } = this.props 
    setName && setName() 
  }
  render () {
    const { name } = this.props 
    return (
      <div>
        <a onClick={this.setName}>set name</a>
        <div>
          {name}
        </div>
      </div>
    )
  }
}
export default connect(({ user }: any) => {
  return user
}, { setName })(ReduxDemo)
