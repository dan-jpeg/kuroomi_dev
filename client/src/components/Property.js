function Property({property, handleClickProperty, owners}){
    const lb = '['
    const rb = ']'
    const ownerIndex = property.id - 1
    console.log(owners[1])
    const newId = property.id + 10000
    return (
        
        <li className="property">
            <div className="propParent">
                <div className="p-address">{newId}</div>
                <div className="p-img"><img alt={property.address} src={property.img_url} /></div>
                <div className="p-info"> 
                <span className="p-neighborhood">{property.neighborhood}</span> <br />  
                 <span className="p-borough">{property.borough}</span> <br />
                 <ul className="info-list">
                    <li>{property.price}</li>
                    <li>{property.number_of_bedrooms}</li>
                    <li>owner rating: ★★★</li>
                    <li>{property.number_of_bedrooms}</li>
                 </ul>
                  {property.number_of_bedrooms}
                 </div>
                {/* <div className="p-owner">owner rating: {owners[1].average_rating}</div> */}
            </div>
        </li>
    )
}

export default Property