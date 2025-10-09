install:
	npm install
	npm run build
	mkdir -p /opt/electrotech/frontend
	cp -r .output/* /opt/electrotech/frontend
	cp electrotech-front.service /lib/systemd/system/
