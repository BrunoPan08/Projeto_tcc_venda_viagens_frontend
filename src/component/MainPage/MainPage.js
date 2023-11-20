import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Travel from '../Travel/Travel'
import Recommend from '../../Recommend/Recommend'
import Nav from '../Navigation/Nav'
import Sidebar from '../Sidebar/Sidebar'
import Cart from '../Cart/Cart'
import TravelDetails from '../TravelDetail/TravelDetail';

//DataBase
import products from '../../db/data'

const MainPage = () => {
  const [selectCategory, setSelectCategory] = useState(null)
  const[query,setQuery] = useState("")

  //Input Filter
  const handleInputChange = event => {
    setQuery(event.target.value)
  }

  const filteredItems = products.filter((product) => product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1)

  //Radio Filter
  const handleChange = event => {
    setSelectCategory(event.target.value)
  }

  //Button Filter
  const handleClick = event => {
    setSelectCategory(event.target.value)
  }

  function filteredData(products,selected, query) {
    let filteredProducts = products

    //filtering Input Items
    if(query) {
      filteredProducts = filteredItems
    }

    //Selected Filter
    if(selected) {
      filteredProducts = filteredProducts.filter(({category, color, company, newPrice, title, id }) => category === selected || color === selected ||
      company === selected || newPrice == selected || title === selected ||  id === selected)
    }
    
    
    return filteredProducts.map(({id,img, title,star, reviews, prevPrice,newPrice}) => (
      <Cart 
      key={Math.random()}
      id={id}
      img={img}
      title={title}
      star={star}
      reviews={reviews}
      newPrice={newPrice}
      prevPrice={prevPrice}
      />
    ))
  }
  
  const result = filteredData(products, selectCategory, query)
  
  return (
      <>
        <Sidebar handleChange={handleChange} />
        <Nav query={query} handleInputChange={handleInputChange} />
        <Recommend handleChange={handleClick} />
        <Routes>
          {/* Route for the product details page */}
          <Route path="/product/:productId" element={<TravelDetails products={products} />} />

        {/* Route for the main page */}
        <Route path="/" element={<Travel result={result} />} />
        </Routes>
      </>
  )
}

export default MainPage