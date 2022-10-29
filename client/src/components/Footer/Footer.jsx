import React from "react";


export default function Footer(){

    return (
        <div className="bg-black relative bottom-0 left-0 right-0 h-40 w-full " >
           <div className="absolute bottom-0 left-20 my-14 mx-10">
                <h1 className="text-white text-sm">
                    find us at:
                </h1>
                <h3 className="text-white text-sm font-serif">
                    email@email.com
                </h3>
                {/* <h3 className="text-white">
                     holas
                </h3> */}
           
           </div>
           <div className="absolute bottom-0 inset-x-0 my-14 mx-10  ">
            <h1 className="text-white text-sm">
                holas
            </h1>
            <h3 className="text-white">
                holas
            </h3>
            <h3 className="text-white">
                holas
            </h3></div>
           <div className="absolute bottom-0 right-0 my-14 mx-20">
            <h1 className="text-white">
                holas
            </h1>
            <h3 className="text-white">
                holas
            </h3>
            <h3 className="text-white">
                holas
            </h3> 
            </div>
            <div>
                <h1 className="text-white text-sm absolute bottom-0 inset-x-0">
                    Henry - Proyecto Final - Web FT29b Grupo 17
                </h1>
            </div>
        </div>
    )
}