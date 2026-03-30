from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'
    
    def get_image(self, obj):
        """Return the full Cloudinary image URL"""
        if obj.image:
            # If image is already a string URL, return it
            if isinstance(obj.image, str):
                return obj.image
            # Otherwise get the URL from the CloudinaryField
            return obj.image.url if hasattr(obj.image, 'url') else str(obj.image)
        return None