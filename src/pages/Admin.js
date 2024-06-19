import React, { useState } from 'react';
import Modal from '../Components/Modal';

const Admin = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    description: '',
    image: null,
  });
  const [showSummary, setShowSummary] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSummary(true);
  };

  const handleConfirm = () => {
    // Handle the transaction confirmation logic here
    alert('Transaction confirmed!');
    setShowSummary(false);
    setFormData({ name: '', amount: '', description: '', image: null });
  };

  const handleCancel = () => {
    setShowSummary(false);
  };

  return (
    <div className='admin'>
      <h2>New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Recipient Address</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className='admin-input'
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type='number'
            name='amount'
            value={formData.amount}
            onChange={handleInputChange}
            className='admin-input'
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name='description'
            value={formData.description}
            onChange={handleInputChange}
            className='admin-input'
          />
        </div>
        <div>
          <label>Image Upload</label>
          <div className='file-input'>
            <input
              type='file'
              name='image'
              onChange={handleFileChange}
              className='admin-input file-input-hidden'
            />
            <button
              type='button'
              className='file-input-button'
              onClick={() =>
                document.querySelector('.file-input-hidden').click()
              }
            >
              Choose File
            </button>
            {formData.image && (
              <span className='file-input-name'>{formData.image.name}</span>
            )}
          </div>
        </div>
        <button type='submit' className='button'>
          Submit
        </button>
      </form>
      {showSummary && (
        <div className='summary'>
          <h3>Transaction Summary</h3>
          <p>Recipient Address: {formData.name}</p>
          <p>Amount: {formData.amount}</p>
          <p>Description: {formData.description}</p>
          {formData.image && <p>Image: {formData.image.name}</p>}
          <button className='button confirm' onClick={handleConfirm}>
            Confirm
          </button>
          <button className='button cancel' onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Admin;
