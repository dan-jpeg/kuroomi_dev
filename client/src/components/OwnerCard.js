import { useState } from 'react';

function OwnerCard({ owner, handleClickOwner }) {

    const [showReviews, setShowReviews] = useState(false)
    const [showProperties, setShowProperties] = useState(false)

    const ownerProperties = owner.properties.map(p => {
        return (
            <li>{p.price}{p.rooms}{p.neighborhood}</li>
        )
    })

    const togglePropertiesDisplay = () => {
        setShowProperties(!showProperties)
    }

    const toggleReviewsDisplay = () => {
        setShowReviews(!showReviews)
    }
    return (
        <li className="owner">
            <h3>{owner.name}</h3>
            <h5>rating: {owner.average_rating}</h5>
            <h3 onClick={togglePropertiesDisplay}>properties</h3>
                {showProperties ? <li onClick={togglePropertiesDisplay}>{ownerProperties}</li> : ''}
            <h3>reviews</h3>
        </li>
    )
}

export default OwnerCard;