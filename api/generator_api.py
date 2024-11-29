from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from models_and_scripts.neural_style_transfer import neural_style_transfer

app = Flask(__name__)
CORS(app)

# Folder where processed/generated images will be saved
IMAGES_FOLDER = '../'
GENERATED_FOLDER = os.path.join(IMAGES_FOLDER, 'images/generated')
os.makedirs(GENERATED_FOLDER, exist_ok=True)

@app.route('/style-transfer', methods=['POST'])
def style_transfer():
    data = request.json

    content_image_path = str(data.get('contentImagePath'))
    content_image_name = str(data.get('contentImageName'))
    style_image_path = str(data.get('styleImagePath'))
    style_image_name = str(data.get('styleImageName'))
    intensity = int(data.get('intensity'))
    output_path = str(data.get('outputFolder'))

    optimization_config = dict()
    default_resource_dir = os.path.join(os.path.dirname(__file__))
    optimization_config['content_images_dir'] = os.path.join(default_resource_dir, content_image_path)
    optimization_config['style_images_dir'] =  os.path.join(default_resource_dir, style_image_path)
    optimization_config['output_img_dir'] = os.path.join(default_resource_dir, output_path)
    optimization_config['img_format'] = (4, '.jpg')  # saves images in the format: %04d.jpg
    optimization_config['content_img_name'] = content_image_name
    optimization_config['style_img_name'] = style_image_name
    optimization_config['height'] = 400  # height of content and style images
    style_intensity = 10 ** (6 - ((intensity - 1)*5/99))
    optimization_config['content_weight'] = 8e2 * style_intensity   # weight factor for content loss
    optimization_config['style_weight'] = 1e5 # weight factor for style loss
    optimization_config['tv_weight'] = 1e-1  # weight factor for total variation loss
    optimization_config['optimizer'] = 'adam'  # 'lbfgs' or 'adam'
    optimization_config['model'] = 'vgg19'
    optimization_config['init_method'] = 'content'    # 'random' or 'content' or 'style'
    optimization_config['saving_freq'] = -1  # -1 means only save the final result (Saving Frequency)

    # original NST (Neural Style Transfer) algorithm (Gatys et al.)
    results_path = neural_style_transfer(optimization_config)

    return jsonify({'finalImageUrl': results_path})

if __name__ == '__main__':
    app.run(debug=True)
