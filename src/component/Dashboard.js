import React, { useState,useEffect } from 'react';
import Product from './Product'
import { Carousel } from 'react-bootstrap';
function Dashboard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1)); // Ensure the index doesn't exceed the number of images
    }, 3000); // Change the interval duration as needed

    return () => clearInterval(interval);
  }, []);
  const images = ["/blackFriday.jpg", "electronics.jpg","shoes.jpg","allprod.jpg"]; // Add paths to all your product images
  return (
    <>
    <Carousel activeIndex={index} onSelect={setIndex}>
      {images.map((image, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={image}
            style={{'width':'100%','height':'40vh'}}
            alt={`Slide ${idx}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
        <Product />
    </>
  )
}

export default Dashboard