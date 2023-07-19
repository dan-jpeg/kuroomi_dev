function Property({property, handleClickProperty}){
    const lb = '['
    const rb = ']'
    const newId = property.id + 10000
    return (
        <li className="property">
            <h1>  {property.neighborhood}  | {property.price} </h1>
            <h3> {property.address}</h3>
        </li>
    )
}

export default Property