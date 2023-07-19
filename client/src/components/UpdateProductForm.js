import {useState} from 'react'

function UpdateProductForm({updateProduct, setIdToUpdate, updatePatchFormData, products}){

    const [updateFormSubmitted, setUpdateFormSubmitted] = useState(false)
    return (
        <div className="product-form">
            <h2>product update form</h2>
            {updateFormSubmitted ? <h1>update success</h1> :
            <form onSubmit={event => {
                updateProduct(event)
                setUpdateFormSubmitted(updateFormSubmitted => !updateFormSubmitted)
            }}>
                <label>choose please: </label>
                <select onChange={(event) => {
                    setIdToUpdate(event.target.value)
                }} name="id">
                {products.map(product => {
                    return <option key={product.id} value={product.id}>{`${product.id}: ${product.title}`}</option>
                })}
                </select>
                <input onChange={updatePatchFormData} type="text" name="title" placeholder="product name"/>
                <input onChange={updatePatchFormData} type="text" name="image" placeholder="img_url"/>
                <input type="submit" value="update product"/>
            </form>}
        </div>
    )
}

export default UpdateProductForm