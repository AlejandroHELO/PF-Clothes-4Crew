import React from 'react'

export default function Footer() {
    return (
        <div className="bg-black relative bottom-0 left-0 right-0 w-full h-48">
            <div className="flex justify-around ">
                <div className="m-8">
                    <h1 className="text-white text-sm text-center ">
                        Find us at:
                    </h1>
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
                            href="#"
                            className="text-white text-xs text-center no-underline"
                        >
                            Facebook
                        </a>
                    </h3>
                    <h3 className="text-white text-xs text-center">
                        <a
                            href="mailto:crewclothes850@gmail.com"
                            className="text-white text-xs text-center no-underline"
                        >
                            crewclothes850@gmail.com
                        </a>
                    </h3>
                </div>
                <div className="m-8">
                    <h1 className="text-white text-sm text-center ">Contact</h1>
                    <h3 className="text-white text-xs text-center">
                        Business Phone: +54 747 159637
                    </h3>
                    <h3 className="text-white text-xs text-center">
                        Wanna be sponsor?
                    </h3>
                    <h3 className="text-white text-xs text-center">
                        crewclothes850@gmail.com
                    </h3>
                </div>
                <div className=" m-8">
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
                        Henry - Final Project - FT29b Team 17
                    </h3>
                </div>
            </div>
            <div className="mb-0 text-center font-light ">
                <h1 className="text-white text-sm">
                    Clothes4Crew All Rights Reserved © 2022
                </h1>
            </div>
        </div>
    )
}
