import { LinkPost } from 'testgear-api-client';
import { AdapterMode } from '../strategies/strategy.factory';

export namespace Origin {
  export interface TestConfig {
    title?: string,
    displayName?: string,
    description?: string,
    externalId?: string,
    links: LinkPost[],
    labels?: string[],
    workitemIds?: []
  }

  export interface TestText {
    name: string;
    content: string;
  }

  export interface TestMetadata {
    links?: LinkPost[];
    attachments?: string[];
    message?: string;
    text?: TestText
  }

  export interface Config {
    url?: string
    privateToken?: string,
    projectId?: string,
    configurationId?: string,
    testRunId?: string,
    testRunName?: string,
    adapterMode?: AdapterMode;
    configFile?: string,
    __DEV?: boolean
  }

  export type EnvironmentsConfig = Partial<{
    TMS_URL: string,
    TMS_PRIVATE_TOKEN: string,
    TMS_PROJECT_ID: string,
    TMS_CONFIGURATION_ID: string,
    TMS_TEST_RUN_ID: string,
    TMS_TEST_RUN_NAME: string,
    TMS_ADAPTER_MODE: AdapterMode,
    TMS_CONFIG_FILE: string,
  }>
}