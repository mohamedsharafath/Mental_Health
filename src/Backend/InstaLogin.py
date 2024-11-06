from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import pickle

def instagram_login(username, password):
    # Initialize the WebDriver
    driver = webdriver.Chrome()  # Use your preferred WebDriver
    driver.get("https://www.instagram.com/accounts/login/")

    # Wait for the page to load and locate elements
    time.sleep(3)

    # Input username
    username_field = driver.find_element(By.NAME, "username")
    username_field.send_keys("727722eucd023")

    # Input password
    password_field = driver.find_element(By.NAME, "password")
    password_field.send_keys("skcet@2004")
    password_field.send_keys(Keys.RETURN)

    # Wait for the user to be logged in
    time.sleep(5)

    # Save cookies to a file
    cookies = driver.get_cookies()
    with open("instagram_cookies.pkl", "wb") as file:
        pickle.dump(cookies, file)

    driver.quit()

# Use the function to log in and save cookies
instagram_login("your_instagram_username", "your_instagram_password")
