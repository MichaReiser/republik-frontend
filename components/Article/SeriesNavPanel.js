import React, { Fragment } from 'react'

import { css } from 'glamor'
import { Link, Router } from '../../lib/routes'
import { timeFormat } from '../../lib/utils/format'
import { romanize } from '../../lib/utils/romanize'
import withT from '../../lib/withT'
import { negativeColors } from '../Frame/Footer'

import {
  Editorial,
  colors,
  fontStyles,
  mediaQueries,
  TeaserFrontCredit
} from '@project-r/styleguide'

const dayFormat = timeFormat('%d. %B %Y')

const styles = {
  container: css({
    color: negativeColors.text
  }),
  base: css({
    cursor: 'default',
    display: 'block',
    padding: '20px 15px',
    textAlign: 'center',
    '& + &': {
      borderTop: `1px solid ${negativeColors.divider}`
    }
  }),
  link: css({
    textDecoration: 'none',
    color: negativeColors.text,
    ':visited': {
      color: negativeColors.text
    },
    ':hover': {
      color: negativeColors.primary
    },
    cursor: 'pointer'
  }),
  linkSelected: css({
    backgroundColor: '#fff',
    textDecoration: 'none',
    color: colors.text
  }),
  selected: css({
    backgroundColor: '#fff'
  }),
  unpublished: css({
    color: negativeColors.lightText
  }),
  title: css({
    ...fontStyles.serifTitle26,
    [mediaQueries.mUp]: {
      ...fontStyles.serifTitle38
    }
  }),
  date: css({
    ...fontStyles.sansSerifRegular15,
    [mediaQueries.mUp]: {
      ...fontStyles.sansSerifRegular21
    }
  })
}

const Title = ({ children }) => <h2 {...styles.title}>{children}</h2>

const LinkContent = ({ episode, index, t }) => {
  const label = episode && episode.label
  const publishDate = episode && episode.publishDate
  return (
    <Fragment>
      <Editorial.Format>
        {label || t('article/series/episode', { count: romanize(index + 1) })}
      </Editorial.Format>
      <Title>{episode.title}</Title>
      {!!publishDate && (
        <TeaserFrontCredit>
          {dayFormat(Date.parse(publishDate))}
        </TeaserFrontCredit>
      )}
    </Fragment>
  )
}

const EpisodeLink = ({ episode, translation, params = {}, url, index, t }) => {
  const route =
    episode.document && episode.document.meta && episode.document.meta.path
  if (!route) {
    return (
      <div {...styles.base} {...styles.unpublished}>
        <LinkContent episode={episode} index={index} t={t} />
      </div>
    )
  }
  if (url.asPath && url.asPath === route) {
    return (
      <a
        {...styles.base}
        {...styles.linkSelected}
        style={{ cursor: 'pointer' }}
        onClick={e => {
          e.preventDefault()
          Router.replaceRoute(route, params).then(() => {
            window.scroll(0, 0)
          })
        }}
      >
        <LinkContent episode={episode} index={index} t={t} />
      </a>
    )
  }
  return (
    <Link route={route} params={params}>
      <a {...styles.base} {...styles.link}>
        <LinkContent episode={episode} index={index} t={t} />
      </a>
    </Link>
  )
}

const Nav = ({ url, children, t, series }) => {
  return (
    <div {...styles.container}>
      {series.episodes &&
        series.episodes.map((episode, i) => (
          <EpisodeLink t={t} key={i} episode={episode} url={url} index={i} />
        ))}
    </div>
  )
}

export default withT(Nav)
