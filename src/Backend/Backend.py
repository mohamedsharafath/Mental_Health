from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import logging
# import os
import preprocess_kgptalkie as ps
import re,pickle,os
import requests
from bs4 import BeautifulSoup

import instaloader

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
    
# Define a Pydantic model for the request body
# class InstagramRequest(BaseModel):
#     username: str

# # Function to scrape Instagram data
# def scrape_instagram_data(username: str):
#     L = instaloader.Instaloader()
#     try:
#         profile = instaloader.Profile.from_username(L.context, username)
#         followers_count = profile.followers
#         hashtags = []
#         captions = []
        
#         # Iterate over the posts to get captions and hashtags
#         for post in profile.get_posts():
#             captions.append(post.caption)
#             hashtags.extend(post.caption_hashtags)
        
#         return {
#             "followers_count": followers_count,
#             "captions": captions,
#             "hashtags": hashtags
#         }
#     except Exception as e:
#         raise HTTPException(status_code=400, detail=f"Error scraping Instagram: {str(e)}")

# # Endpoint to handle Instagram data scraping
# @app.post("/scrape_instagram")
# def scrape_data(request: InstagramRequest):
#     data = scrape_instagram_data(request.username)
#     return data



class InstagramRequest(BaseModel):
    username: str

def scrape_instagram_data(username):
    url = f"https://www.instagram.com/{username}/?__a=1&__d=dis"
    
    # Update with your actual session ID from Instagram
    session_cookies = {
        "sessionid": "70202134107%3AKg4eO7xJCNP2I4%3A14%3AAYepMOc5EwRHH1X5v0j0K9dHoGA54yERngvd3nHvIg"  # Replace with your session ID from Instagram
    }
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
        'Referer': f'https://www.instagram.com/{username}/',
    }
    
    try:
        response = requests.get(url, headers=headers, cookies=session_cookies)

        # Check response status
        if response.status_code == 200:
            content_type = response.headers.get('Content-Type', '')
            
            # Handle JSON response
            if 'application/json' in content_type:
                try:
                    profile_data = response.json()
                    user_data = profile_data['graphql']['user']
                    followers_count = user_data['edge_followed_by']['count']
                    captions = [
                        edge['node']['edge_media_to_caption']['edges'][0]['node']['text']
                        for edge in user_data['edge_owner_to_timeline_media']['edges']
                        if edge['node']['edge_media_to_caption']['edges']  # Ensure there's caption text
                    ]

                    return {
                        "followers_count": followers_count,
                        "captions": captions,
                        "status": "success"
                    }
                except (KeyError, ValueError) as e:
                    print("Error parsing JSON:", e)
                    return {"error": "Failed to parse JSON structure. Instagram data format might have changed."}
            
            # Handle HTML response
            elif 'text/html' in content_type:
                soup = BeautifulSoup(response.text, 'html.parser')
                titles = soup.find_all('title')
                title_texts = [title.get_text() for title in titles]
                return {"status": "success", "titles": title_texts}

            # Handle plain text response
            elif 'text/plain' in content_type:
                return {"status": "success", "content": response.text}

            else:
                print("Unexpected Content-Type:", content_type)
                return {"error": "Received unexpected Content-Type."}

        elif response.status_code == 302:
            return {"error": "Instagram requires login. Please update the cookies."}
        
        else:
            print(f"Request failed with status code: {response.status_code}")
            return {"error": f"Request failed with status code: {response.status_code}"}
    
    except requests.exceptions.RequestException as e:
        print(f"Request failed. Error: {e}")
        return {"error": "Failed to connect to Instagram."}

@app.post("/scrape_instagram")
def scrape_data(data: InstagramRequest):
    scraped_data = scrape_instagram_data(data.username)
    if "error" in scraped_data:
        raise HTTPException(status_code=400, detail=scraped_data["error"])
    return scraped_data


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)