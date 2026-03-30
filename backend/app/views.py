from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import cloudinary.uploader
from .models import Product, Category
from .serializers import ProductSerializer
import logging

logger = logging.getLogger(__name__)


class ProductList(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class AddProduct(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        try:
            data = request.data.copy()
            
            # Handle image upload to Cloudinary FIRST
            if 'image' in request.FILES:
                image_file = request.FILES['image']
                logger.info(f"Uploading image: {image_file.name}")
                try:
                    # Upload to Cloudinary with secure HTTPS
                    upload_result = cloudinary.uploader.upload(
                        image_file,
                        folder='products/',
                        secure=True,
                        resource_type='auto'
                    )
                    # Store the secure HTTPS URL
                    cloudinary_url = upload_result['secure_url']
                    logger.info(f"Cloudinary upload successful: {cloudinary_url}")
                    data['image'] = cloudinary_url
                except Exception as e:
                    logger.error(f"Cloudinary upload failed: {str(e)}")
                    return Response(
                        {'error': f'Image upload failed: {str(e)}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                logger.warning("No image file in request")
            
            # Convert category name to category ID if needed
            if 'category' in data and isinstance(data['category'], str):
                try:
                    category = Category.objects.get(name=data['category'])
                    data['category'] = category.id
                except Category.DoesNotExist:
                    return Response(
                        {'error': f'Category "{data["category"]}" does not exist'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            logger.info(f"Saving product with image: {data.get('image')}")
            serializer = ProductSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                logger.info(f"Product saved successfully")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            logger.error(f"Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )