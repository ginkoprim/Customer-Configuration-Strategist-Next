import React, { Fragment } from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import PropTypes from 'prop-types'
import { getEntitiesWithPagination } from '@teleporthq/cms-mappers/caisy'

const BlogPost = (props) => {
  return (
    <>
      <div className="blog-post-container1">
        <Head>
          <title>BlogPost - Customer Configuration Strategist</title>
          <meta
            property="og:title"
            content="BlogPost - Customer Configuration Strategist"
          />
        </Head>
        <DataProvider
          renderSuccess={(params) => (
            <Fragment>
              <div className="blog-post-container2">
                <Repeater
                  items={params}
                  renderItem={(BlogPostEntities) => (
                    <Fragment>
                      <div className="blog-post-container3">
                        <h1>{BlogPostEntities?.title}</h1>
                        <span>{BlogPostEntities?.title}</span>
                        <span>{BlogPostEntities?.readingCount}</span>
                      </div>
                    </Fragment>
                  )}
                />
              </div>
            </Fragment>
          )}
          initialData={props.blogPostEntities}
          persistDataDuringLoading={true}
          key={props?.pagination?.page}
        />
      </div>
      <style jsx>
        {`
          .blog-post-container1 {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .blog-post-container2 {
            display: flex;
            flex-direction: column;
          }
          .blog-post-container3 {
            gap: 12px;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

BlogPost.defaultProps = {
  blogPostEntities: [],
}

BlogPost.propTypes = {
  blogPostEntities: PropTypes.array,
}

export default BlogPost

export async function getStaticProps(context) {
  try {
    const response = await getEntitiesWithPagination({
      ...context?.params,
      projectId: '3bd8eb33-2aaa-4620-87bf-d7ccd04d0245',
      query:
        'query MyQuery($first: Int, $after: String){allBlogPost(first: $first, after: $after){pageInfo{endCursor,hasNextPage,hasPreviousPage}edges{node{_meta{createdAt updatedAt id}slug cover{__typename _meta{createdAt updatedAt id}description height id src title width}title assets{__typename ...on Asset{ _meta{createdAt updatedAt id}description height id src title width}}author{__typename...on Author{_meta{createdAt updatedAt id}name image{__typename _meta{createdAt updatedAt id}description height id src title width}}}authors{__typename...on Author{_meta{createdAt updatedAt id}name image{__typename _meta{createdAt updatedAt id}description height id src title width}}}content{json connections{__typename ...on Asset{description height id src title width} }}testTab location{formattedAddress latitude longitude zoom}isVisible pulbished themeColor readingCount}}}}',
      page: 1,
      perPage: 10,
    })
    if (!response) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        blogPostEntities: response,
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
