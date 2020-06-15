# Node.js Call-CRUD Example walkthrough

This walkthrough will explain you how to correctly create a microservice to access to a CRUD of riders from the DevOps Console.

In order to do so, access to [Mia-Platform DevOps Console](https://console.cloud.mia-platform.eu/login), create a new project and go to the **Design** area. From the Design area of your project select _Microservices_ and then create a new one, you have now reached [Mia-Platform Marketplace](https://docs.mia-platform.eu/development_suite/api-console/api-design/marketplace/)!  
In the marketplace you will see a set of Examples and Templates that can be used to set-up microservices with a predefined and tested function.

For this walkthrough select the following example: **Node.js Call CRUD Example**.
Give your microservice the name you prefer, in this walkthrough we'll refer to it with the following name: **crud-example**. Then, fill the other required fields and confirm that you want to create a microservice.  
A more detailed description on how to create a Microservice can be found in [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#2-service-creation) section of Mia-Platform documentation.

This example requires to set the value of an environment variable to work properly. Go to the table *Environment variable configuration* of the newly created microservice *crud-example* and add the following (key = value):

```shell
CRUD_PATH = crud-service
```

More information on how to set an environment variable can be found in [Environment Variable Configuration](https://docs.mia-platform.eu/development_suite/api-console/api-design/services/#environment-variable-configuration) section of Mia-Platform documentation.

In order to access to your new microservice it is necessary to create an endpoint that targets it.  
In particular, in this walkthrough you will create an endpoint to your microservice *crud-example*. To do so, from the Design area of your project select _Endpoints_ and then create a new endpoint.
Now you need to choose a path for your endpoint and to connect this endpoint to your microservice. Give to your endpoint the following path: **/crud-call**. Then, specify that you want to connect your endpoint to a microservice and, finally, select *crud-example*.  
Step 3 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#3-creating-the-endpoint) section of Mia-Platform documentation will explain in detail how to create an endpoint from the DevOps Console.

The microservice that you have just created is able to connect to a CRUD of riders and to perform GET requests to obtain a list of riders or a single rider from its ID. The next step is to create this CRUD of riders so that your microservice can connect to it.  

From the Design area of your project select "CRUD" on the menu on the left sidebar. Give your CRUD the following name: **riders_crud**. Then confirm that you want to create a CRUD.  
Once you have created your CRUD of riders you can add some properties to it. In this walkthrough you should add two simple properties to your CRUD: *name* and *surname*, both of type *String*.  
A more deatiled description on how to create and add properties to a CRUD can be found in [CRUD](https://docs.mia-platform.eu/development_suite/api-console/api-design/crud_advanced/) section of Mia-Platform documentation.

Now you need to expose this CRUD with an endpoint. In particular, your *crud-example* microservice is designed to contact a CRUD with the following endpoint path: */riders*. In a similar way to what you have done when creating an endpoint to your microservice, you have to select _Endpoints_ section again.  
Give to your endpoint the following path: **/riders**. Then, specify that you want to connect your endpoint to a CRUD and, finally, select *riders_crud*.

After having created an endpoint to your CRUD you should save the changes that you have done to your project in the DevOps console.  Remember to choose a meaningful title for your commit (e.g "created service example_call_crud"). After some seconds you will be prompted with a popup message which confirms that you have successfully saved all your changes.  
Step 4 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#4-save-the-project) section of Mia-Platform documentation will explain how to correctly save the changes you have made on your project in the DevOps console.

Once all the changes that you have made are saved, you should deploy your project through the DevOps Console. Go to the **Deploy** area of the DevOps Console.  
Once here select the environment and the branch you have worked on and confirm your choices clicking on the *deploy* button. When the deploy process is finished you will receveive a pop-up message that will inform you.  
Step 5 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#5-deploy-the-project-through-the-api-console) section of Mia-Platform documentation will explain in detail how to correctly deploy your project.

Now, if you launch the following command on your terminal (remember to replace `<YOUR_PROJECT_HOST>` with the real host of your project)  :

```shell
curl <YOUR_PROJECT_HOST>/crud-call/riders
```

You should see the following message:

```json
[]
```

Since there are no riders in your CRUD, you received an empty list, but you can launch a POST request on your terminal to change this:

```shell
curl --request POST \
  --url <YOUR_PROJECT_HOST>/v2/riders/ \
  --header 'accept: */*' \
  --header 'content-type: application/json' \
  --data '{"name":"Foo","surname":"Bar","__STATE__":"PUBLIC"}'
  ```

After launching this command you should see in your terminal the id (<YOUR_RIDER_ID>) of the rider that you have just inserted in your CRUD.

Now, if you lanch again:

```shell
curl <YOUR_PROJECT_HOST>/crud-call/riders
```

the message that you see should be something like this:

```json
[{"_id": "<YOUR_RIDER_ID>","name":"Foo","surname":"Bar","__STATE__":"PUBLIC", ...}]
```

Congratulations! You have successfully learnt how to use our Node.js _Call CRUD_ Example on the DevOps Console!
