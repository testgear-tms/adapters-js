# TestGear TMS adapters for Jest
![TestGear](https://raw.githubusercontent.com/testgear-tms/adapters-js/master/images/banner.png)

## Getting Started

### Installation
```
npm install testgear-adapter-jest
```

## Usage

### API client

To use adapter you need to install `testgear-api-client`:
```
npm install testgear-api-client
```

### Configuration

| Description                                                                                                                                                                                                                                                                                                                                                                            | Property                   | Environment variable              | CLI argument                  |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------|-----------------------------------|-------------------------------|
| Location of the TMS instance                                                                                                                                                                                                                                                                                                                                                           | url                        | TMS_URL                           | tmsUrl                        |
| API secret key [How to getting API secret key?](https://github.com/testgear-tms/.github/tree/main/configuration#privatetoken)                                                                                                                                                                                                                                                            | privateToken               | TMS_PRIVATE_TOKEN                 | tmsPrivateToken               |
| ID of project in TMS instance [How to getting project ID?](https://github.com/testgear-tms/.github/tree/main/configuration#projectid)                                                                                                                                                                                                                                                    | projectId                  | TMS_PROJECT_ID                    | tmsProjectId                  |
| ID of configuration in TMS instance [How to getting configuration ID?](https://github.com/testgear-tms/.github/tree/main/configuration#configurationid)                                                                                                                                                                                                                                  | configurationId            | TMS_CONFIGURATION_ID              | tmsConfigurationId            |
| ID of the created test run in TMS instance.<br/>It's necessary for **adapterMode** 0 or 1                                                                                                                                                                                                                                                                                              | testRunId                  | TMS_TEST_RUN_ID                   | tmsTestRunId                  |
| Parameter for specifying the name of test run in TMS instance (**It's optional**). If it is not provided, it is created automatically                                                                                                                                                                                                                                                  | testRunName                | TMS_TEST_RUN_NAME                 | tmsTestRunName                |
| Adapter mode. Default value - 0. The adapter supports following modes:<br/>0 - in this mode, the adapter filters tests by test run ID and configuration ID, and sends the results to the test run<br/>1 - in this mode, the adapter sends all results to the test run without filtering<br/>2 - in this mode, the adapter creates a new test run and sends results to the new test run | adapterMode                | TMS_ADAPTER_MODE                  | tmsAdapterMode                |
| It enables/disables certificate validation (**It's optional**). Default value - true                                                                                                                                                                                                                                                                                                   | certValidation             | TMS_CERT_VALIDATION               | tmsCertValidation             |
| Mode of automatic creation test cases (**It's optional**). Default value - false. The adapter supports following modes:<br/>true - in this mode, the adapter will create a test case linked to the created autotest (not to the updated autotest)<br/>false - in this mode, the adapter will not create a test case                                                                    | automaticCreationTestCases | TMS_AUTOMATIC_CREATION_TEST_CASES | tmsAutomaticCreationTestCases |

#### File

1. You need to set custom jest test environment, setup and teardown in `jest.config.js`.

```js
module.exports = {
  testEnvironment: 'testgear-adapter-jest',
  globalSetup: 'testgear-adapter-jest/dist/globalSetup.js',
  globalTeardown: 'testgear-adapter-jest/dist/globalTeardown.js',
  testEnvironmentOptions: {
    url: 'URL',
    privateToken: 'USER_PRIVATE_TOKEN',
    projectId: 'PROJECT_ID',
    configurationId: 'CONFIGURATION_ID',
    testRunId: 'TEST_RUN_ID',
    adapterMode: ADAPTER_MODE,
    automaticCreationTestCases: AUTOMATIC_CREATION_TEST_CASES
  },
};
```

2. You also can extract environment configuration to external config and launch tests with `jest --config ./testgear.jest.config.js`.

```js
// testgear.jest.config.js
const defaultConfig = require('./jest.config');

module.exports = {
  ...defaultConfig,
  testEnvironment: 'testgear-adapter-jest',
  globalSetup: 'testgear-adapter-jest/dist/globalSetup.js',
  globalTeardown: 'testgear-adapter-jest/dist/globalTeardown.js',
  testEnvironmentOptions: {
    url: 'URL',
    privateToken: 'USER_PRIVATE_TOKEN',
    projectId: 'PROJECT_ID',
    configurationId: 'CONFIGURATION_ID',
    testRunId: 'TEST_RUN_ID',
    adapterMode: ADAPTER_MODE,
    automaticCreationTestCases: AUTOMATIC_CREATION_TEST_CASES
  },
};
```

#### Command line

You can also specify options via cli arguments `jest --testEnvironment testgear-adapter-jest --testEnvironmentOptions "{\"url\":\"URL\",\"privateToken\":\"USER_PRIVATE_TOKEN\",\"projectId\":\"PROJECT_ID\",\"configurationId\":\"CONFIGURATION_ID\",\"testRunId\":\"TEST_RUN_ID\",\"adapterMode\":ADAPTER_MODE,\"automaticCreationTestCases\":AUTOMATIC_CREATION_TEST_CASES}" --globalSetup testgear-adapter-jest/dist/globalSetup.js --globalTeardown testgear-adapter-jest/dist/globalTeardown.js`


### Methods

Methods can be used to specify information about autotest.

Description of metadata methods:
- `testgear.workItemIds` - linking an autotest to a test case
- `testgear.displayName` - name of the autotest in the TMS system (can be replaced with documentation strings)
- `testgear.externalId` - ID of the autotest within the project in the TMS System
- `testgear.title` - title in the autotest card
- `testgear.description` - description in the autotest card
- `testgear.labels` - tags in the work item
- `testgear.link` - links in the autotest card

Description of methods:
- `testgear.addLinks` - links in the autotest result
- `testgear.addAttachments` - uploading files in the autotest result
- `testgear.addMessage` - information about autotest in the autotest result

### Examples

#### Simple test
```js
test('All annotations', () => {
  testgear.externalId('all_annotations');
  testgear.displayName('All annotations');
  testgear.title('All annotations title');
  testgear.description('Test with all annotations');
  testgear.labels(['label1', 'label2']);

  testgear.addMessage('This is a message');
  testgear.addLinks([
    {
      url: 'https://www.google.com',
      title: 'Google',
      description: 'This is a link to Google',
      type: 'Related',
    },
  ]);

  testgear.addAttachments([join(__dirname, 'attachment1.txt')]);
  testgear.addAttachments('This is a custom attachment', 'custom.txt');

  expect(1).toBe(1);
});
```

#### Parameterized test
```js
test.each([1, 2, 3, 4])('Primitive params', (number) => {
  testgear.params(number);
  expect(number).toBe(number);
});

test.each([
  {
    a: 1,
    b: 2,
    sum: 3,
  },
  {
    a: 2,
    b: 3,
    sum: 5,
  },
  {
    a: 4,
    b: 3,
    sum: 5,
  }
])('Object params', (params) => {
  testgear.params(params);
  expect(params.a + params.b).toBe(params.sum);
});
```


# Contributing

You can help to develop the project. Any contributions are **greatly appreciated**.

* If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/testgear-tms/adapters-js/issues/new) to discuss it, or directly create a pull request after you edit the *README.md* file with necessary changes.
* Please make sure you check your spelling and grammar.
* Create individual PR for each suggestion.
* Please also read through the [Code Of Conduct](https://github.com/testgear-tms/adapters-js/blob/master/CODE_OF_CONDUCT.md) before posting your first idea as well.

# License

Distributed under the Apache-2.0 License. See [LICENSE](https://github.com/testgear-tms/adapters-js/blob/master/LICENSE.md) for more information.

