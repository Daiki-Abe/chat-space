# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## user テーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true, index: true|
|email|string|null: false, unique: true|

### Association
- has_many :groups, through: :groups_users
- has_many :messages



## group テーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|member|string|index: true|
