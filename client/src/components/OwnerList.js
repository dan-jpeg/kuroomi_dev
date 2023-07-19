import OwnerCard from "./OwnerCard"

function OwnerList({owners, handleClickOwner}) {


    const ownerComponents = owners.map(owner => {
        return <OwnerCard key={owner.id} owner={owner} handleClickOwner={handleClickOwner} />
    })

    return (
        <ul classname="owner-list">{ownerComponents} </ul>
    )
}

export default OwnerList;