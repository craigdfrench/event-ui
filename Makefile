build/index.html: src/* node_modules
	yarn build

node_modules: 
	npm install

clean: 
	rm -rf build
