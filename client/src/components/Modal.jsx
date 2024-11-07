import React from 'react';

export const ReturnableModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4">7 Days Returnable</h2>
        <p className="text-gray-700 mb-4">
          You can return your item within 7 days of receipt if it’s in its original condition.
        </p>
        <button onClick={toggleModal} className="mt-4 text-indigo-600 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export const DeliveryModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4">Free Delivery</h2>
        <p className="text-gray-700 mb-4">
          Enjoy free delivery on all orders. Delivery times may vary based on location.
        </p>
        <button onClick={toggleModal} className="mt-4 text-indigo-600 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export const WarrantyModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4">1 Month Warranty</h2>
        <p className="text-gray-700 mb-4">
          All products come with a 1-month warranty covering manufacturing defects.
        </p>
        <button onClick={toggleModal} className="mt-4 text-indigo-600 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export const SecureTransactionModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4">Secure Transaction</h2>
        <p className="text-gray-700 mb-4">
          Your transactions are secured with industry-standard encryption and security measures.
        </p>
        <button onClick={toggleModal} className="mt-4 text-indigo-600 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};

export const TermsModal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4">Terms and Conditions</h2>
        <p className="text-gray-700 mb-4">
          Please read these terms and conditions carefully before using our service. 
          By accessing or using our service, you agree to be bound by these terms.
        </p>
        <button onClick={toggleModal} className="mt-4 text-indigo-600 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
};
