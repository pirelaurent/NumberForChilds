import requests
from dotenv import load_dotenv
import os

load_dotenv()  # This loads the variables from .env into the environment

# Now you can use the Bearer token from the environment
bearer_token = os.getenv('BEARER_TOKEN')
print(bearer_token);

# Replace 'your_api_key' with your actual OpenAI API key
headers = {
    'Authorization': f'Bearer {bearer_token}',
    "Content-Type": "application/json"
}
"""
A fun, rounded  alone spider designed in a cartoon manner for kids, in black palette,
wicked, squinting and strong, ready to jump,  
no too much big eyes, designed as the middle zero of 100 
don't show web at all 
"""
""" Une unique marguerite, en couleur , avec une seule feuille et de l'herbe au pied , façon cartoon
         """
data = {
    "model": "dall-e-3",
    "prompt": """
A fun, rounded alone spider, full visible in canvas and centered, designed in a cartoon manner for kids, colored with a soft palette
wicked, squinting and strong, ready to jump,  
no too much big eyes, no text at all,
don't show web at all 
""",
      
    "n": 1,
    "size": "1024x1024"
}
response = requests.post('https://api.openai.com/v1/images/generations', headers=headers, json=data)

if response.status_code == 200:
    image_info = response.json()
    print (image_info)

else:
    print("Error:", response.status_code, response.text)
