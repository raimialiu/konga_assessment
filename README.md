# Soft Alliance Assesssment

Steps to run this project:

1. pull down the code..
2. Run npm install
3. Set up env (add .env to the root of the project) using the content of the file .env.example as guide
4. Create database in your preferred database using the name set in the envv
5. Run npm start. This will automatically run migration and create test admin (email: test@admin.com, password: test)
6. You can login using the test admin details above in step 5
7. If you run npm test, make sure you change test values in test/app.test.ts otherwise test will fail
