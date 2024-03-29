import { Config } from '@jest/reporters';
import { HttpError } from 'testgear-api-client';
import { formatError } from './utils';

export default async (
  globalConfig: Config.GlobalConfig,
  projectConfig: Config.ProjectConfig
) => {
  const testRunId = projectConfig.globals['testRunId'];
  if (!testRunId) {
    console.error('Looks like globalSetup was not called');
    return;
  }
  try {
    await globalThis.testClient.completeTestRun();
  } catch (err) {
    console.error('Failed to complete test run', formatError(err as HttpError));
  }
};
