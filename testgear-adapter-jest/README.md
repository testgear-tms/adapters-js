# Test Gear TMS adapters for Jest
![Test Gear](https://raw.githubusercontent.com/testgear-tms/adapters-js/master/images/banner.png)

## Getting Started

### Compatibility

| Test Gear | Adapter |
|-----------|---------|
| 3.5       | 1.0     |
| 4.0       | 1.1     |

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

#### File

1. You need to set custom jest test environment, setup and teardown in `jest.config.js`.

```js
module.exports = {
  testEnvironment: 'testgear-adapter-jest',
  globalSetup: 'testgear-adapter-jest/dist/globalSetup.js',
  globalTeardown: 'testgear-adapter-jest/dist/globalTeardown.js',
  testEnvironmentOptions: {
    url: '<url>',
    privateToken: '<token>',
    projectId: '<id>',
    configurationId: '<id>',
    testRunId: '<optional id>',
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
    url: '<url>',
    privateToken: '<token>',
    projectId: '<id>',
    configurationId: '<id>',
    testRunId: '<optional id>',
  },
};
```

3. Fill parameters with your configuration, where:  
    * `url` - location of the TMS instance  
      
    * `privateToken` - API secret key
        1. go to the https://{DOMAIN}/user-profile profile
        2. copy the API secret key
    
    * `projectId` - ID of project in TMS instance.
    
        1. create a project
        2. open DevTools -> network
        3. go to the project https://{DOMAIN}/projects/{PROJECT_ID}/tests
        4. GET-request project, Preview tab, copy id field  
    
    * `configurationId` - ID of configuration in TMS instance.
    
        1. create a project  
        2. open DevTools -> network  
        3. go to the project https://{DOMAIN}/projects/{PROJECT_ID}/tests  
        4. GET-request configurations, Preview tab, copy id field  
    
    * `testRunId` - id of the created test run in TMS instance. `testRunId` is optional. If it is not provided, it is created automatically.  
      
    * `testRunName` - parameter for specifying the name of test run in TMS instance. `testRunName` is optional. If it is not provided, it is created automatically.   

#### Command line

You can also specify options via cli arguments `jest --testEnvironment testgear-adapter-jest --testEnvironmentOptions "{\"url\":\"<url>\",\"privateToken\":\"<token>\",\"projectId\":\"<id>\",\"configurationId\":\"<id>\",\"testRunId\":\"<optional id>\"}" --globalSetup testgear-adapter-jest/dist/globalSetup.js --globalTeardown testgear-adapter-jest/dist/globalTeardown.js`


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
