# Node.js Call-CRUD Example walkthrough

[![Build Status][github-actions-svg]][github-actions]
[![Coverage Status][coverall-svg]][coverall-io]

This walkthrough will explain you how to correctly create a microservice to access to a CRUD of riders from the DevOps Console.

In order to do so, access to [Mia-Platform DevOps Console](https://console.cloud.mia-platform.eu/login).
Choose a project or create a new project and navigate to **Design** area. 

## Create a microservice

Select _CRUD_ on the menu on the left sidebar and now create a new one.
Choose from [Mia-Platform Marketplace](https://docs.mia-platform.eu/development_suite/api-console/api-design/marketplace/) for this walkthrough the following example: **Node.js Call CRUD Example**.
In the compilation form:
- Choose **microservices-example** as name of this service 
- In _Git repository owner_ use the recommended value
- In _Git repository name_ use the name that you will use for your project
- In _Docker Image Name_ use the recommended value contained in the select

then confirm that you want to create a microservice.
After this you will be redirected to your new microservice detail page.

A more detailed description on how to create a Microservice can be found in [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#2-service-creation) section of Mia-Platform documentation.

## Set an environment variable

This microservices example requires to set the value of an environment variable to work properly. 
Go to *Environment variable configuration* section at the bottom of the page.
Add a new field to the table. Inside the popup that will open compile the form with:
- key: CRUD_PATH
- value: {{YOUR CRUD SERVICE PATH}}

More information on how to set an environment variable can be found in [Environment Variable Configuration](https://docs.mia-platform.eu/development_suite/api-console/api-design/services/#environment-variable-configuration) section of Mia-Platform documentation.

## Expose an endpoint to your microservice

In order to access to your new microservice it is necessary to create an endpoint that targets it.  
To do so, from the Design area of your project select _Endpoints_ and then create a new endpoint and call it **/microservices-endpoint-example**. 
The type of this endpoint is *microservices*, 
then select the microservice calls **microservices-example** just created in [Create a microservice](#create-a-microservice).

See step 3 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#3-creating-the-endpoint) section of Mia-Platform documentation will explain in detail how to create an endpoint from the DevOps Console.

## Create a CRUD

Now the goal of this example is to call your crud with this service.
Inside of this service we have created some route: GET and POST for `/riders` and GET for `/riders/:id`.
The next step is create this CRUD of riders so that your microservice can connect to it.  

From the Design area of your project select "CRUD" on the menu on the left sidebar.
- Create a new CRUD with the following name: **riders** then you will be redirected to your CRUD detail page. 
- Add some properties to this crud in the *Fields* section.
In this walkthrough you should add two simple properties: *name* and *surname*, both of type *String*.
 
A more detailed description on how to create and add properties to a CRUD can be found in [CRUD](https://docs.mia-platform.eu/development_suite/api-console/api-design/crud_advanced/) section of Mia-Platform documentation.

## Expose an endpoint to your CRUD

Now you need to expose this CRUD with an endpoint.
In a similar way to what you have done when creating an endpoint to your microservice, you have to select _Endpoints_ section again.  
- Create a new endpoint called **/riders**. 
- Choose type crud 
- Select the *riders* CRUD created in [Create a CRUD](#create-a-crud) and select it.

Now you should have two endpoints, one for our CRUD *riders* and one for our microservice *microservices-example*
If these endpoints are missing we recommend that you review the steps explained above

## Save your changes

In design area you can see the **commit and generate** button.  
Click it and commit the changes that you have done in your project. 

###### Remember to choose a meaningful title for your commit (e.g "created service example_call_crud"). 

After some seconds you will be prompted with a popup message which confirms that you have successfully saved all your changes.

See step 4 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#4-save-the-project) section of Mia-Platform documentation will explain how to correctly save the changes you have made on your project in the DevOps console.

## Deploy
 
Go to the **Deploy** area of the DevOps Console.  
Here select environment and branch you have worked on and confirm your choices clicking on the *deploy* button. 
When the deploy process is finished you will receive a pop-up message that will inform you have successfully deployed.  

See step 5 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#5-deploy-the-project-through-the-api-console) section of Mia-Platform documentation will explain in detail how to correctly deploy your project.

## Try it

In navigation menu click the documentation sub menu and choose the environment in which you previously released your changes.
Launch the following command on your terminal (remember to replace `<YOUR_PROJECT_HOST>` with the real host of your project)

```shell
curl <YOUR_PROJECT_HOST>/microservices-example/riders
```

You should see the following message:

```json
[]
```

Since there are no riders in your CRUD, you received an empty list, but you can launch a POST request on your terminal to change this:

```shell
curl --request POST \
  --url <YOUR_PROJECT_HOST>/microservices-example/riders/ \
  --header 'accept: */*' \
  --header 'content-type: application/json' \
  --data '{"name":"Foo","surname":"Bar","__STATE__":"PUBLIC"}'
  ```

After launching this command you should see in your terminal the id (<YOUR_RIDER_ID>) of the rider that you have just inserted in your CRUD.
Launch again:

```shell
curl <YOUR_PROJECT_HOST>/microservices-example/riders
```

The message that you see should be something like this:

```json
[{"_id": "<YOUR_RIDER_ID>","name":"Foo","surname":"Bar","__STATE__":"PUBLIC", ...}]
```

Congratulations! You have successfully learnt how to use our Node.js _Call CRUD_ Example on the DevOps Console!

[github-actions]: https://github.com/mia-platform-marketplace/Node.js-Call-CRUD-Example/actions
[github-actions-svg]: https://github.com/mia-platform-marketplace/Node.js-Call-CRUD-Example/workflows/Node.js%20CI/badge.svg
[coverall-svg]: https://coveralls.io/repos/github/mia-platform-marketplace/Node.js-Call-CRUD-Example/badge.svg?branch=master
[coverall-io]: https://coveralls.io/github/mia-platform-marketplace/Node.js-Call-CRUD-Example?branch=master
