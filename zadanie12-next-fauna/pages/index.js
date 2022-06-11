import cn from 'classnames'
import { useState } from 'react'
import useSWR, { mutate } from 'swr'

import { listGuestbookEntries } from '@/lib/fauna'

import EntryItem from '@/components/EntryItem'
import EntryForm from '@/components/EntryForm'
import MainLayout from '@/components/MainLayout'

import {putEntry} from '@/services/entry'





// const useEntriesFlow = ({ initialEntries }) => {
//   const { data: entries } = useSWR(ENTRIES_PATH, {
//     initialData: initialEntries,
//   })

//   const onSubmit = async (payload) => {
//     await putEntry(payload)
//     await mutate(ENTRIES_PATH)
//   }

//   return {
//     entries,
//     onSubmit,
//   }
// }





const Guestbook = ({ entries }) => {
  // const { entries, onSubmit } = useEntriesFlow({
  //   initialEntries,
  // })

  const [finalEntries, setFinalEntries] = useState(entries);

  const onSubmit = async(entryData)=>{
    const newEntry = await putEntry(entryData);
    setFinalEntries([newEntry, ...finalEntries])
  }

  return (
    <MainLayout>
      <div
        className={cn(
          'border border-blue-200 rounded p-6',
          'my-4 w-full dark:border-gray-800 bg-blue-50',
          'dark:bg-blue-opaque'
        )}
      >
        <h5
          className={cn(
            'text-lg md:text-xl font-bold',
            'text-gray-900 dark:text-gray-100'
          )}
        >
          Sign the Guestbook
        </h5>
        <p className="my-1 text-gray-800 dark:text-gray-200">
          Share a message for a future visitor.
        </p>
        <EntryForm onSubmit={onSubmit} />
      </div>
      <div className="mt-4 space-y-8 px-2">
        {finalEntries?.map((entry) => (
          <EntryItem key={entry._id} entry={entry} />
        ))}
      </div>
    </MainLayout>
  )
}

export const getStaticProps = async () => ({
  props: {
    entries: await listGuestbookEntries(),
  },
  revalidate: 1,
})

export default Guestbook
