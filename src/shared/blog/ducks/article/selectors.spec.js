import * as Immutable from 'immutable'
import * as matchers from 'jest-immutable-matchers'

import * as selectors from './selectors'

const articles = [
  {
    'slug': '淺談-regex-及其應用',
    'title': '淺談 regex 及其應用',
    'date': '2015-10-04T00:00:00',
    'modified_date': '2015-11-22T00:00:00',
    'categories': [
      {
        'slug': '程式設計',
        'name': '程式設計'
      },
      {
        'slug': 'python',
        'name': 'Python'
      }
    ],
    'chicken_count': 199,
    'content': 'content',
    'summary': 'summary',
    'raw_summary': 'raw_summary'
  },
  {
    'slug': '擁抱',
    'title': '擁抱',
    'date': '2013-02-16T00:00:00',
    'modified_date': null,
    'categories': [
      {
        'slug': '胡言亂語',
        'name': '胡言亂語'
      }
    ],
    'chicken_count': 1,
    'content': 'content',
    'summary': 'summary',
    'raw_summary': 'raw_summary'
  },
  {
    'slug': '美女最變態',
    'title': '美女最變態',
    'date': '2013-02-02T00:00:00',
    'modified_date': '2015-08-24T00:00:00',
    'categories': [
      {
        'slug': '胡言亂語',
        'name': '胡言亂語'
      }
    ],
    'chicken_count': 0,
    'content': 'content',
    'summary': 'summary',
    'raw_summary': 'raw_summary'
  }
]

beforeAll(() => {
  jest.addMatchers(matchers)
})

test('getArticles should return articles with correct naming convention', () => {
  const state = Immutable.fromJS({
    article: {
      items: articles
    }
  })
  const expected = Immutable.fromJS([
    {
      'slug': '淺談-regex-及其應用',
      'title': '淺談 regex 及其應用',
      'date': new Date('2015-10-04T00:00:00'),
      'modifiedDate': new Date('2015-11-22T00:00:00'),
      'categories': [
        {
          'slug': '程式設計',
          'name': '程式設計'
        },
        {
          'slug': 'python',
          'name': 'Python'
        }
      ],
      'chickenCount': 199,
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'raw_summary'
    },
    {
      'slug': '擁抱',
      'title': '擁抱',
      'date': new Date('2013-02-16T00:00:00'),
      'modifiedDate': null,
      'categories': [
        {
          'slug': '胡言亂語',
          'name': '胡言亂語'
        }
      ],
      'chickenCount': 1,
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'raw_summary'
    },
    {
      'slug': '美女最變態',
      'title': '美女最變態',
      'date': new Date('2013-02-02T00:00:00'),
      'modifiedDate': new Date('2015-08-24T00:00:00'),
      'categories': [
        {
          'slug': '胡言亂語',
          'name': '胡言亂語'
        }
      ],
      'chickenCount': 0,
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'raw_summary'
    }
  ])
  expect(selectors.getArticles(state)).toEqualImmutable(expected)
})

describe('getArticlesByCategory', () => {
  const expected = Immutable.fromJS([
    {
      'slug': '淺談-regex-及其應用',
      'title': '淺談 regex 及其應用',
      'date': new Date('2015-10-04T00:00:00'),
      'modifiedDate': new Date('2015-11-22T00:00:00'),
      'categories': [
        {
          'slug': '程式設計',
          'name': '程式設計'
        },
        {
          'slug': 'python',
          'name': 'Python'
        }
      ],
      'chickenCount': 199,
      'content': 'content',
      'summary': 'summary',
      'rawSummary': 'raw_summary'
    }
  ])

  test('should return article list by props.params.category', () => {
    const props = {
      params: {
        category: 'python'
      }
    }

    const state = Immutable.fromJS({
      article: {
        items: articles
      }
    })
    expect(selectors.getArticlesByCategory(state, props)).toEqualImmutable(expected)
  })

  test('should return article list by props.category', () => {
    const props = {
      category: 'python'
    }

    const state = Immutable.fromJS({
      article: {
        items: articles
      }
    })
    expect(selectors.getArticlesByCategory(state, props)).toEqualImmutable(expected)
  })
})

test('getArticle should return articles with correct naming convention', () => {
  const props = {
    params: {
      slug: '美女最變態'
    }
  }
  const state = Immutable.fromJS({
    article: {
      items: articles
    }
  })

  const expected = Immutable.fromJS({
    'slug': '美女最變態',
    'title': '美女最變態',
    'date': new Date('2013-02-02T00:00:00'),
    'modifiedDate': new Date('2015-08-24T00:00:00'),
    'categories': [
      {
        'slug': '胡言亂語',
        'name': '胡言亂語'
      }
    ],
    'chickenCount': 0,
    'content': 'content',
    'summary': 'summary',
    'rawSummary': 'raw_summary'
  })
  expect(selectors.getArticle(state, props)).toEqualImmutable(expected)
})

describe('getRecentArticles', () => {
  test('should return recent articles (articles > config)', () => {
    const props = {}
    const state = Immutable.fromJS({
      config: {
        RECENT_ARTICLE_COUNT: 2
      },
      article: {
        items: articles
      }
    })
    const expected = Immutable.fromJS([
      {
        'slug': '淺談-regex-及其應用',
        'title': '淺談 regex 及其應用',
        'date': new Date('2015-10-04T00:00:00'),
        'modifiedDate': new Date('2015-11-22T00:00:00'),
        'categories': [
          {
            'slug': '程式設計',
            'name': '程式設計'
          },
          {
            'slug': 'python',
            'name': 'Python'
          }
        ],
        'chickenCount': 199,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      },
      {
        'slug': '擁抱',
        'title': '擁抱',
        'date': new Date('2013-02-16T00:00:00'),
        'modifiedDate': null,
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'chickenCount': 1,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      }
    ])
    expect(selectors.getRecentArticles(state, props)).toEqualImmutable(expected)
  })

  test('should return recent articles (articles < config)', () => {
    const props = {}
    const state = Immutable.fromJS({
      config: {
        RECENT_ARTICLE_COUNT: 4
      },
      article: {
        items: articles
      }
    })
    const expected = Immutable.fromJS([
      {
        'slug': '淺談-regex-及其應用',
        'title': '淺談 regex 及其應用',
        'date': new Date('2015-10-04T00:00:00'),
        'modifiedDate': new Date('2015-11-22T00:00:00'),
        'categories': [
          {
            'slug': '程式設計',
            'name': '程式設計'
          },
          {
            'slug': 'python',
            'name': 'Python'
          }
        ],
        'chickenCount': 199,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      },
      {
        'slug': '擁抱',
        'title': '擁抱',
        'date': new Date('2013-02-16T00:00:00'),
        'modifiedDate': null,
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'chickenCount': 1,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      },
      {
        'slug': '美女最變態',
        'title': '美女最變態',
        'date': new Date('2013-02-02T00:00:00'),
        'modifiedDate': new Date('2015-08-24T00:00:00'),
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'chickenCount': 0,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      }
    ])
    expect(selectors.getRecentArticles(state, props)).toEqualImmutable(expected)
  })

  test('should return recent categorized articles', () => {
    const props = {
      category: '胡言亂語'
    }
    const state = Immutable.fromJS({
      config: {
        RECENT_ARTICLE_COUNT: 4
      },
      article: {
        items: articles
      }
    })
    const expected = Immutable.fromJS([
      {
        'slug': '擁抱',
        'title': '擁抱',
        'date': new Date('2013-02-16T00:00:00'),
        'modifiedDate': null,
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'chickenCount': 1,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      },
      {
        'slug': '美女最變態',
        'title': '美女最變態',
        'date': new Date('2013-02-02T00:00:00'),
        'modifiedDate': new Date('2015-08-24T00:00:00'),
        'categories': [
          {
            'slug': '胡言亂語',
            'name': '胡言亂語'
          }
        ],
        'chickenCount': 0,
        'content': 'content',
        'summary': 'summary',
        'rawSummary': 'raw_summary'
      }
    ])
    expect(selectors.getRecentArticles(state, props)).toEqualImmutable(expected)
  })
})

describe('getSocialConfig', () => {
  const props = {
    params: {
      slug: '美女最變態'
    }
  }

  test('should return social config', () => {
    const state = Immutable.fromJS({
      config: {
        HOST_URL: 'HOST_URL'
      },
      routing: Immutable.Map({
        locationBeforeTransitions: {
          pathname: '/pathname'
        }
      }),
      article: {
        items: articles
      }
    })

    const expected = Immutable.fromJS({
      shareUrl: 'HOST_URL/pathname',
      title: '美女最變態'
    })
    expect(selectors.getSocialConfig(state, props)).toEqualImmutable(expected)
  })

  test('should return social config even when the article dont exist ', () => {
    const state = Immutable.fromJS({
      config: {
        HOST_URL: 'HOST_URL'
      },
      routing: Immutable.Map({
        locationBeforeTransitions: {
          pathname: '/pathname'
        }
      }),
      article: {
        items: []
      }
    })

    const expected = Immutable.fromJS({
      shareUrl: 'HOST_URL/pathname',
      title: 'HOST_URL/pathname'
    })
    expect(selectors.getSocialConfig(state, props)).toEqualImmutable(expected)
  })
})

