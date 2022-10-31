import React from "react";


export default function Footer(){

    return (
        <div className="bg-black relative bottom-0 left-0 right-0 h-40 w-full " >
           <div className="flex justify-between ">
           <div className="m-8">
                <h1 className="text-white text-sm  text-center ">
                    find us at:
                </h1>
                <h3 className="text-white text-xs font-light underline text-center">
                    <a href="mailto:clothes4crew@email.com" 
                    className="text-white text-xs text-center font-light">
                    clothes4crew@email.com
                    </a>
                </h3>
               
           
           </div>
           <div className="my-auto mr-20">
            <h1 className="text-white text-sm text-center ">
                hepl
            </h1>
            <h3 className="text-white text-xs text-center">
            lorem ipsum
            </h3>
            <h3 className="text-white text-xs text-center">
            lorem ipsum
            </h3></div>
           <div className=" felx  mr-10 my-auto  ">
            <h1 className="text-white text-sm text-center">
                us
            </h1>
            <h3 className="text-white text-xs text-center">
                <a href="/abautus" className="text-white text-xs text-center">
                    AboutS
                </a>
            </h3>
            <h3 className="text-white text-xs text-center">
            lorem ipsum 
            </h3> 
            </div>
            </div>
            <div className="mb-0 text-center text-sm font-light text-center ">
                <h1 className="text-white text-sm  text-center">
                    Henry - Proyecto Final - Web FT29b Grupo 17
                </h1>
            </div>
        </div>
    )
}