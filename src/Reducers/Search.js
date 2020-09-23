export default function updateSearch(state='', action) {
  switch (action.type) {
    case 'CHANGE_SEARCH':
      return action.payload.search;
    default:
      return state;
  }
}