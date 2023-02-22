import { getBucket } from '@extend-chrome/storage';
import browser from 'webextension-polyfill';

import store from '../app/store';
import { translate } from '../app/translate';
import { isDev } from '../shared/utils';

interface MyBucket {
  targetLang: string;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

store.subscribe(() => {
  console.log('state', store.getState());
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'translation',
    title: '選択したテキストを翻訳',
    contexts: ['selection'],
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab !== undefined) {
    switch (info.menuItemId) {
      case 'translation': {
        const selectedText = info.selectionText !== undefined ? info.selectionText : '';
        const value = await bucket.get();
        const userTargetLang = value.targetLang ?? 'EN';
        console.log(info.selectionText);
        const translatedText = await translate(selectedText, userTargetLang);
        console.log(translatedText);
        chrome.tabs.sendMessage(tab.id as number, {
          type: 'SHOW',
          data: {
            lang: userTargetLang,
            translatedText: translatedText,
            originalText: selectedText,
          },
        });
        break;
      }
    }
  }
});

export {};
