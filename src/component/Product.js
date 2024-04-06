import {useEffect,useState} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import {useDispatch,useSelector} from 'react-redux';
import { add } from '../store/cartSlice';
import {useNavigate} from 'react-router-dom'

function Product() {
    const [products,setProduct] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector(state => state);
    console.log(allProducts)
    useEffect(() => {
        fetch('https://dummyjson.com/products')
        .then(data => data.json())
        .then(result => setProduct(result["products"]))
    },[])

    const addToCart = (product) => {
        dispatch(add(product))
        setCartItems([...cartItems, product.id]);
    }

    const goToCart = () => {
        navigate('/cart'); 
    }

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const cart = currentProducts.map(product => (
        <div className='col-md-3' key={product.id}>
            <Card style={{ width: '18rem', height: '22rem', textAlign: 'center', margin: '1rem' }}>
                <div className='text-center' style={{ marginTop: '1rem' }}>
                    <Card.Img variant="top" src={product.thumbnail} style={{ width: '15rem', height: '12rem' }} />
                </div>
                <Card.Body>
                    <Card.Title>{product.title.length > 15 ? product.title.slice(0, 15) + '...' : product.title}</Card.Title>
                    <Card.Text>
                        Rs {product.price}
                    </Card.Text>
                    {cartItems.includes(product.id) ? (
                        <Button variant="secondary" onClick={goToCart}>Go to Cart</Button>
                    ) : (
                            <>
                                <Button variant="primary" onClick={() => addToCart(product)}>Add to Cart</Button>
                                <Button style={{ 'backgroundColor': '#003C43', 'color': '#fff', 'borderColor': '#003C43', 'marginLeft': '1rem' }} onClick={() => handleViewDetails(product)}>View Details</Button>
                            </>
                        )}
                </Card.Body>
            </Card>
        </div>
    ));

    const modalContent = selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>{selectedProduct.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel interval={1000} pause={false}>
                    {selectedProduct.images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={image}
                                style={{ width: '15rem', height: '12rem' }}
                                alt={`Slide ${index}`}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
                <div>
                    <p>Price: Rs {selectedProduct.price}</p>
                    <p>{selectedProduct.description}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <Container>
                <div className='row'>
                    {cart}
                </div>
                <nav>
                    <ul className='pagination'>
                        {pageNumbers.map(number => (
                            <li key={number} className='page-item'>
                                <button onClick={() => paginate(number)} className='page-link'>
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
            {modalContent}

        </>
    )
}

export default Product;