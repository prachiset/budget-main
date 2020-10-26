# Purpose

- Create a Django application to store banking transactions
  from checking accounts, savings accounts, and credit cards
- Provide an API to allow someone to build a separate
  application to add, edit, review transactions
- assign transactions to transaction budgeting categories
- support spliting a single transaction across more than one categories
- You should be able to demonstrate a working django application minimally at a local development environment

## Transaction Categories

- Because this is a budgeting application, I want to be able to assign categories to transaction. e.g.:
- the $6.95 credit card charge to starbucks is categorized as "coffee", while the $62.12 at Costco is categorized as "groceries"

## Splits

- The idea of spliting transaction is needed if a single credit card spent is for two different things. For example, a $95.21 Costco charge may roughly be split between $50 for groceries, and $45.21 for home improvement

## Implementation

This repo is an application shell created with basic django commands. You do not have to use this at all if you prefer to build your django application differently. This is just an example

## Implementation Ideas

Here are some ideas about what the application may do:

- For a typical budgeting type of application, it should support multiple accounts, and different transaction types. Model these out in the models.py file
- Like more modern application architecture, the django app should provide RESTful API so that a separate front end can add/change/delete transactions
- For the purpose of this exercise, leave out APIs for other entities are totally ok, but their relationship should be shown
- It will be useful to be able to demonstrate the working API using other tools or django tools
