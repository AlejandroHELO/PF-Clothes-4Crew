import React from 'react';

const Card = (p) => {

    return (
        <div className=' w-44' key={p.id}>
            {
                (p.image.length !== 0) ? (
                    <div>
                        {
                            <img src={p.image[0]} alt="image" />
                        }
                    </div>
                )
                    :
                    (<div> {console.log('no hay imágenes')}</div>)

            }
            {p.name}
            {p.price}
        </div >
    )

};
export default Card;