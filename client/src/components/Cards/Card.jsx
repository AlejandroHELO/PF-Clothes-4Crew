import React from 'react';

const Card = (p) => {

    return (
        <div className=' w-48 h-80 shadow-2xl m-2 flex flex-col items-center justify-between' key={p.id}>
            <div>
                {
                    (p.image.length !== 0) ? (
                        <div>
                            {
                                <img className='w-36 hover:w-44 transition delay-75 duration-300 ease-in-out ' src={p.image[0]} alt="image" />
                            }
                        </div>
                    )
                        :
                        (<div> {console.log('no hay imágenes')}</div>)

                }
            </div>
            <div className='my-2'>
                <div className='mono font-bold text-sm m-4 h-8 text-slate-600 uppercase'>
                    {p.name}
                </div>
                <div className='text-xs italic m-1 text-slate-400'>
                    {p.brand}
                </div>
                <div className='text-base m-1 text-slate-600 font-bold'>
                    U$S {p.price}
                </div>
            </div>


        </div >
    )

};
export default Card;