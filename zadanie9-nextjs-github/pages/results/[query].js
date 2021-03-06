import fetch from "node-fetch"
import Image from "next/image";
import Link from "next/link";

import Head from "next/head"
import Main from "@/components/layouts/main"



export default function ResultsPages({title, results}) {
  console.log(results);
  return (
    <Main>
    <Head>
      <title>Results Page for {title}</title>
    </Head>
    <div className="w-2/3 mx-auto">
        <h1 className="text-center">Search for: <span className="font-bold">
        {title}</span></h1>
        <ul className="mt-8">
        {results.map(el=> {
          return (
            <li key={el.id} className="relative m-2 p-2 rounded border-2 border-gray-200">
              <div className="flex space-between align-center">
                {el.owner.avatar_url && <Image width="30px" height="30px" className="w-10 rounded" src={el.owner.avatar_url} alt="avatar"/>}
                <h2 className="text-xl ml-2">{el.owner.login}</h2>
                
              </div>
              <p className="mt-4">{el.description} </p>
              <p className="absolute top-2 right-2"> &#9733; {el.stargazers_count}</p>
              <Link href={`/repository/${el.owner.login}-${el.name}`}>
                <span className="block text-red-500 text-right pr-2 mt-2 cursor-pointer">
                  See details
                </span>
              </Link>      
            </li>
          )
        })}
          
        </ul>
      </div>
      
    </Main>
  )
}

export async function getServerSideProps(context) {
  
  return fetch(`https://api.github.com/search/repositories?q=${context.params.query}`)
  .then((res) => res.json())
  .then((results => {
    return {
      props: {
        title: context.params.query,
        results: results.items
      },
    }
  }))
  .catch(error => {
    return {
      props: {
        error: `Cannot find Elements with this query ${error}`
      },
    }
  })

  console.log('context req', context.params );


}