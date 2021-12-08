import React from 'react'
import LikeCoinButton from './LikeCoinButton'

export default {
  title: 'elements/LikeCoinButton',
  component: LikeCoinButton,
}


const Template = (args) => (
  <LikeCoinButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  userId: 'marco79423',
  style: {
    height: 212,
    width: 485,
  }
}
