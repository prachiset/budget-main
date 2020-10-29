from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'accounts', views.AccountCustomerViewSet, basename='accounts')
router.register(r'transactions', views.TransactionViewSet, basename='transactions')
router.register(r'budget/transactions', views.BudgetTransactionViewSet, basename='budget_transactions')
router.register(r'budget/summary', views.TransactionCategorySum, basename='budget_summary')
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]