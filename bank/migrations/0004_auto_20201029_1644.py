# Generated by Django 2.2 on 2020-10-29 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bank', '0003_auto_20201029_0620'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transaction',
            name='owner',
        ),
        migrations.AlterField(
            model_name='transaction',
            name='transaction_type',
            field=models.CharField(choices=[('C', 'Credit'), ('D', 'Debit'), ('T', 'Transfer')], default='D', max_length=1),
        ),
    ]