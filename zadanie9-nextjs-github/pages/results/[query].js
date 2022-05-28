import Head from "next/head"
import Main from "@/components/layouts/main"

export default function ResultsPages({title}) {
  return (
    <Main>
    <Head>
      <title>Results Page for {title}</title>
    </Head>
    <div className="w-2/3 mx-auto">
        <h1 className="text-center">Search for: <span className="font-bold">
        {title}</span></h1>
        <ul className="mt-8">
          <li className="m-2 p-2 rounded border-2 border-gray-200">
            <h2 className="text-xl mb-2">tekst</h2>
            <p>desription </p>
          </li>
        </ul>
      </div>
      
    </Main>
  )
}

export async function getServerSideProps(context) {

  console.log('context req', context.params );
  return {
    props: {
      title: context.params.query

    }, // will be passed to the page component as props
  }
}