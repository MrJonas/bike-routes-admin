# Makefile

APP_NAME:="sociallyapp"
TARGET_DIRECTORY:="/root"
SERVER_IP:="212.24.104.202"
IMAGE_NAME:="sociallyapp"
CONTAINER_NAME:="sociallyapp"
TARBALL_NAME:="bundle.tar.gz."
URL:="8962b.k.dedikuoti.lt"
PORT:="3000"

PHONY: build
build:
	@echo "-------------------------------------------------------"
	@echo "Creates a tarball under ./deploy"
	@echo "-------------------------------------------------------"
	@echo "Building..."
	# Remove previous build
	@rm -rf ./bundle ./deploy/$(TARBALL_NAME)
	@meteor build . --server="$(URL)" --directory
	@cp ./deploy/Dockerfile ./bundle
	@tar -zcf ./$(TARBALL_NAME) ./bundle
	@mv ./$(TARBALL_NAME) ./deploy
	@rm -rf ./bundle
	@echo "Builded successfully!"
	@echo "(the build output tarball is ./deploy/bundle.tar.gz)".

PHONY: deploy
deploy:
	@echo "-------------------------------------------------------"
	@echo "Uploading and running app in a docker container"
	@echo "-------------------------------------------------------"
	@ssh root@$(SERVER_IP) \
		"cat > $(TARGET_DIRECTORY)/$(TARBALL_NAME) ; \
		cd $(TARGET_DIRECTORY) ; \
		tar -xzf ./$(TARBALL_NAME) ; \
		cd ./bundle ; \
		docker stop $(CONTAINER_NAME) ; \
		docker rm $(CONTAINER_NAME) ; \
		docker build --tag $(IMAGE_NAME) . ; \
		docker run -p $(PORT):80 --name $(CONTAINER_NAME) --link mongo_instance:mongo_instance -d $(IMAGE_NAME) ; \
		" \
	< ./deploy/$(TARBALL_NAME)
