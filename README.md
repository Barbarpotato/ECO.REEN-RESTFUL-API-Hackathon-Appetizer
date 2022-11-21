# ECOREN-API
This is the ECO.REEEN API project from APPETIZER Hackathon

### Accessing the Machine Json File
You can visit this exact endpoint: https://ecoren-api.vercel.app/machine with GET method to see the output of calculation emissions trough the Ecoloop Api. (Visit this link for further information: https://hanaloop.gitlab.io/pp/ecoloop-devportal/docs/intro)

### Accessing Analytics Json file
You can visit this exact endpoint: https://ecoren-api.vercel.app/analytics with GET method to see the output of total emissions of some dates, total CO2, total CH4, total N20, finance, total object, recover, etc.

### Accessing comparison Json file
You can visit this exact endpoint: https://ecoren-api.vercel.app/comparison with GET method to see the comparison of emission(CO2, N20, CH4, CO2EQ) between 4 different fuel type, i.e gas diesel-oil, Sub-Bituminous Coal, Other Bituminous Coal and biodiesel.

### Accessing Transportation Json file
You can visit this exact endpoint: https://ecoren-api.vercel.app/transportation with GET method to see the output of calculation transporation emissions with 5 different type of fuel. Accessing the the POST method will needed 5 input parameters, which is engine size, cylinders, fuelconsumptioncity, fuelconsumptionhwy, and the type of fuel (optional). This input value will be calculated using the deep learning models from tensorflow. You can visit who build this deep learning models in : 
[Felix Pratamasan - Machine Learning Engineer](https://github.com/lixx21/Transportation_Emission_Prediction)
