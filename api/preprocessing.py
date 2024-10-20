import torch
from PIL import Image
import torchvision.transforms as transforms

# Image preprocessing function
def preprocess_image(image_path):
    image = Image.open(image_path).convert('RGB')  # Convert to RGB if needed

    # Define the transformation pipeline
    transform = transforms.Compose([
        transforms.Resize((512, 512)),  # Resize to 512x512 pixels
        transforms.ToTensor(),  # Convert image to a tensor
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # Normalizing for VGG
    ])

    # Apply transformations and add batch dimension (for PyTorch model)
    image_tensor = transform(image).unsqueeze(0)
    return image_tensor
