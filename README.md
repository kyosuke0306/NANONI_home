# NANONI_home

NANONI の静的サイト（HTML / CSS / JavaScript）です。ビルドツールや外部ライブラリは使っていません。

公開先: https://kyosuke0306.github.io/NANONI_home/

## ディレクトリ構成

```
.
├── index.html              # トップページ
├── assets/
│   ├── css/style.css       # スタイル（配色はカスタムプロパティで一括変更可能）
│   └── js/main.js          # ナビゲーション開閉・年号の自動更新
└── .github/workflows/
    └── deploy.yml          # main への push で GitHub Pages へ自動デプロイ
```

## ローカルで確認する

`index.html` をブラウザで直接開くだけでも表示できます。ローカルサーバー経由で見たい場合は次のいずれかを実行してください。

```bash
python3 -m http.server 8000
# または
npx serve .
```

http://localhost:8000 を開きます。

## 公開の仕組み

`main` ブランチへ push すると GitHub Actions が走り、リポジトリの内容がそのまま GitHub Pages へデプロイされます。手動で実行したい場合は Actions タブから **Deploy to GitHub Pages** を選び、Run workflow を押してください。

### 初回のみ必要な設定

リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に変更してください。ここが `Deploy from a branch` のままだとワークフローが失敗します。

## 編集のしかた

- **文章を変える**: `index.html` の各セクション（`#top` / `#about` / `#features` / `#contact`）を書き換えます。
- **配色を変える**: `assets/css/style.css` 冒頭の `:root` にある `--accent` などを変更します。ダークモード用の値は同ファイルの `@media (prefers-color-scheme: dark)` 内にあります。
- **項目を増やす**: Features セクションの `.card` を複製すると、グリッドが自動で折り返します。
- **連絡先を変える**: Contact セクションの `mailto:` を実際のアドレスに置き換えます。

## 対応状況

- レスポンシブ（スマートフォン幅でハンバーガーメニューに切り替わります）
- ライト / ダークモードの自動切り替え
- キーボード操作とスクリーンリーダー向けの基本対応（スキップリンク、`aria-expanded` など）
