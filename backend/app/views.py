from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
import cloudinary.uploader
from .models import Product, Category
from .serializers import ProductSerializer
import logging
import json

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
            logger.info(f"=== AddProduct Request ===")
            logger.info(f"Product name: {data.get('name')}")
            logger.info(f"Category: {data.get('category')}")
            logger.info(f"Has image: {'image' in request.FILES}")
            
            # Handle image upload to Cloudinary FIRST
            if 'image' in request.FILES:
                image_file = request.FILES['image']
                logger.info(f"Image filename: {image_file.name}, size: {image_file.size} bytes")
                try:
                    # Upload to Cloudinary with secure HTTPS
                    logger.info("Uploading to Cloudinary...")
                    upload_result = cloudinary.uploader.upload(
                        image_file,
                        folder='products/',
                        secure=True,
                        resource_type='auto'
                    )
                    logger.info(f"Cloudinary response: {json.dumps(upload_result, indent=2, default=str)}")
                    
                    # Store the secure HTTPS URL
                    cloudinary_url = upload_result.get('secure_url')
                    if not cloudinary_url:
                        cloudinary_url = upload_result.get('url')
                    
                    logger.info(f"Final URL to save: {cloudinary_url}")
                    data['image'] = cloudinary_url
                except Exception as e:
                    logger.error(f"Cloudinary upload FAILED: {str(e)}", exc_info=True)
                    return Response(
                        {'error': f'Image upload failed: {str(e)}'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                logger.warning("No image file provided in request")
            
            # Convert category name to category ID if needed
            if 'category' in data and isinstance(data['category'], str):
                try:
                    category = Category.objects.get(name=data['category'])
                    data['category'] = category.id
                    logger.info(f"Category '{data['category']}' found, ID: {category.id}")
                except Category.DoesNotExist:
                    logger.error(f"Category '{data['category']}' does not exist")
                    return Response(
                        {'error': f'Category "{data["category"]}" does not exist'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            
            logger.info(f"About to save with data: {data}")
            serializer = ProductSerializer(data=data)
            if serializer.is_valid():
                product = serializer.save()
                logger.info(f"✅ Product saved successfully. ID: {product.id}, Image: {product.image}")
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            logger.error(f"❌ Serializer validation failed: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"❌ Unexpected error: {str(e)}", exc_info=True)
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )