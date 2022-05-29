import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-gray-600 p-3 text-white text-center" >
    <nav>
    <Link href="/">Github App</Link>
      {/* <ul className="flex">
        <li>
          <Link href='/'>Index</Link>
        </li>
        <li>
          <Link href='/results'>Results</Link>
        </li>
      </ul> */}
    </nav>
    </header>
  )
}