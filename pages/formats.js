import React from 'react'
import { compose } from 'react-apollo'
import Frame from '../components/Frame'
import Formats from '../components/Formats'
import { enforceMembership } from '../components/Auth/withMembership'
import withData from '../lib/apollo/withData'
import withT from '../lib/withT'

import { CDN_FRONTEND_BASE_URL } from '../lib/constants'

const FormatsPage = ({ url, t }) => {
  const meta = {
    title: t('formats/pageTitle'),
    image: `${CDN_FRONTEND_BASE_URL}/static/social-media/logo.png`
  }
  return (
    <Frame raw url={url} meta={meta}>
      <Formats />
    </Frame>
  )
}

export default compose(
  withData,
  enforceMembership,
  withT
)(FormatsPage)
