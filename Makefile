IMAGE_NAME = mood-booster
CONTAINER_NAME = mood-booster

PORT = 8081

.PHONY: build run start

build:
	docker build -t $(IMAGE_NAME) .

run:
	-docker rm -f $(CONTAINER_NAME)
	docker run -d --name $(CONTAINER_NAME) -p $(PORT):80 $(IMAGE_NAME)

start: build run

