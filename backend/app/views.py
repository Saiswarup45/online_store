from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from .models import Product, Category
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
        try:
            data = request.data.copy()
            
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
            
            serializer = ProductSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )