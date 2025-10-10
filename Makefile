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
