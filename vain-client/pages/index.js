import Head from 'next/head'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { Fragment, useState } from 'react'
import Categories from '../components/Categories'

const people = [
  { name: 'Type'},
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]

const subjects = [
  { name: 'Subject'},
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]

const Home = () => {
  const [selected, setSelected] = useState(people[0])
  const [subject, setSubject] = useState(subjects[0])


  const subjectSelect = (
    <div className="col-start-4 col-span-2">
          <Listbox value={subject} onChange={setSubject}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-200  py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{subject.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {subjects.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={person}
                    >
                      {({ subject }) => (
                        <>
                          <span
                            className={`block truncate ${
                              subject ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {person.name}
                          </span>
                          {subject ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
  )

  const typeSelect = (
    <div className="col-start-1 col-span-2">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {people.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      )

  return (
    <div>
      <Head>
        <title>VAIN</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar loggedIn={false}/>
        <div className="grid grid-rows-8">
          <div className="row-start-1 col-start-1 row-span-6 bg-green-900 grid place-items-center">
            <div>
              <p className="text-slate-100 text-5xl text-center">Welcome to <span className="font-didot text-5xl">VAIN</span></p>
              <p className="
                w-5/6 text-center m-auto mt-6 text-slate-200
                md:w-3/4
                lg:w-3/6
              ">
                VAIN is the Victorian Autobiography Information network, designed to provide a database of material about autobiographies for Victorian literature scholars who want to include life writing in their scholarship.
              </p>
            </div>
          </div>
          <div className="
            row-start-6 row-span-2 col-start-1 w-5/6 p-5 h-20 bg-white rounded-lg m-auto drop-shadow-lg flex justify-around 
            lg:w-4/6 
          ">
            <div className="
              grid grid-cols-12 w-full
            ">
              {typeSelect}
              {subjectSelect}
              <input className="bg-slate-200 col-start-7 col-end-11 h-9 p-3 rounded-lg shadow-md mt-1"></input>
              <button className="col-start-12 bg-green-900 text-white rounded-xl h-9 mt-1 shadow-lg w-full">Search</button>
            </div>
          </div>
        </div>

        <div className='m-auto w-2/3 text-center mb-20'>
          <h1 className='text-3xl'>Popular Categories</h1>
          <div className='flex flex-wrap mt-10'>
            <Categories/>
            <Categories/>
            <Categories/>
            <Categories/>
          </div>
        </div>

      </main>

      <Footer/> 

    </div>
  )
}

export default Home