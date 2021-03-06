import React from 'react'
import styled from 'styled-components'

const Base = styled.footer`
  height: 42px;
  background: ${props => props.theme.page.footer.background};
`

const Copyright = styled.div`
  margin: 0 auto;
  text-align: center;
  line-height: 42px;
  color: ${props => props.theme.page.footer.copyrightColor};
`

export default class PageFooter extends React.Component {
  render () {
    return (
      <Base>
        <Copyright>Copyright © 2017 - 兩大類</Copyright>
      </Base>
    )
  }
}
