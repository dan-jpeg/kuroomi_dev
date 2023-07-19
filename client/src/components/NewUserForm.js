import {useState} from 'react'

function NewUserForm({addProduct, updatePostFormData}){

    const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        <div className="user-form">
            <h2>new user</h2>
            {formSubmitted ? <h1>you haven been successfully registered </h1> :
            <form onSubmit={event => {
                addProduct(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }}>
                <input onChange={updatePostFormData} type="text" name="name" placeholder="name" required/>
                <input onChange={updatePostFormData} type="text" name="email" placeholder="email" required/>
                <input onChange={updatePostFormData} type="text" name="username" placeholder="username" required/>
                <input onChange={updatePostFormData} type="text" name="password" placeholder="password" required/>
                <input type="submit" value="add product"/>
            </form>}
        </div>
    )
}

export default NewUserForm