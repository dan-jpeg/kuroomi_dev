import {useState} from 'react'

function NewPropertyForm({addProperty, updatePostFormData}){

    const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        <div className="property-form">
            <h2>new property</h2>
            {formSubmitted ? <h1>property added </h1> :
            <form onSubmit={event => {
                addProperty(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }}>
                <input onChange={updatePostFormData} type="text" name="address" placeholder="address" required/>
                <input onChange={updatePostFormData} type="text" name="neighborhood" placeholder="neigbhborhood" required/>
                <input onChange={updatePostFormData} type="numerical" name="price" placeholder="price" required/>
                <input onChange={updatePostFormData} type="numerical" name="number_of_bedrooms" placeholder="# of bedrooms" required/>
                <input onChange={updatePostFormData} type='text' nane='borough' placeholder='borough' />
                <input type="submit" value="add property"/>
            </form>}
        </div>
    )
}

export default NewPropertyForm;