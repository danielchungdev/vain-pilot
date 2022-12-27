import Navbar from "../components/Navbar"
import Results from "../components/Results"
import Filter from "../components/Filter"
import Head from "next/head"

const search = () => {
    return (
        <div>
            <Head>
                <title>VAIN | Search</title>
            </Head>
            <main>
                <Navbar/>
                <div className="w-11/12 m-auto mt-20 flex justify-between">
                    <Filter/>
                    <Results/>
                </div>
            </main>
        </div>
    )
}

export default search