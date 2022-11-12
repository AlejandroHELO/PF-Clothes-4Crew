import React from 'react'

export default function Footer() {
    return (
        <div className="bg-black relative bottom-0 left-0 right-0 w-full h-48">
            <div className="flex justify-between ">
                <div className="m-8">
                    <h1 className="text-white text-sm  text-center ">
                        Find us at:
                    </h1>
                    <h3 className="text-white text-xs text-center">
                        <a
                            href="#"
                            className="text-white text-xs text-center no-underline"
                        >
                            Facebook
                        </a>
                    </h3>
                    <h3 className="text-white text-xs text-center">
                        <a
                            href="#"
                            className="text-white text-xs text-center no-underline"
                        >
                            Instagram
                        </a>
                    </h3>
                    <h3 className="text-white text-xs text-center">
                        <a
                            href="mailto:clothes4crew@email.com"
                            className="text-white text-xs text-center no-underline"
                        >
                            clothes4crew@email.com
                        </a>
                    </h3>
                </div>
                <div className="my-auto mr-20">
                    <h1 className="text-white text-sm text-center ">Contact</h1>
                    <h3 className="text-white text-xs text-center">
                        lorem ipsum
                    </h3>
                    <h3 className="text-white text-xs text-center">
                        lorem ipsum
                    </h3>
                    <h3 className="text-white text-xs text-center">
                        lorem ipsum
                    </h3>
                </div>
                <div className=" felx  mr-10 my-auto  ">
                    <h1 className="text-white text-sm text-center">C4CREW TEAM</h1>
                    <h3 className="text-white text-xs text-center">
                        <a
                            href="/aboutus"
                            className="text-white text-xs text-center no-underline"
                        >
                            About Us
                        </a>
                    </h3>
                    <h3 className="text-white text-xs text-center">
                        <a
                            href="/helpusimprove"
                            className="text-white text-xs text-center no-underline"
                        >
                            Help Us to Improve
                        </a>
                    </h3>
                    <h3 className="text-white text-xs text-center">
                        lorem ipsum
                    </h3>
                </div>
            </div>
            <div className="mb-0 text-center text-sm font-light ">
                <h1 className="text-white text-sm  text-center">
                    Henry - Final Project - FT29b Team 17
                </h1>
            </div>
        </div>
    )
}
