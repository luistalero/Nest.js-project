dev:
	docker-compose up --build -d

start:
	npm run docker:reset-db

down:
	npm run docker:clean

clean:
	docker-compose down --volumes

stop:
	docker-compose down
