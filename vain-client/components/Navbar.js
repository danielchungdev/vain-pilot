import { useState } from "react"
import { FaUserCircle } from "react-icons/fa"

const Navbar = (props) => {

    const [loggedIn] = useState(props.loggedIn)

    const defaultNav = (
        <>
            <h1 class="
                font-didot text-5xl col-span-2 col-start-1
                2xl:col-start-2
            ">
                VAIN
            </h1>
            <p class="
                grid place-items-center bg-slate-200 rounded-full col-start-7 col-span-3
                sm:col-start-8 sm:col-span-2
                md:col-start-8 md:col-span-2
                lg:col-start-8 lg:col-span-2
                xl:col-start-10 xl:col-span-1
                2xl:col-start-10 2xl:col-span-1
            ">
                Login
            </p>
            <p class="
                grid place-items-center bg-green-900 text-slate-200 rounded-full col-start-10 col-span-3
                sm:col-start-10 sm:col-span-2
                md:col-start-10 md:col-span-2
                lg:col-start-10 lg:col-span-2
                xl:col-start-11 xl:col-span-1
                2xl:col-start-11 2xl:col-span-1
            ">
                Get started
            </p>
        </>
    )

    const navbar = (
        <>
            <h1 class="font-didot text-5xl col-span-2 col-start-2">VAIN</h1>
            <i class="col-start-11 grid place-items-center text-4xl">
                <FaUserCircle style={{color:"#14532d"}}/>
            </i>
        </>
    )

    return(
        <div class="grid-cols-12 grid p-5 gap-5">
            {loggedIn ? navbar : defaultNav}
        </div>
    )
}

export default Navbar