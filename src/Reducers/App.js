export default function setData(state=[], action) {
    switch (action.type) {
      case 'SET_DATA':
        return action.payload.data;
      default:
        return state;
    }
  }