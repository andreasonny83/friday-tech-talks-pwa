.PHONY: default \
	build \
	unit-tests

build:
	docker build --rm --tag cypress:node .

unit-tests: build
	docker run --rm cypress:node npm run test:ci
