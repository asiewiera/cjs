import fetch from "node-fetch"
import Image from "next/image";
import Link from "next/link";

import Head from "next/head"
import Main from "@/components/layouts/main"

import { getRepositoriesFromSearch } from "@/helpers/queries";
import performGraphQLQuery from "@/helpers/api"


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
            <li key={el.node.id} className="relative m-2 p-2 rounded border-2 border-gray-200">
              <div className="flex space-between align-center">
                {el.node.owner.avatarUrl && <Image width="30px" height="30px" className="w-10 rounded" src={el.node.owner.avatarUrl} alt="avatar"/>}
                <h2 className="text-xl ml-2">{el.node.owner.login}</h2>
                
              </div>
              <p className="mt-4">{el.node.description} </p>
              <p className="absolute top-2 right-2"> &#9733; {el.node.stargazersCount}</p>
              <Link href={`/repository/${el.node.owner.login}-${el.node.name}`}>
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
  const query = getRepositoriesFromSearch(context.params.query);

  try {
    const result = await performGraphQLQuery(query)
    console.log('Results from await', result)


    return {
      props: {
        title: context.params.query,
        results: result.data.search.edges
      }
    }
  } catch(error) {
    console.log('error from try',error);
    return {
      props: {}
    }
  }





}