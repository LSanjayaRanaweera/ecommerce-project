import axios from 'axios';
import {useNavigate} from 'react-router';
import { formatMoney } from "../../utils/money";    //Import formatMoney utility function to format money values

export function PaymentSummary({ paymentSummary, loadCart }) {
  const navigate = useNavigate();

  const createOrder = async () => {
    await axios.post('/api/orders');                //order is created in the backend?? 
    // To reset cart to and EMPTY cart, 1st get the loadCart prop from <CheckoutPage /> by adding it to props of <PaymentSummary />
    await loadCart();
    // Implement the feature to redirect back to order page >> useNavigate HOOK from react-router
    navigate('/orders');     //This is NOT asynchronous and executes immediately
  }
  return (
    <div className="payment-summary">
      <div className="payment-summary-title">Payment Summary</div>
      {paymentSummary /* Ensure payment summary is loaded before rendering details */ && (
        <>
          <div className="payment-summary-row">
            <div>Items ({paymentSummary.totalItems}):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.productCostCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.shippingCostCents)}
            </div>
          </div>

          <div className="payment-summary-row subtotal-row">
            <div>Total before tax: </div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
            </div>
          </div>

          <div className="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.taxCents)}
            </div>
          </div>

          <div className="payment-summary-row total-row">
            <div>Order total:</div>
            <div className="payment-summary-money">
              {formatMoney(paymentSummary.totalCostCents)}
            </div>
          </div>
          <button className="place-order-button button-primary" onClick={createOrder}>
            Place your order
          </button>
        </>
      )}
    </div>
  );
}
