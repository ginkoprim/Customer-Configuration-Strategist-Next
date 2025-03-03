import React, { Fragment } from 'react'
import Head from 'next/head'

import {
  DataProvider,
  Repeater,
  CaisyDocumentLink,
} from '@teleporthq/react-components'
import { RichTextRenderer } from '@caisy/rich-text-react-renderer'
import PropTypes from 'prop-types'
import {
  getEntityByAttribute,
  getEntities,
} from '@teleporthq/cms-mappers/caisy'

const BlogPost11 = (props) => {
  return (
    <>
      <div className="blog-post11-container1">
        <Head>
          <title>BlogPost1 - Customer Configuration Strategist</title>
          <meta
            property="og:title"
            content="BlogPost1 - Customer Configuration Strategist"
          />
        </Head>
        <DataProvider
          renderSuccess={(BlogPostEntity) => (
            <Fragment>
              <div className="blog-post11-container2">
                <h1>{BlogPostEntity?.title}</h1>
                <span>{BlogPostEntity?.readingCount}</span>
                <span>{BlogPostEntity?.slug}</span>
                <div className="blog-post11-container3">
                  <RichTextRenderer
                    node={BlogPostEntity?.content}
                    overwrites={{
                      documentLink: CaisyDocumentLink,
                    }}
                  ></RichTextRenderer>
                </div>
              </div>
            </Fragment>
          )}
          initialData={props.blogPostEntity}
          persistDataDuringLoading={true}
          key={props?.blogPostEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .blog-post11-container1 {
            width: 100%;
            display: flex;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .blog-post11-container2 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .blog-post11-container3 {
            width: 100%;
            align-self: stretch;
          }
        `}
      </style>
    </>
  )
}

BlogPost11.defaultProps = {
  blogPostEntity: [],
}

BlogPost11.propTypes = {
  blogPostEntity: PropTypes.array,
}

export default BlogPost11

export async function getStaticProps(context) {
  try {
    const response = await getEntityByAttribute({
      ...context?.params,
      projectId: '3bd8eb33-2aaa-4620-87bf-d7ccd04d0245',
      query:
        'query BlogPost($value:ID!){BlogPost(id:$value){_meta{createdAt updatedAt id}slug cover{__typename _meta{createdAt updatedAt id}description height id src title width}title assets{__typename ...on Asset{ _meta{createdAt updatedAt id}description height id src title width}}author{__typename...on Author{_meta{createdAt updatedAt id}name image{__typename _meta{createdAt updatedAt id}description height id src title width}}}authors{__typename...on Author{_meta{createdAt updatedAt id}name image{__typename _meta{createdAt updatedAt id}description height id src title width}}}content{json connections{__typename ...on Asset{description height id src title width} }}testTab location{formattedAddress latitude longitude zoom}isVisible pulbished themeColor readingCount}}',
      attribute: 'id',
    })
    if (!response?.data?.[0]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        blogPostEntity: response?.data?.[0],
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

export async function getStaticPaths() {
  try {
    const response = await getEntities({
      projectId: '3bd8eb33-2aaa-4620-87bf-d7ccd04d0245',
      query: '{allBlogPost{edges{node{id}}}}',
    })
    return {
      paths: (response?.data || []).map((item) => {
        return {
          params: {
            id: (item?.id).toString(),
          },
        }
      }),
      fallback: 'blocking',
    }
  } catch (error) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
}
