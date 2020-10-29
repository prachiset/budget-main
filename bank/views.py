from django.utils.timezone import datetime
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .serializers import *
from rest_framework import permissions
from .permissions import IsOwnerOrReadOnly
from django.db.models import Sum, Subquery
from django.contrib.auth.models import User
from .models import Transaction, AccountCustomer
from pytz import timezone


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.filter(is_split_transaction=False)
    serializer_class = TransactionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['account_number']
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    #
    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)


class AccountCustomerViewSet(viewsets.ModelViewSet):
    queryset = AccountCustomer.objects.all()
    serializer_class = AccountCustomerSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['customer_id']


class BudgetTransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.filter(split_transactions_exist=False)
    serializer_class = BudgetTransactionSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['account_number']
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    #
    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)


class TransactionCategorySum(viewsets.ModelViewSet):
    serializer_class = TransactionCategorySerializer

    def get_queryset(self):
        account_number = self.request.GET.get('account_number')
        if self.request.method == 'GET' and 'month' in self.request.GET:
            transaction_month = self.request.GET.get('month')
            qs = Transaction.objects.filter(account_number=account_number).\
                filter(transaction_date__month=transaction_month) \
                .values('transaction_category').annotate(category_sum=Sum('transaction_amount')).order_by(
                '-category_sum')
            return qs
        else:
            qs = Transaction.objects.filter(account_number=account_number).values('transaction_category').\
                annotate(category_sum=Sum('transaction_amount')). \
            order_by('-category_sum')
            return qs
