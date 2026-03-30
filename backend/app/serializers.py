from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'
    
    def get_image(self, obj):
        """Return the full Cloudinary image URL with HTTPS"""
        if obj.image:
            image_url = str(obj.image)
            
            # Ensure HTTPS protocol
            if image_url.startswith('http://'):
                image_url = image_url.replace('http://', 'https://', 1)
            
            return image_url
        return None