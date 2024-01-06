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
