install:
	npm ci

gendiff:
	node bin/gendiff.js

lint:
	npx eslint .

lint-fix:
	npx eslint --fix .
	
publish:
	npm publish --dry-run

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
