import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMercadopago } from 'react-sdk-mercadopago';

//import { useParams } from "react-router-dom";
const FORM_ID = 'payment-form';

export default function Pago(pros) {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    axios.post('/mercadopago/'+pros.id).then((order) => {
      setPreferenceId(order.data);
    });
  }, []);

    const mercadopago = useMercadopago.v2('TEST-97c68830-067a-4296-a8d9-7572ba05e907', {
        locale: 'es-AR'
    });

    useEffect(() => {
        if (mercadopago) {
            if(preferenceId){
                mercadopago.checkout({
                    preference: {
                        id: preferenceId
                    },
                    render: {
                        container: '.cho-container',
                        label: 'To Pay',
                    }
                })
            }
        }
    }, [mercadopago,preferenceId])

    return (
        <div>
            <div className="cho-container" />
        </div>
    )
}