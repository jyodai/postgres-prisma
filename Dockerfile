#FROM node:18.17.1
#WORKDIR /app
# ベースイメージとしてNode.jsの公式イメージを使用
FROM node:latest

# pnpmのインストール
RUN npm install -g pnpm

# アプリケーションのファイルをコンテナ内にコピー
WORKDIR /app
COPY . .

# 依存関係のインストール
RUN pnpm install

# アプリケーションのビルド
RUN pnpm build

# アプリケーションの起動
CMD ["pnpm", "start"]

