import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function SuicidePrediction() {
  const [statement, setStatement] = useState('');  // State to store user input
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility
  const [prediction, setPrediction] = useState('');  // State to store API result
  const [loading, setLoading] = useState(false);     // State to show loading indicator

  // Function to handle API request
  const analyzeStatement = async () => {
    if (statement.trim() === '') {
      alert('Please enter a statement.');
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ statement }),
      });
  
      const data = await response.json();
      setPrediction(data.prediction || data.error);
      setShowModal(true); // Show modal with the result
    } catch (error) {
      alert('Error processing your request.');
      console.error(error);
    }
  };
  

  return (
    <div id="suicide-prediction-container">
      <h1>Detect Suicidal Intent</h1>
      <div className="prediction-input">
        <label htmlFor="user-statement">Enter a statement to analyze:</label><br />
        <textarea
          id="user-statement"
          rows="4"
          cols="50"
          placeholder="Type the statement here..."
          value={statement}
          onChange={(e) => setStatement(e.target.value)}  // Update statement value
        ></textarea>
        <br />
        <Button
          variant="primary"
          onClick={analyzeStatement}
          disabled={loading}  // Disable button while loading
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </Button>
      </div>

      {/* Modal to show prediction result */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Prediction Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {prediction ? `Prediction: ${prediction}` : 'No prediction available.'}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SuicidePrediction;
