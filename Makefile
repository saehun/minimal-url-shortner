build:
	yarn build
package:
	rm -r node_modules
	yarn install --production
	zip -rq9 lambda.zip node_modules dist
deploy:
	aws s3 cp ./lambda.zip s3://$(S3_LAMBDA_BUCKET)/$(S3_LAMBDA_OBJECT_KEY)
	aws lambda update-function-code \
		--region $(DYNAMODB_REGION) \
		--function-name $(FUNCTION_NAME) \
		--s3-bucket $(S3_LAMBDA_BUCKET) \
		--s3-key $(S3_LAMBDA_OBJECT_KEY) --publish
