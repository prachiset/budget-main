from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    transactions = serializers.PrimaryKeyRelatedField(many=True, queryset=Transaction.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'transactions']


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['account_number', 'account_type', 'account_balance']


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['name', 'user']


class AccountCustomerSerializer(serializers.ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = AccountCustomer
        fields = ['account']


class TransactionSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Transaction
        fields = ['account_number', 'transaction_id', 'merchant_name', 'transaction_amount', 'transaction_date',
                  'transaction_type', 'transaction_category', 'owner']


class BudgetTransactionSerializer(serializers.ModelSerializer):

    def validate(self, data):
        if data['parent_transaction_id'] is None:
            raise serializers.ValidationError("parent_transaction_id is required to split a transaction.")
        else:
            data['is_split_transaction'] = True
            return data


    class Meta:
        model = Transaction
        fields = ['account_number', 'parent_transaction_id', 'transaction_id', 'merchant_name', 'transaction_amount',
                  'transaction_date', 'transaction_category', 'split_transactions_exist', 'is_split_transaction']


class TransactionCategorySerializer(serializers.Serializer):
    transaction_category = serializers.CharField(max_length=50)
    category_sum = serializers.DecimalField(default=0, max_digits=9, decimal_places=2)

    def create(self, validated_data):
        pass

    def update(self, instance, validated_data):
        pass

