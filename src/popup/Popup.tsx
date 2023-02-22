import React, { ReactElement, useEffect, useState } from 'react';
import { getBucket } from '@extend-chrome/storage';
import { Container, Select } from '@mantine/core';

interface MyBucket {
  targetLang: string;
}

const bucket = getBucket<MyBucket>('my_bucket', 'sync');

const Popup = (): ReactElement => {
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    (async () => {
      const value = await bucket.get();
      if (value.targetLang) {
        setLang(value.targetLang);
      }
    })();
  }, []);

  const saveLang = (lang: string) => {
    bucket.set({ targetLang: lang });
    setLang(lang);
  };

  document.body.style.width = '20rem';
  document.body.style.height = '20rem';
  return (
    <Container p="xl">
      <Select
        label="どの言語に翻訳しますか？"
        defaultValue="EN"
        onChange={(value: string) => saveLang(value)}
        value={lang}
        data={[
          { value: 'EN', label: '英語' },
          { value: 'KO', label: '韓国語' },
          { value: 'ZH', label: '中国語' },
          { value: 'JA', label: '日本語' },
        ]}
      />
    </Container>
  );
};

export default Popup;
