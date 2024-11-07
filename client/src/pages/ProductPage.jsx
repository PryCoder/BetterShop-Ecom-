import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHeart, FaShareAlt, FaArrowLeft, FaSyncAlt, FaTruck, FaCalendarAlt, FaLock } from 'react-icons/fa';
import flipImage from './flip.jpg'; // Path to your logo image
import bobLogo from './bob.png'; // Bank logo
import iciLogo from './ici.png'; // Bank logo
import boiLogo from './boi.png'; // Bank logo
import hdfcLogo from './hdfc.png'; // Bank logo
import CommentSection from '../components/CommentSection';
import mobileLogo from './ip.jpg'
import lapLogo from './m9.jpg';
import tabLogo from './s0.jpg';
import accLogo from './a0.jpg';
import cloLogo from './f0.jpg';
import footLogo from './ff.jpg';
import acc2Logo from './aa0.jpg';
import furLogo from './hf.jpg';
import decLogo from './d1.jpg';
import appLogo from './ha.jpg';
import eduLogo from './et.jpg';
import outLogo from './ot.jpg';
import actLogo from './at.jpg';
import Rating from './Rating'; // Adjust the path as necessary

import { 
  ReturnableModal, 
  DeliveryModal, 
  WarrantyModal, 
  SecureTransactionModal,
  TermsModal
} from '../components/Modal'; // Import modals from Modals.js

const banks = [
  { name: "Bob Bank", logo: bobLogo, interestRate: 16, processingFee: 299 },
  { name: "ICICI Bank", logo: iciLogo, interestRate: 18, processingFee: 199 },
  { name: "Bank of India", logo: boiLogo, interestRate: 15, processingFee: 499 },
  { name: "HDFC Bank", logo: hdfcLogo, interestRate: 12, processingFee: 199 },
];

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isReturnableModalOpen, setIsReturnableModalOpen] = useState(false);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isWarrantyModalOpen, setIsWarrantyModalOpen] = useState(false);
  const [isSecureTransactionModalOpen, setIsSecureTransactionModalOpen] = useState(false);
  const [showEMIDropdown, setShowEMIDropdown] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('credit'); // Default payment method
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState('');
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/listings/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
        console.log('Product Image URL:', data.image);
        if (product.image) {
          setImageUrl(product.image);  // Use product.image here
        } else {
          setImageUrl('fallback-image-url');  // Handle no image case
        } 
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
;


 const calculateEMI = (totalAmount, interestRate, months) => {
  // Check the type and log it
  console.log("Total Amount:", totalAmount, "Type:", typeof totalAmount);

  const numericTotalAmount = parseFloat(totalAmount);
  if (isNaN(numericTotalAmount)) {
      console.error("Invalid totalAmount:", totalAmount);
      return; // Handle the error accordingly
  }

  const monthlyInterest = interestRate / 12 / 100; // Convert annual interest to monthly and percentage to decimal
  const emi = (numericTotalAmount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) / (Math.pow(1 + monthlyInterest, months) - 1);

  return emi.toFixed(2); // Format the result to 2 decimal places
};

const generateEMIPlans = (price, bank) => {
  const plans = [];
  const monthsOptions = [3, 6, 12, 24]; // Different month options
  monthsOptions.forEach(months => {
    const emiAmount = calculateEMI(price, bank.interestRate, months);
    const totalPayment = (emiAmount * months).toFixed(2); // Total amount paid over the period
    const totalInterest = (totalPayment - price).toFixed(2); // Interest paid

    plans.push({ 
      months, 
      amount: emiAmount, 
      total: totalPayment, 
      interest: totalInterest 
    });
  });
  return plans;
};


  const renderSpecifications = (specifications) => {
    if (!specifications) {
      return <p className="text-gray-500">No specifications available.</p>;
    }

    return Object.entries(specifications).map(([key, value]) => (
      <div key={key} className="flex justify-between py-2 border-b border-gray-300">
        <span className="font-bold mr-2">{capitalizeFirstLetter(key)}:</span>
        <span className="text-gray-700">{value}</span>
      </div>
    ));
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Calculate the discounted price based on the product price
  const calculateDiscountedPrice = (price) => {
    const originalPrice = price; // Original price
    const increasedPrice = originalPrice * 1.2; // Increase by 20%
    const discountedPrice = increasedPrice * 0.8; // Decrease by 20%
    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice * 100).toFixed(0);

    return {
      originalPrice,
      discountedPrice: discountedPrice.toFixed(2),
      discountPercentage,
    };
  };

  // Calculate the discounted price based on the product price
  const priceDetails = product ? calculateDiscountedPrice(product.price) : {};
 
  const handleShare = () => {
    if (product) {
      const message = `Limited-time deal: ${product.title}\nPrice: ₹${priceDetails.discountedPrice}\nDescription: ${product.description}`;
      const shareUrl = window.location.href; // or the relevant product URL
  
      console.log("Sharing with parameters:", {
        title: product.title,
        text: message,
        url: shareUrl,
      });
  
      if (navigator.share) {
        navigator.share({
          title: product.title,
          text: message,
          url: shareUrl,
        })
        .then(() => console.log('Share successful!'))
        .catch((error) => console.error('Error sharing:', error));
      } else {
        alert(message); // Fallback for non-supporting browsers
      }
    } else {
      alert('Product details are not loaded.');
    }
  };
  
  const handleOrderConfirmation = async () => {
    // Check if currentUser is available
    if (!currentUser || !currentUser._id) {
      alert("You must be logged in to place an order.");
      return;
    }
  
    const orderData = {
      listingId: id, // Assuming `id` is defined in your context
      userId: currentUser._id, // Use _id from currentUser
      paymentMethod, // Ensure this variable is defined
      deliveryOption: 'Standard', // Assuming default delivery option
      quantity: 1, // Default quantity
    };
  
    console.log("Order Data:", orderData);
  
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server Error:', errorData);
        throw new Error('Failed to create order: ' + (errorData.message || 'Unknown error'));
      }
  
      const result = await response.json();
      setOrderConfirmation(
        <div className="p-4 mt-4 bg-green-100 border border-green-300 rounded-lg text-green-800">
          <h3 className="text-lg font-semibold">🎉 Order Placed Successfully!</h3>
          <p className="mt-2">Your Order ID: <span className="font-mono">{result.order._id}</span></p>
          <p className="mt-2">Thank you for your purchase!</p>
        </div>
      );
      setIsPaymentModalOpen(false); // Close the modal on success
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place the order. Please try again later.');
    }
  };
  
  
  if (!product) {
    return <h6 className="text-center mt-10">Loading...</h6>;
  }

  const subcategoryImages = {
    laptop: lapLogo,
    mobile: mobileLogo,
    tablet: tabLogo,
    accessory: accLogo,
    clothing: cloLogo,
    footwear: footLogo,
    accessories: acc2Logo,
    furniture: furLogo,
    decor: decLogo,
    appliances:appLogo,
    educational: eduLogo,
    outdoor: outLogo,
    action:actLogo,
    
  };

  const subcategoryImage = subcategoryImages[product.subCategory] || '/images/subcategories/default.jpg';

  return ( 
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-gradient-to-r from-indigo-500 to-indigo-600">
        <div className="container mx-auto p-4">
          <Link to="/home" className="text-white">
            <FaArrowLeft />
          </Link>
          <h1 className="text-white text-2xl font-bold text-center">Product Details</h1>
        </div>
      </header>

      <div className="container mx-auto mt-8 max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
        <img src={subcategoryImage} alt={`${product.subCategory} image`} className="w-full h-auto" />


</div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex">
              <p className="text-lg text-red-500">-{priceDetails.discountPercentage}%</p>
              <p className="text-lg font-bold mb-2 ml-2">₹{priceDetails.discountedPrice}</p>
            </div>
            <p className="text-lg text-gray-400 line-through mb-4">
              M.R.P.: ₹{priceDetails.originalPrice.toFixed(2)}
            </p>
            <Rating listingId={product._id} />
            <div className="flex gap-4 mb-4">
              <button className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
                Add to Cart
              </button>
              <button 
                className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                onClick={() => setIsPaymentModalOpen(true)}>
                Buy Now
              </button>

            </div>
            <div className="flex gap-4 text-gray-600 mb-4">
              <button className="flex items-center hover:text-red-500">
                <FaHeart className="mr-2" /> Add to Wishlist
              </button>
              <button className="flex items-center hover:text-blue-500" onClick={handleShare}>
                <FaShareAlt className="mr-2" /> Share
              </button>
            </div>



                   {/* Payment Modal */}
      {isPaymentModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Select Payment Method</h2>
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  Credit Card
                </label>
                <label className="inline-flex items-center ml-4">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="emi"
                    checked={paymentMethod === 'emi'}
                    onChange={(e) => {
                      setPaymentMethod(e.target.value);
                      setShowEMIDropdown(!showEMIDropdown);
                    }}
                    className="mr-2"
                  />
                  EMI
                </label>
              </div>
              {showEMIDropdown && (
                <div>
                  <label htmlFor="bankSelect" className="block mb-2">Select Bank:</label>
                  <select
                    id="bankSelect"
                    className="border border-gray-300 rounded p-2 w-full"
                    value={selectedBank?.name || ''}
                    onChange={(e) => setSelectedBank(banks.find(bank => bank.name === e.target.value))}
                  >
                    <option value="" disabled>Select a bank</option>
                    {banks.map((bank) => (
                      <option key={bank.name} value={bank.name}>{bank.name}</option>
                    ))}
                  </select>
                  {selectedBank && (
  <div className="mt-4">
    <h4 className="text-lg font-bold">EMI Plans for {selectedBank.name}</h4>
    <ul>
      {generateEMIPlans(priceDetails.discountedPrice, selectedBank).map(plan => (
        <li key={plan.months} className="flex justify-between border-b py-2">
          <span>{plan.months} Months</span>
          <span>EMI: ₹{plan.amount} (Total: ₹{plan.total}, Interest: ₹{plan.interest})</span>
        </li>
      ))}
    </ul>
  </div>
)}

                </div>
              )}
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded"
                  onClick={() => setIsPaymentModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-indigo-600 text-white py-2 px-4 rounded"
                  onClick={handleOrderConfirmation}
                >
                  Confirm Payment
                </button>
              </div>
              {orderConfirmation && (
                <div className="mt-4 text-green-500">{orderConfirmation}</div>
              )}
            </div>
          </div>
        )} 

            {/* EMI Option Section */}
            <div className="mt-4">
              <h4 className="font-semibold">No Cost EMI available</h4>
              <button
                onClick={() => setShowEMIDropdown(!showEMIDropdown)}
                className="mt-2 text-violet-500 py-2 px-4 rounded hover:underline"
              >
                {showEMIDropdown ? 'Hide EMI Options' : 'Show EMI Options'}
              </button>
              {showEMIDropdown && (
                <div className="mt-2 bg-gray-50 p-4 border border-gray-300 rounded-lg">
                  {banks.map((bank, index) => (
                    <div key={index} className="mb-2">
                      <div
                        className="flex items-center cursor-pointer hover:bg-gray-200 p-2 rounded"
                        onClick={() => setSelectedBank(selectedBank === bank ? null : bank)}
                      >
                        <img src={bank.logo} alt={bank.name} className="h-8 mr-2" />
                        <span>{bank.name}</span>
                      </div>
                      {selectedBank === bank && (
  <div className="mt-2 p-4 border border-gray-300 rounded-lg bg-gray-100">
    <h5 className="font-semibold">EMI Plans for {bank.name}</h5>
    
    {generateEMIPlans(product.price, bank).map((plan, index) => (
      <div key={index} className="flex justify-between py-1">
        <span>{plan.months} Months - Interest: {plan.interest} - Total: {plan.total}</span>
      </div>
    ))}

    <p className="mt-2 text-gray-600">
      Processing Fee: ₹{bank.processingFee} by Bank
    </p>
    <p className="mt-2 text-gray-600">
      Note: The bank will continue to charge interest post the EMI duration
    </p>
  </div>
)}

                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* End of EMI Options */}

            {/* Slogan and Terms Button */}
            <div className="flex justify-between items-center mt-4">
              <img src={flipImage} alt="Fassured Logo" className="h-10" />
              <button onClick={() => setIsTermsModalOpen(true)} className="text-indigo-600 hover:underline">
                Terms and Conditions
              </button>
            </div>

        {/* Conditions Section */}
        <div className="flex items-center gap-4 mt-4 bg-gray-50 p-4 rounded-lg shadow-sm flex-nowrap ml-0 pl-0">
  <div className="flex flex-col items-center space-y-2" onClick={() => setIsReturnableModalOpen(true)}>
    <FaSyncAlt className="text-orange-600 text-2xl" />
    <p className="text-gray-700 font-medium cursor-pointer text-[8px] sm:text-xs text-center sm:text-left ml-2">7 Days Returnable</p>
  </div>
  <div className="flex flex-col items-center space-y-2" onClick={() => setIsDeliveryModalOpen(true)}>
    <FaTruck className="text-orange-600 text-2xl" />
    <p className="text-gray-700 font-medium cursor-pointer text-[8px] sm:text-xs text-center sm:text-left ml-2">Free Delivery</p>
  </div>
  <div className="flex flex-col items-center space-y-2" onClick={() => setIsWarrantyModalOpen(true)}>
    <FaCalendarAlt className="text-orange-600 text-2xl" />
    <p className="text-gray-700 font-medium cursor-pointer text-[8px] sm:text-xs text-center sm:text-left ml-2">1 Month Warranty</p>
  </div>
  <div className="flex flex-col items-center space-y-2" onClick={() => setIsSecureTransactionModalOpen(true)}>
    <FaLock className="text-orange-600 text-2xl" />
    <p className="text-gray-700 font-medium cursor-pointer text-[8px] sm:text-xs text-center sm:text-left ml-2">Secure Transaction</p>
  </div>
</div>







            {/* Specifications */}
            <div className="mt-4">
              <h4 className="font-semibold">Specifications</h4>
              {renderSpecifications(product.specifications)}
            </div>
          </div>
        </div>
      </div>

      {isPaymentModalOpen && (
  <div className="payment-modal">
    <h2>Confirm Your Order</h2>
    <label>
      Payment Method:
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="credit">Credit Card</option>
        <option value="paypal">PayPal</option>
        <option value="bank">Bank Transfer</option>
      </select>
    </label>
    <button onClick={handleOrderConfirmation}>Place Order</button>
    <button onClick={() => setIsPaymentModalOpen(false)}>Cancel</button>
  </div>
)}

{orderConfirmation && <p>{orderConfirmation}</p>}

  
 

      {/* Modals for Terms and Conditions and other features */}
      <TermsModal isOpen={isTermsModalOpen} toggleModal={() => setIsTermsModalOpen(false)} />
      <ReturnableModal isOpen={isReturnableModalOpen} toggleModal={() => setIsReturnableModalOpen(false)} />
      <DeliveryModal isOpen={isDeliveryModalOpen} toggleModal={() => setIsDeliveryModalOpen(false)} />
      <WarrantyModal isOpen={isWarrantyModalOpen} toggleModal={() => setIsWarrantyModalOpen(false)} />
      <SecureTransactionModal isOpen={isSecureTransactionModalOpen} toggleModal={() => setIsSecureTransactionModalOpen(false)} />
      <CommentSection listingId={product._id} />

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-8 py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductPage;
