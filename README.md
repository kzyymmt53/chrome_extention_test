# React と TypeScript で Chrome Extention を作成

### テンプレートを取得

```bash
git clone https://github.com/sinanbekar/browser-extension-react-typescript-starter.git
```

### 開発サーバ立ち上げ

```bash
yarn install
yarn dev
```

### chrome に読み込む

chrome://extensions にアクセスし、dist ディレクトリを読み込む

### material ui 使うなら以下を実行

```bash
yarn add @mantine/core @mantine/hooks @emotion/react
```

### Storage API ラッパーインストール

```bash
yarn add @extend-chrome/storage
```

### Storage API ラッパー使い方

- Bucket 分割

```JavaScript
const bucket = getBucket<MyBucket>("bucketA");
```

- データ取得

```JavaScript
const value = await bucket.get();
console.log(value.target_lang);
```

- データ保存

```JavaScript
bucket.set({ target_lang: "EN" });
```

### yarn dev で開発サーバを起動しないで使うには

```bash
yarn build
```

ビルドして、chrome で取り込み
