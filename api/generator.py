import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models
import torchvision.transforms as transforms
import os
from PIL import Image

# Define the model (VGG) and layers for content and style extraction
class VGG(nn.Module):
    def __init__(self):
        super(VGG, self).__init__()
        self.model = models.vgg19(pretrained=True).features.eval()
        self.content_layers = ['0', '5', '10', '19', '28']  # Layers used for content/style extraction

    def forward(self, x):
        features = []
        for name, layer in self.model._modules.items():
            x = layer(x)
            if name in self.content_layers:
                features.append(x)
        return features

# Neural Style Transfer function
def run_style_transfer(content_tensor, style_tensor, intensity=1.0, num_steps=300):
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    
    # Load the model and transfer to the available device
    vgg = VGG().to(device)

    # Set requires_grad to True for generated image (starts with content)
    generated_tensor = content_tensor.clone().requires_grad_(True).to(device)
    content_tensor = content_tensor.to(device)
    style_tensor = style_tensor.to(device)

    # Optimizer
    optimizer = optim.Adam([generated_tensor], lr=0.01)

    for step in range(num_steps):
        # Extract features
        content_features = vgg(content_tensor)
        style_features = vgg(style_tensor)
        generated_features = vgg(generated_tensor)

        # Content loss (simplified for now)
        content_loss = torch.mean((generated_tensor - content_tensor) ** 2)

        # Style loss (to be refined with Gram matrix later)
        style_loss = torch.mean((generated_tensor - style_tensor) ** 2)

        # Total loss
        total_loss = content_loss + intensity * style_loss

        optimizer.zero_grad()
        total_loss.backward()
        optimizer.step()

        if step % 50 == 0:
            print(f"Step {step}/{num_steps}, Loss: {total_loss.item()}")

    # Save the generated image
    generated_image_path = save_image(generated_tensor, 'generated_image.jpg')
    return generated_image_path

# Save tensor as image
def save_image(tensor, filename):
    image = tensor.squeeze(0).cpu().detach()
    image = image * torch.tensor([0.229, 0.224, 0.225]).view(3, 1, 1) + torch.tensor([0.485, 0.456, 0.406]).view(3, 1, 1)
    image = torch.clamp(image, 0, 1)
    image = transforms.ToPILImage()(image)
    output_path = os.path.join('../images', 'generated', filename)
    image.save(output_path)
    return output_path
