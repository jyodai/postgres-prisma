all : help

help : 
	# up                コンテナの起動
	# stop              コンテナの停止
	# restart           コンテナの再起動

up :
	docker-compose up -d

stop :
	docker-compose stop

reset : stop up

sh :
	docker-compose exec app /bin/bash

sh_db :
	docker-compose exec db /bin/bash

sh_psql :
	docker-compose exec db /bin/bash -c " \
		psql -U admin -d mydb; \
	"

build :
	docker-compose build --no-cache
	make up
	make npm_build

npm_build :
	docker-compose exec app /bin/bash -c ' \
		npm run build; \
	'

npm_dev :
	docker-compose exec app /bin/bash -c ' \
		npm run dev; \
	'
