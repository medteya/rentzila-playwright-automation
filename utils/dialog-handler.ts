import { Page, Dialog } from '@playwright/test';

interface DialogOptions {
  accept?: boolean;        
  answerText?: string;     
}

export async function handleDialog(
        page: Page,
        action: () => Promise<unknown>,
        { accept = true, answerText = undefined }: DialogOptions
    ): Promise<string> {

  const dialogPromise = page.waitForEvent('dialog');

  const actionPromise = action();

  const dialog: Dialog = await dialogPromise;
  const message = dialog.message();


  accept ? await dialog.accept(answerText) : await dialog.dismiss();
  await actionPromise;

  return message;
}

export function acceptDialog(page: Page, action: () => Promise<unknown>) {
  return handleDialog(page, action, { accept: true });
}

export function dismissDialog(page: Page, action: () => Promise<unknown>) {
  return handleDialog(page, action, { accept: false });
}

export function answerPrompt(page: Page, action: () => Promise<unknown>, text: string) {
  return handleDialog(page, action, { accept: true, answerText: text });
}