# ECOREN-API
This is the ECO.REEEN API project from APPETIZER Hackathon

### Accessing the Machine Json File
You can visit this exact endpoint: https://ecoren-api.vercel.app/machine with GET method to see the output of calculation emissions trough the ecoloop api

### Accessing Analytics Json file
You can visit this exact endpoint: https://ecoren-api.vercel.app/analytics with GET method to see the output of total emissions of some dates, finance, total object, etc.

### Accessing Transportation Json file
You can visit this exact endpoint: https://ecoren-api.vercel.app/transportation with GET method to see the output of calculation transporation emissions with 5 different type of fuel. Accessing the the POST method will needed 5 input parameters, which is engine size, cylinders, fuelconsumptioncity, fuelconsumptionhwy, and the type of fuel (optional). This input value will be calculated using the deep learning models from tensorflow. You can visit who build this deep learning models in : https://github.com/lixx21/Transportation_Emission_Prediction
