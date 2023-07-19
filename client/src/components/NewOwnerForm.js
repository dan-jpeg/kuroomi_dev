import {useState} from 'react'

function NewOwnerForm({addProduct, updatePostFormData}){

    const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        <div className="owner-form">
            <h2>new owner</h2>
            {formSubmitted ? <h1>owner added </h1> :
            <form onSubmit={event => {
                addProduct(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }}>
                <input onChange={updatePostFormData} type="text" name="name" placeholder="name" required/>
                <input type="submit" value="add owner"/>
            </form>}
        </div>
    )
}

export default NewOwnerForm