from django.test import TestCase
from django.urls import resolve, reverse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate, APIClient

from .views import TransactionViewSet, BudgetTransactionViewSet
from .models import Transaction


class AccountAPIRouteTest(TestCase):
    def test_accounts_url_resolves_to_accounts_view_set(self):
        url = reverse('accounts-list')
        view = resolve(url).func.__name__
        self.assertEqual(view, 'AccountCustomerViewSet')


class TransactionAPIRouteTest(TestCase):
    def test_transaction_url_resolves_to_transaction_view_set(self):
        url = reverse('transactions-list')
        view = resolve(url).func.__name__
        self.assertEqual(view, 'TransactionViewSet')


class BudgetAPIRouteTest(TestCase):
    def test_budget_transaction_url_resolves_to_budget_transaction_view_set(self):
        url = reverse('budget_transactions-list')
        view = resolve(url).func.__name__
        self.assertEqual(view, 'BudgetTransactionViewSet')


class BudgetCategoryAPIRouteTest(TestCase):
    def test_budget_category_url_resolves_to_budget_category_view_set(self):
        url = reverse('budget_category-list')
        view = resolve(url).func.__name__
        self.assertEqual(view, 'TransactionCategorySum')


class TransactionAPITest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_create_transaction(self):
        payload = {
            'account_number': 1,
            'transaction_amount': 300.00,
            'transaction_type': 'D',
            'merchant_name': 'Costco',
            'transaction_category': 'GROCERIES',
            'owner': 'prachi_sethi',
        }

        url = reverse('transactions-list')
        request = self.factory.post(path=url, data=payload)
        view = TransactionViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class BudgetTransactionAPITest(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_create_transaction(self):
        payload = {
            'account_number': 1,
            'parent_transaction_id': 2,
            'transaction_amount': 150.00,
            'transaction_type': 'D',
            'merchant_name': 'Costco',
            'transaction_category': 'HOME',
            'owner': 'prachi_sethi',
        }

        url = reverse('budget_transactions-list')
        request = self.factory.post(path=url, data=payload)
        view = BudgetTransactionViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

