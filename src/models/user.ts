export const setName = () => {
  return {
    type: 'user/fetchName',
    name: 'b'
  }
}

export default {
  namespace: 'user',
  state: {
    name: 'a'
  },
  reducers: {
    setName: (state: any, payload: any) => {
      console.log('payload', payload)
      return Object.assign({}, state, payload)
    }
  },
  effects: {
    *fetchName ({ name }: any, { call, put }: any) {
      // console.log(effects)
      yield put({
        type: 'setName',
        name
      })
    }
  }
}
