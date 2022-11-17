export const userData = (data,año)=>{
    let filter = [
        {
            name: 'Jan',
            'Active users': 0,
        },
        {
            name: 'Feb',
            'Active users': 0,
        },
        {
            name: 'Marc',
            'Active users': 0,
        },
        {
            name: 'Apr',
            'Active users': 0,
        },
        {
            name: 'May',
            'Active users': 0,
        },
        {
            name: 'Jun',
            'Active users': 0,
        },
        {
            name: 'Jul',
            'Active users': 0,
        },
        {
            name: 'Agu',
            'Active users': 0,
        },
        {
            name: 'Sep',
            'Active users': 0,
        },
        {
            name: 'Oct',
            'Active users': 0,
        },
        {
            name: 'Nov',
            'Active users': 0,
        },
        {
        name: 'Dec',
            'Active users': 0,
        }
    ]

    data.forEach(p=>{
        let fecha = new Date(p.time)
        // console.log(fecha)
        if(fecha.getFullYear()===año){
            filter[fecha.getMonth()][`Active users`] = filter[fecha.getMonth()][`Active users`]+1
        }
    })

    return filter
}

export const productData = (data,año,productId)=>{
    let filter = [
        {
            name: 'Jan',
            'Sales': 0,
        },
        {
            name: 'Feb',
            'Sales': 0,
        },
        {
            name: 'Marc',
            'Sales': 0,
        },
        {
            name: 'Apr',
            'Sales': 0,
        },
        {
            name: 'May',
            'Sales': 0,
        },
        {
            name: 'Jun',
            'Sales': 0,
        },
        {
            name: 'Jul',
            'Sales': 0,
        },
        {
            name: 'Agu',
            'Sales': 0,
        },
        {
            name: 'Sep',
            'Sales': 0,
        },
        {
            name: 'Oct',
            'Sales': 0,
        },
        {
            name: 'Nov',
            'Sales': 0,
        },
        {
            name: 'Dec',
            'Sales': 0,
        },
    ]

    if(productId){
        data.forEach(p=>{
            let dato=0
            p.products.forEach(b=>{
                if(b.id===productId){
                    dato=dato+b.price
                }
            })
            let fecha=new Date(p.time)
            // console.log(fecha)
            if(fecha.getFullYear()===año){ 
                filter[fecha.getMonth()][`Sales`]= filter[fecha.getMonth()][`Sales`]+dato
            }
        })
    }

    return filter
}

export const estadisticas=()=>{}