import React from 'react';
import {useSelector} from 'react-redux';
import { remove } from '../store/cartSlice';
import {useDispatch} from 'react-redux'

function Cart() {
  const cartProducts = useSelector(state => state);
  return (
    <div className='row'>
        <CartItem cartProducts={cartProducts.cart}/>
    </div>
  )
}

const CartItem = ({ cartProducts }) => {
  const dispatch = useDispatch();
   const removeCartItem = (id) => {
      dispatch(remove(id))
   }
    return (
      <div className="container">
  <div className="row">
    <div className="col-md-6">
      {cartProducts.map(product => (
        <div key={product.id} className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={product.thumbnail} alt="Product" className="img-fluid rounded-start" style={{width:'10rem',height:'5rem'}} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price: ${product.price}</p>
                <button className="btn btn-danger" onClick={() => removeCartItem(product.id)}>Remove</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Total Price Details</h5>
          <p className="card-text">Total Items: {cartProducts.length}</p>
          <p className="card-text">Total Price: ${cartProducts.reduce((total, product) => total + product.price, 0)}</p>
          {/* Add any other price details you want to display here */}
        </div>
      </div>
    </div>
  </div>
</div>
    );
  }

export default Cart