from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import cloudinary.uploader
from .models import Product
from .serializers import ProductSerializer


class ProductList(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class AddProduct(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        data = request.data.copy()
        
        if 'image' in request.FILES:
            image_file = request.FILES['image']
            upload_result = cloudinary.uploader.upload(image_file, folder='products/')
            data['image'] = upload_result['secure_url']
        
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)