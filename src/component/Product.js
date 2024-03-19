import {useEffect,useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {useDispatch} from 'react-redux';
import { add } from '../store/cartSlice';

function Product() {
    const [products,setProduct] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(data => data.json())
        .then(result => setProduct(result))
    },[])

    const addToCart = (product) => {
        dispatch(add(product))
    }

    const cart = products.map(product => (
        <div className='col-md-3'>
                <Card key={product.id} style={{ width: '18rem',height: '22rem',textAlign: 'center',margin: '1rem' }}>
                    <div className='text-center'>
                        <Card.Img variant="top" src={product.image} style={{ width: '15rem',height: '12rem' }}/>
                    </div>
                    <Card.Body>
                        <Card.Title>{product.title.length > 15 ? product.title.slice(0, 15) + '...' : product.title}</Card.Title>
                        <Card.Text>
                                Rs {product.price}
                        </Card.Text>
                    <Button variant="primary" onClick={() => addToCart(product)}>Add to cart</Button>
                </Card.Body>
            </Card>   
        </div>
    ))
  return (
    <>
        <Container>
            <div className='row'>
                {cart}
            </div>
        </Container>
        
    </>
  )
}

export default Product