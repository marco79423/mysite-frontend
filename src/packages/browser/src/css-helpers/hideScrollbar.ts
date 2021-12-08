const hideScrollbar = {
  scrollbarWidth: 'none', // IE and Edge
  msOverflowStyle: 'none', // Firefox
  '&::-webkit-scrollbar': {
    display: 'none' // Chrome, Safari and Opera
  },
}

export default hideScrollbar
