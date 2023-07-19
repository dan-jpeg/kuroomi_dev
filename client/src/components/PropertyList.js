import Property from "./Property"

function PropertyList({properties, handleClickProperty}) {
    const propertyComponents = properties.map(property => {
        return <Property key={property.id} property={property} handleClickPropert={handleClickProperty} />
    })

    return (
        <ul classname="property-list">{propertyComponents} </ul>
    )
}

export default PropertyList