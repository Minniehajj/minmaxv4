export const POST_GRAPHQL_FIELDS = `
slug
title
heroImage {
  title
  description
  url(transform: {
    format: WEBP
    quality: 90
  })
  width
  height
}
publishDate
authorsCollection(limit: 3) {
  items {
    title
    twitter
    slug
    image {
      url(transform: {format: WEBP, quality: 90})
    }
  }
}
metaDescription
tagsCollection {
  items{
    title
    slug
  }
}
pageBody {
  json
  links {
    assets {
      block {
        __typename
        sys {
          id
        }
        title
        url
        description
        contentType
        width
        height
      }
    }
    entries {
      block{
        __typename
        sys{
          id
        }
        ...on Video{
          url
        }
      }
    }
  }
}
body
`;

export const SIMPLE_GRAPHQL_FIELDS = `
slug
title
heroImage {
  title
  description
  url(transform: {
    format: WEBP
    quality: 90
  })
  width
  height
}
authorsCollection(limit: 2) {
  items {
    title
    image {
      url(transform: {format: WEBP, quality: 90})
    }
  }
}
tagsCollection(limit: 3) {
  items{
    title
    slug
  }
}
pageBody {
  json
  links
}
body
`;

export const POST_ENTRY_GRAPHQL_FIELDS = `
  body
  pageBody{
    json
    links{
      assets{
        block{
          sys{
            id
          }
          title
          url
          description
          contentType
          width
          height                  
        }
      }
      entries{
        block{
          sys{
            id
          }
          __typename
          ... on Video{
            title
            url
          }
          ... on Decklist {
            title
            list
          }
          ... on TwitterEmbed {
            title
            tweetId
          }
        }
      }
    }
  }    
`;

export const AUTHOR_GRAPHQL_FIELDS = `
slug
title
twitter
image {
  url(transform: {format: WEBP, quality: 90})
}
authorType
bio
`;
