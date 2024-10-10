from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import logging
import os
import preprocess_kgptalkie as ps
import re

# Set up logging
logging.basicConfig(level=logging.INFO)

# Load your ML model and vectorizer (update the path accordingly)
model_path = 'D:/COMPUTER_SCIENCE/PROJECTS/Mini_Project/mini_project/src/Backend/DepressionModel.pkl'
vectorizer_path = 'D:/COMPUTER_SCIENCE/PROJECTS/Mini_Project/mini_project/src/Backend/Vectorizer.pkl'  # Update the path

if os.path.exists(model_path) and os.path.exists(vectorizer_path):
    model = joblib.load(model_path)
    tfidf = joblib.load(vectorizer_path)  # Load your TF-IDF vectorizer
    logging.info("Model and vectorizer loaded successfully.")
else:
    logging.error("Model or vectorizer file not found. Please check the path.")
    raise FileNotFoundError("Model or vectorizer file not found. Please check the path.")

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    statement: str

def get_clean(x):
    x = str(x).lower().replace('\\', '').replace('_', ' ')
    # x = ps.cont_exp(x)
    x = ps.remove_emails(x)
    x = ps.remove_urls(x)
    x = ps.remove_html_tags(x)
    x = ps.remove_rt(x)
    x = ps.remove_accented_chars(x)
    x = ps.remove_special_chars(x)
    x = re.sub("(.)\\1{2,}", "\\1", x)
    return x

def predict_tendency(statement: str):
    # Preprocess the input statement
    cleaned_statement = get_clean(statement)
    
    # Transform the cleaned statement using the TF-IDF vectorizer
    vec = tfidf.transform([cleaned_statement])
    
    # Make prediction using the model
    prediction = model.predict(vec)[0]
    
    # Map the prediction to meaningful output
    if prediction == 1:
        return "The model predicts the statement to be: Anxious"
    elif prediction == 2:
        return "The model predicts the statement to be: Depressed"
    else:
        return "The model predicts the statement to be: Normal"

@app.post("/predict")
async def predict(input: UserInput):
    # return {"message": "HELLO"}
    try:
        logging.info(f"Received input statement: {input.statement}")

        # Get prediction from the predict_tendency function
        prediction_message = predict_tendency(input.statement)
        return {"message": prediction_message}

    except Exception as e:
        logging.error(f"Error during prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)