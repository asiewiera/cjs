export const getRepositoriesFromSearch = query => {
  return `{
    search(query: "${query}", type: REPOSITORY, first: 30) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            owner {
              login
              avatarUrl
            }
            stargazerCount
          }
        }
      }
    }
  }`
}


export const getRepositoryDetails = (owner, name)=>{
return
 ` {
    repository(owner: ${owner}, name: ${name}) {
      description
      url
    }
  }`

}


