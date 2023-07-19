function ProductDisplay({displayedProduct, deelete,}) {
console.log(displayedProduct.title)
const url = displayedProduct.img_url
    return (
       <>
 <div className='div2'>{displayedProduct.title}</div>
 <div className='div3'>{displayedProduct.description}</div>
 <div className='div4'> <img alt='alt 'src={url} /> </div>
        </>
    )
}

export default ProductDisplay

// ? <div id='parent'>
// <div id='div1'>{displaysedProduct.title}`</div>
// <div id='div2'>{displayedProduct.artist}</div>
// <div id='div3'>{displayedProduct.description}</div>
// <div id='div4'><img alt={displayedProduct.title} src={displayedProduct.img_url} /></div>
// </div>
// )
// }