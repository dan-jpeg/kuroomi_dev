import '../App.css';
import React, {useState, useEffect} from 'react'
import { Route, Switch } from "react-router-dom"
import Splash from './Splash';
import NavBar from './NavBar';
import PropertyList from './PropertyList';
import NewPropertyForm from './NewPropertyForm';
import NewOwnerForm from './NewOwnerForm';
import NewUserForm from './NewUserForm';
import axios from 'axios';
import Login from './Login';
import OwnerList from './OwnerList';
import Property from './Property';
import PropertySearch from './PropertySearch';


function App() {



//***/ states for backend data *

const [properties, setProperties] = useState ([])
const [users, setUsers] = useState ([])
const [owners, setOwners] = useState([])
const [reviews, setReviews] = useState([])



//***/ form data states *

const [postFormData, setPostFormData] = useState({})
const [patchFormData, setPatchFormData] = useState({})


//***/ ui states *

const [displayedProperty, setDisplayedProperty] = useState({})
const [budget, setBudget] = useState([])
const [neighborhood, setNeigborhood] = useState([])


//***/ login states *

const [adminMode, setAdminMode] = useState(true)
const [loginData, setLoginData] = useState({ username: '', password: '' });
const [loggedin, setLoggedin] = useState(false)
const [currentUser, setCurrentUser] = useState('null')

//***/ search states *

const [searchFilters, setSearchFilters] = useState({
    price: "",
    neighborhood: "",
    borough: ""
  });
const [sortCriteria, setSortCriteria] = useState(null);



//***/ fetch property & user data from backend 

useEffect(() => {
    fetch('/properties')
    .then(rsp => rsp.json())
    .then(propertyData => setProperties(propertyData),
    console.log(properties[0]))
}, [])

useEffect(() => {
  fetch('/users')
  .then(rsp => rsp.json())
  .then(userData => setUsers(userData),
  console.log(users[1]))
}, [])

useEffect(() => {
  fetch('/owners')
  .then(rsp => rsp.json())
  .then(ownerData => setOwners(ownerData),
  console.log(owners[1]))
}, [])

useEffect(() => {
  fetch('/reviews')
  .then(rsp => rsp.json())
  .then(reviewData => setReviews(reviewData),
  console.log(users[1]))
}, [])


const handleInputChange = (event) => {
  setSearchFilters({
    ...searchFilters,
    [event.target.name]: event.target.value
  });
};

const handleSortChange = (event) => {
  setSortCriteria(event.target.value);
  console.log(sortCriteria)
};



const filteredProperties = properties.filter((property) => {
  const { price, neighborhood, borough } = searchFilters;

  return (
    (price === "" || property.price <= parseInt(price)) &&
    (neighborhood === "" || property.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())) &&
    (borough === "" || property.borough.toLowerCase().includes(borough.toLowerCase()))
  );
});

const sortedProperties = [...filteredProperties].sort((a, b) => {
  if (sortCriteria === "price") {
    return a.price - b.price;
  } else if (sortCriteria === "borough") {
    return a.borough.localeCompare(b.borough);
  } else {
    return 0;
  }
});

const propertyComponents = sortedProperties.map((property) => (
  <Property key={property.id} property={property} handleClickPropert={handleClickProperty} />
));



//***/ ui function

function handleClickProperty(property) {
  setDisplayedProperty(property);
  console.log(displayedProperty)
}

function handleClickOwner(owner) {
  console.log(owner)
}


//***/ add/delete/update requests for the backend

function addProperty(event){
    event.preventDefault()

    fetch('/properties', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(postFormData)
    })
    .then(response => response.json())
    .then(newProperty => setProperties(properties => [...properties, newProperty]))
}

function addUser(event){
  event.preventDefault()

  fetch('/users', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(postFormData)
  })
  .then(response => response.json())
  .then(newProperty => setProperties(properties => [...properties, newProperty]))
}

function addOwner(event){
  event.preventDefault()

  fetch('/owners', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(postFormData)
  })
  .then(response => response.json())
  .then(newProperty => setProperties(properties => [...properties, newProperty]))
}

const handleLogin = (username) => {

  setCurrentUser(username)
  console.log(currentUser)
  setLoggedin(true)

};



function updatePostFormData(event){
    setPostFormData({...postFormData, [event.target.name]: event.target.value})
  }

  function updatePatchFormData(event){
    setPatchFormData({...patchFormData, [event.target.name]: event.target.value})
  }

  const updateLoginFormData = (event) => {
    setLoginData({...loginData, [event.target.name]: event.target.value})
    console.log(loginData)
  }

return (
    <div className="app">
      <Splash />
      <NavBar adminMode={adminMode} currentUser={currentUser} loggedin={loggedin}/>
     
      <PropertySearch sortedProperties={sortedProperties} propertyComponents={propertyComponents} searchFilters={searchFilters} sortCriteria={sortCriteria} handleInputChange={handleInputChange} handleSortChange={handleSortChange}/>
      {/* <PropertyList sortedProperties={sortedProperties} handleClickProperty={handleClickProperty}/> */}
      {/* <Login handleLogin={handleLogin} loginData={loginData} setLoginData={setLoginData} updateLoginFormData={updateLoginFormData}/> */}
      {/* <Header /> */}
      <Switch>
        <Route exact path="/">
        </Route>
        <Route path="/owners">
          <OwnerList owners={owners} handleClickOwner={handleClickOwner} />
        </Route>
        <Route path="/add_property">
          <NewPropertyForm addProperty={addProperty} updatePostFormData={updatePostFormData} />
        </Route>
        <Route path="/add_user">
          <NewUserForm addUser={addUser} updatePostFormData={updatePostFormData} />
        </Route>
        <Route path="/add_owner">
          <NewOwnerForm addOwner={addOwner} updatePostFormData={updatePostFormData} />
        </Route>

        {/* <Route path="/update_property">
          <UpdateProductForm updateProduct={updateProduct} setIdToUpdate={setIdToUpdate} updatePatchFormData={updatePatchFormData} products={products}/>
        </Route> */}
      </Switch>
      
    </div>
  );
}

export default App;



// function updateProperty(e){
//     e.preventDefault()
//     fetch(`/properties/${idToUpdate}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json"
//         },
//         body: JSON.stringify(patchFormData)
//     })
//     .then(rsp => rsp.json())
//     .then(updatedProperty => {
//         setProperties(properties => {
//             return properties.map(p => {
//                 if(p.id == updatedProperty.id) {
//                     return updatedProperty
//                 } else {
//                     return p
//                 }
//             })
//         })
//     })
// }



// function deleteProperty(id){
//     fetch(`/properties/${id}`, {
//         method: "DELETE"
//     })
//     .then(() => setProperties(properties => {
//         return properties.filter(property => {
//             return property.id !== id
//         })
//     }))
// }

// function isPasswordValid(password) {
  
//   if (!/[A-Z]/.test(password)) {
//     return false;
//   }
  

//   if (!/[a-z]/.test(password)) {
//     return false;
//   }
  
  
//   if (!/\d|\W/.test(password)) {
//     return false;
//   }
  
 
//   return true;
// }

