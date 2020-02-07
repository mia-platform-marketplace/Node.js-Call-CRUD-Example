# Node.js service example with CRUD call
[![pipeline status][pipeline]][git-link]
[![coverage report][coverage]][git-link]

## Getting Started

### Summary
%CUSTOM_PLUGIN_SERVICE_DESCRIPTION%

This is an Example of a simple Node application calling the CRUD service.
It shows how to access the riders collection using our custom plugin for the requests.
The CRUD path to access is taken from the env variable CRUD_PATH.

For using the example provided you can run:

```shell
npm run start:local
```

This command will launch the service on `localhost:3000` with the environment variables defined
in this [file](./default.env).

### Local Development
To develop the service locally you need:
- Node 10+

To setup node, please if possible try to use [nvm][nvm], so you can manage multiple
versions easily. Once you have installed nvm, you can go inside the directory of the project and simply run
`nvm install`, the `.nvmrc` file will install and select the correct version if you don’t already have it.

Once you have all the dependency in place, you can launch:
```shell
npm i
npm run coverage
```

This two commands, will install the dependencies and run the tests with the coverage report that you can view as an HTML
page in `coverage/lcov-report/index.html`.

After running the coverage you can create your local copy of the default values for the `env` variables needed for
launching the application.
```shell
cp ./default.env ./.env
```

From now on, if you want to change anyone of the default values for the variables you can do it inside the `local.env`
file without pushing it to the remote repository.

Once you have all your dependency in place you can launch:
```shell
set -a && source .env
npm start
```

After that you will have the service exposed on your machine.

### Contributing
To contribute to the project, please be mindful for this simple rules:
1. Don’t commit directly on master
2. Start your branches with `feature/` or `fix/` based on the content of the branch
3. If possible, refer to the Jira issue id, inside the name of the branch, but not call it only `fix/BAAST3000`
4. Always commit in english
5. Once you are happy with your branch, open a [Merge Request][merge-request]


### Notes

The first project build will fail because the `package-lock.json`
file is missing.

[pipeline]: %GITLAB_BASE_URL%/%CUSTOM_PLUGIN_PROJECT_FULL_PATH%/badges/master/pipeline.svg
[coverage]: %GITLAB_BASE_URL%/%CUSTOM_PLUGIN_PROJECT_FULL_PATH%/badges/master/coverage.svg
[git-link]: %GITLAB_BASE_URL%/%CUSTOM_PLUGIN_PROJECT_FULL_PATH%/commits/master

[nvm]: https://github.com/nvm-sh/nvm
[merge-request]: %GITLAB_BASE_URL%/%CUSTOM_PLUGIN_PROJECT_FULL_PATH%/merge_requests
