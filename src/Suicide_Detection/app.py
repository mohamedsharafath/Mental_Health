from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import logging
import numpy as np  # Import NumPy

# Setup logging
logging.basicConfig(level=logging.INFO)

# Define the FastAPI app
app = FastAPI()

# Enable CORS for all domains
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the trained model
model_path = 'D:/COMPUTER_SCIENCE/PROJECTS/Mini_Project/mint-hackConcode/ML Model and API/Suicide Detection/SuicideModel.pkl'
if not os.path.exists(model_path):
    logging.error("Model file not found at the specified path.")
    raise FileNotFoundError("Model file not found.")

try:
    model = joblib.load(model_path)
    logging.info("Model loaded successfully.")
except Exception as e:
    logging.error(f"Error loading model: {e}")
    raise

# Define the data model for the request body
class StatementRequest(BaseModel):
    statement: str

# Define the prediction endpoint
@app.post("/predict")
async def predict(data: StatementRequest):
    try:
        # Reshape the input statement to be 2D
        statement = data.statement
        input_data = np.array([statement]).reshape(1, -1)  # Reshape to (1, -1)

        prediction = model.predict(input_data)[0]
        return {"prediction": prediction}
    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")
