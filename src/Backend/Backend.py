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

# Load your ML model and vectorizer (update the path accordingly)
depression_model_path = 'D:/COMPUTER_SCIENCE/PROJECTS/Mini_Project/mini_project/src/Backend/Depression/DepressionModel.pkl'
depression_vectorizer_path = 'D:/COMPUTER_SCIENCE/PROJECTS/Mini_Project/mini_project/src/Backend/Depression/Vectorizer.pkl'  # Update the path

suicide_model_path = 'D:/COMPUTER_SCIENCE/PROJECTS/Mini_Project/mini_project/src/Backend/Suicide_Detection/Suicide_Model.pkl'
suicide_vectorizer_path = 'D:/COMPUTER_SCIENCE/PROJECTS/Mini_Project/mini_project/src/Backend/Suicide_Detection/Suicide_Vectorizer.pkl'

schizophrenia_model_path = 'D:/COMPUTER_SCIENCE/PROJECTS/Mini_Project/mini_project/src/Backend/Schizophrenia/Schizo_Model.pkl'
schizophrenia_vectorizer_path = 'D:/COMPUTER_SCIENCE/PROJECTS/Mini_Project/mini_project/src/Backend/Schizophrenia/Schizophrenia_Vectorizer.pkl'

if os.path.exists(depression_model_path) and os.path.exists(depression_vectorizer_path):
    depression_model = joblib.load(depression_model_path)
    depression_tfidf = joblib.load(depression_vectorizer_path)  # Load your TF-IDF vectorizer
    logging.info("Model and vectorizer loaded successfully.")
else:
    logging.error("Model or vectorizer file not found. Please check the path.")
    raise FileNotFoundError("Model or vectorizer file not found. Please check the path.")

# Load Anxiety Model (Add similarly for suicide detection, bipolar, etc.)
if os.path.exists(suicide_model_path) and os.path.exists(suicide_vectorizer_path):
    suicidal_model = joblib.load(suicide_model_path)
    suicidal_tfidf = joblib.load(suicide_vectorizer_path)
    logging.info("Suicide model and vectorizer loaded successfully.")
else:
    logging.error("Suicide model or vectorizer file not found.")
    raise FileNotFoundError("Suicide model or vectorizer file not found.")

# Load Anxiety Model (Add similarly for suicide detection, bipolar, etc.)
if os.path.exists(schizophrenia_model_path) and os.path.exists(schizophrenia_vectorizer_path):
    schizophrenia_model = joblib.load(schizophrenia_model_path)
    schizophrenia_tfidf = joblib.load(schizophrenia_vectorizer_path)
    logging.info("schizophrenia model and vectorizer loaded successfully.")
else:
    logging.error("schizophrenia model or vectorizer file not found.")
    raise FileNotFoundError("schizophrenia model or vectorizer file not found.")

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
    vec = depression_tfidf.transform([cleaned_statement])
    
    # Make prediction using the model
    prediction = depression_model.predict(vec)[0]
    
    # Map the prediction to meaningful output
    if prediction == 1:
        return "The model predicts the statement to be: Anxious"
    elif prediction == 2:
        return "The model predicts the statement to be: Depressed"
    else:
        return "The model predicts the statement to be: Normal"
    
# Prediction Function (For Anxiety)
def predict_suicide(statement: str):
    cleaned_statement = get_clean(statement)
    vec = suicidal_tfidf.transform([cleaned_statement])
    prediction = suicidal_model.predict(vec)[0]

    if prediction == 1:
        return "The model predicts the statement to be: Suicidal"
    else:
        return "The model predicts the statement to be: Normal"
    
# Prediction Function (For Anxiety)
def predict_schizophrenia(statement: str):
    cleaned_statement = get_clean(statement)
    vec = schizophrenia_tfidf.transform([cleaned_statement])
    prediction = schizophrenia_model.predict(vec)[0]

    if prediction == 1:
        return "The model predicts the statement to be: Schizophrenic"
    else:
        return "The model predicts the statement to be: NotSchizophrenic"

@app.post("/predict_depression")
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


@app.post("/predict_suicide")
async def predict_suicide_endpoint(input: UserInput):
    try:
        logging.info(f"Received input statement for anxiety: {input.statement}")
        prediction_message = predict_suicide(input.statement)
        return {"message": prediction_message}
    except Exception as e:
        logging.error(f"Error during suicide prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict_schizophrenia")
async def predict_schizophrenia_endpoint(input: UserInput):
    try:
        logging.info(f"Received input statement for anxiety: {input.statement}")
        prediction_message = predict_schizophrenia(input.statement)
        return {"message": prediction_message}
    except Exception as e:
        logging.error(f"Error during schizophrenia prediction: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)