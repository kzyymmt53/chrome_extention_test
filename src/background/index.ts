import browser from 'webextension-polyfill';

import store from '../app/store';
import { isDev } from '../shared/utils';

store.subscribe(() => {
  console.log('state', store.getState());
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'A',
    title: '(A)常に表示',
    contexts: ['all'],
  });
  chrome.contextMenus.create({
    id: 'B',
    title: '(B)選択時のみ表示',
    contexts: ['selection'],
  });
});

export {};
