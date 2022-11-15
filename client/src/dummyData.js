export const userData = (data,año)=>{
    let filter=
         [
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
             },
         ]
  data.forEach(p=>{
    let fecha=new Date(p.time)
    console.log(fecha)
    if(fecha.getFullYear()===año){
         filter[fecha.getMonth()][`Active user`]= filter[fecha.getMonth()][`Active user`]+1
    }
})
return filter
}

export const productData = (data,año,productId)=>{
    let filter=
         [
             {
                 name: 'Jan',
                 'Sale': 0,
             },
             {
                 name: 'Feb',
                 'Sale': 0,
             },
             {
                 name: 'Marc',
                 'Sale': 0,
             },
             {
                 name: 'Apr',
                 'Sale': 0,
             },
             {
                 name: 'May',
                 'Sale': 0,
             },
             {
                 name: 'Jun',
                 'Sale': 0,
           },
             {
                 name: 'Jul',
                 'Sale': 0,
             },
             {
                 name: 'Agu',
                 'Sale': 0,
             },
             {
                 name: 'Sep',
                 'Sale': 0,
             },
             {
                 name: 'Oct',
                 'Sale': 0,
             },
             {
                 name: 'Nov',
                 'Sale': 0,
             },
             {
                name: 'Dec',
                 'Sale': 0,
             },
         ]
if(productId){
    
    data.forEach(p=>{
        let dato=0
        p.produts.forEach(b=>{
            if(b.id===productId){
                dato=dato+b.price
            }
        })
        let fecha=new Date(p.time)
        console.log(fecha)
        if(fecha.getFullYear()===año){ 
            filter[fecha.getMonth()][`Sale`]= filter[fecha.getMonth()][`Sale`]+dato
        }
    })
}
return filter
}

export const estadisticas=()=>{}