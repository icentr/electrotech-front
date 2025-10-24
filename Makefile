install:
	git pull
	systemctl disable --now electrotech-front
	npm install
	npm run build
	mkdir -p /opt/electrotech/frontend
	cp -r .output/* /opt/electrotech/frontend
	cp  .env /opt/electrotech/frontend
	cp electrotech-front.service /lib/systemd/system/
	systemctl enable --now electrotech-front

IMAGE_NAME=electrotech-front

build-docker:
	docker build -t $(IMAGE_NAME) .

remove-docker:
	docker stop $(IMAGE_NAME) || true
	docker rm $(IMAGE_NAME) || true

run-docker:
	docker run -d --name $(IMAGE_NAME) -p 80:3000 $(IMAGE_NAME)


pull:
	git pull

restart: pull build-docker remove-docker run-docker
