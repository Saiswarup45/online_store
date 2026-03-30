# Generated migration for changing image field to CloudinaryField

from django.db import migrations
from cloudinary.models import CloudinaryField


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='image',
            field=CloudinaryField('image', blank=True, null=True),
        ),
    ]
