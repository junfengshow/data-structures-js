import React, { useState, useEffect, useRef, useTransition } from 'react';
import { Link } from 'react-router-dom'

const useMouse = (ref: any) => {
  const [page, setPage] = useState({ x: 0, y: 0 });
  useEffect(() => {
    ref.current.addEventListener('mousemove', (event: any) => {
      setPage({
        x: event.offsetX,
        y: event.offsetY,
      });
    });
  }, []);
  return [page.x, page.y];
}

interface StateInerface {
  age: number
}
interface PropsInterface {}

const Demo = () => {
  const [num, setNum] = React.useState(0);
  const contentRef = React.useRef<any>();

  // React.useEffect(() => {
  //   if (num === 0) {
  //     setNum(100 + Math.random() * 200)
  //   }
  // }, [num]);

  React.useLayoutEffect(() => {
    if (num === 0) {
      setNum(100 + Math.random() * 200)
    }
  }, [num]);

  return (
    <div
      onClick={() => {
        setNum(0);
      }}
      style={{userSelect: 'none'}}
    >
      num: {num}
    </div>
  )
}

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
        <Demo />
      </div>
    )
  }
}

let i = 0;
const HooksDemo = () => {
  const [list, setList] = useState<any>([]);
  const contentRef = useRef<any>();
  const [x, y] = useMouse(contentRef)
  const add = () => {
    setList(list.concat(
      <button 
        key={i} 
        onClick={add}
      >{i++}</button>
    ))
  }
  return (
    <div ref={contentRef}>
      <div>{x}~{y}</div>
      <button onClick={add}>add</button>
      {list}
    </div>
  )
}

import { gql, useQuery, ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

const ApolloDemo = () => {
  const { loading, error, data } = useQuery(GET_DOGS);
  console.log('data', data)
  console.log('loading', loading)
  console.log('error', error)
  return (
    <div>
      dldle
    </div>
  )
}

const client = new ApolloClient({
  uri: 'http://localhost:8081/v1/users/create',
  cache: new InMemoryCache(),
});


const ApolloContainer= () => {
  
  return (
    <ApolloProvider client={client}>
      <ApolloDemo />
    </ApolloProvider>
  )
}
export default ApolloContainer;
