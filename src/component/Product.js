import {useEffect,useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import {useDispatch,useSelector} from 'react-redux';
import { add } from '../store/cartSlice';
import {useNavigate} from 'react-router-dom'

function Product() {
    const [products,setProduct] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector(state => state);
    console.log(allProducts)
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
        .then(data => data.json())
        .then(result => setProduct(result))
    },[])

    const addToCart = (product) => {
        dispatch(add(product))
        setCartItems([...cartItems, product.id]);
    }

    const goToCart = () => {
        navigate('/cart'); // Redirect to cart page
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
                        {cartItems.includes(product.id) ? (
                        <Button variant="secondary" onClick={goToCart}>Go to Cart</Button>
                    ) : ( 
                        <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                    )}
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