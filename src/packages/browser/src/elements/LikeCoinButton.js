import React from 'react'
import PropTypes from 'prop-types'
import IframeResizer from 'iframe-resizer-react'

/**
 * LikCoin 的按鈕
 * @param {object} options
 * @param {string} options.creatorLikeID - 創作者的 Liker ID
 * @param {string} options.url - 資料的 URL
 * @param {object} options.style - CSS Style
 * @returns {JSX.Element}
 */
function LikeCoinButton({creatorLikeID, url, style = {}}) {
  const currentUrl = url || window.location.href
  return (
    <IframeResizer
      src={`//button.like.co/in/embed/${creatorLikeID}/button?referrer=${currentUrl}`}
      inPageLinks
      checkOrigin={['//button.like.co']}
      style={{border: 0, margin: 0, ...style}}
    />
  )
}

LikeCoinButton.propTypes = {
  creatorLikeID: PropTypes.string.isRequired,
  url: PropTypes.string,
  style: PropTypes.object,
}

export default LikeCoinButton
