from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from preprocessing import preprocess_image
from generator import run_style_transfer

app = Flask(__name__)
CORS(app)

# Folder where processed/generated images will be saved
IMAGES_FOLDER = '../'
GENERATED_FOLDER = os.path.join(IMAGES_FOLDER, 'images/generated')
os.makedirs(GENERATED_FOLDER, exist_ok=True)

@app.route('/style-transfer', methods=['POST'])
def style_transfer():
    data = request.json

    content_image_path = str(data.get('contentImage'))
    style_image_path = str(data.get('styleImage'))
    intensity = int(data.get('intensity'))

    content_tensor = preprocess_image(content_image_path)
    style_tensor = preprocess_image(style_image_path)

    output_image_path = run_style_transfer(content_tensor, style_tensor, intensity)

    return jsonify({'output_image_path': output_image_path})

if __name__ == '__main__':
    app.run(debug=True)
