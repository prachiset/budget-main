from django.db import models
from model_utils import Choices
from django.contrib.auth.models import User


TRANSACTION_CATEGORY = Choices(
        ('GROCERIES', 'Groceries'),
        ('ENTERTAINMENT', 'Entertainment'),
        ('HOME', 'Home and Decor'),
        ('FOOD_AND_DRINKS', 'Food and Drinks'),
        ('ELECTRONICS', 'Electronics'),
        ('PERSONAL', 'Personal'),
        ('HEALTH', 'Health and Wellness'),
        ('GAS', 'Gas'),
        ('SHOPPING', 'Shopping'),
        ('GIFT_AND_DONATION', 'Gift and Donations'),
        ('OTHERS', 'Others')
)


class Account(models.Model):
    ACCOUNT_TYPES = Choices(
        ('SAVINGS', 'Savings'),
        ('CHECKING', 'Checking'),
        ('CREDIT_CARD', 'Credit Card')
)
    account_number = models.AutoField(primary_key=True)
    account_type = models.CharField(max_length=15, choices=ACCOUNT_TYPES)
    account_balance = models.DecimalField(default=0, max_digits=9, decimal_places=2)
    account_opening_date = models.DateTimeField(auto_now_add=True)
    account_closing_date = models.DateTimeField(default=None, blank=True, null=True)
    account_active = models.BooleanField

    def __str__(self):
        return str(self.account_number)


class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    mobile_no = models.CharField("Mobile/Phone Number", max_length=10)
    address1 = models.CharField("Address Line 1", max_length=1024)
    address2 = models.CharField("Address Line 2", max_length=1024, null=True, blank=True)
    city = models.CharField("City", max_length=255)
    state = models.CharField("State", max_length=255)
    zip_code = models.CharField("ZIP / Postal code", max_length=12)
    country = models.CharField("Country", max_length=20, default='United Stated of America')
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username


class AccountCustomer(models.Model):
    account = models.ForeignKey(Account, related_name='account_customer', on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, related_name='account_customer', on_delete=models.CASCADE)


class Transaction(models.Model):
    TRANSACTION_TYPE = Choices(
        ('C', 'Credit'),
        ('D', 'Debit'),
        ('T', 'Transfer'),
    )
    transaction_id = models.AutoField(primary_key=True)
    account_number = models.ForeignKey(Account, on_delete=models.CASCADE)
    transaction_amount = models.DecimalField("Amount", default=0, max_digits=9, decimal_places=2)
    transaction_date = models.DateTimeField(auto_now_add=True)
    transaction_type = models.CharField(max_length=1, default='D', choices=TRANSACTION_TYPE, editable=True)
    merchant_name = models.CharField("Merchant Name", max_length=255)
    transaction_category = models.CharField(max_length=50, choices=TRANSACTION_CATEGORY)
    # owner = models.ForeignKey('auth.User', related_name='transaction', on_delete=models.CASCADE)
    parent_transaction_id = models.ForeignKey('self', null=True, on_delete=models.CASCADE)
    split_transactions_exist = models.BooleanField(default=False)
    is_split_transaction = models.BooleanField(default=False)

    def __str__(self):
        return str(self.transaction_id)

    class Meta:
        ordering = ['-transaction_date']












