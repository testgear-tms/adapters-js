import { World } from '@cucumber/cucumber';
import { LinkPost } from 'testgear-api-client';

export interface TestGearWorld extends World {
  addMessage(message: string): void;
  addLinks(links: LinkPost[]): void;
  addAttachments(attachments: string[]): void;
}
