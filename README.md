﻿# サービスの概要 -What's Memory 2 Earn and Motivation-

  

本サービスは、日記を書くことによりトークンを得ることのできるサービスです。

日々の記録でトークンを得られる仕組みを構築することにより、日記をつける習慣をユーザーが獲得することを狙っています。

我々は本サービスの構築により、リフレクション（内省）機会の増加を企図しており、ひいては日本で課題となっている非認知能力の育成や、ノンルーティン業務に従事できる社会人の育成にも資すると考えています。

  
  

# 使用したtech stacks

- React.js

- Next.js

- wagmi

- truffle

- Material-UI

- MongoDB(mongoose)

  

# 使用したBlockchain

Goerli

  

# deployしたContract

MemoryToEarn

([https://goerli.etherscan.io/address/0xf14c5601479fFBBAD536ba4d5BD556ff500e89Ca](https://goerli.etherscan.io/address/0xf14c5601479fFBBAD536ba4d5BD556ff500e89Ca  "https://goerli.etherscan.io/address/0xf14c5601479fFBBAD536ba4d5BD556ff500e89Ca"))

  

# システムの概要

本システムでは、現在のところ下記の機能を実装しています。

- ウォレットとの接続

- 日記帳（diary）作成（含：ブロックチェーン上への書き込み）

- ページ（page）作成、追加ページの発行

- ページ（page）への書込（含：トークンのmint）

- ページ（page）作成履歴閲覧

  

# How to Use

- まず、ユーザーは「CONNECT WALLET」から自身のウォレットを接続します。

- 接続が完了したら「CREATE DIARY!」を押下し、日記を作成します。（このとき、同時にブロックチェーン上への書込を行っています。）

- 日記が作成され、ユーザーには5ページの日記ページ（page）が提供されます。

- 「Empty Page」に対してページの内容を入力し「Write」を押すとページが作成されます。（ここでトークンをmintするかの確認が行われます。）

ここでは、ユーザーが日記に書きたい内容をすべて書くと、書き込み量が多くなりガス代が膨大になることが予想されるので、日記をつける外部サービスのURL等を記載することによりガス代を節減することを想定しています。

- 書込が完了し、トークン（MET）が10付与され（Token Amount）、残りのページ数（Remain Page Count）が1減少します。

- 日記が少なくなってきたら「ADD 5PAGES」を押下すると、5METを消費し、ページ数（Remain Page Count）が5増加します。

- 記録を残したすべてのページは「Your Pages」に記録されていきます。

  

# 今後の重要課題

今後は下記の重要課題を解決しながらサービス・システム開発を進めていくことになっています。

  

- MET（トークン）のmint/burnの適切な量の設定（トケノミクスの構築）

- 外部日記サービスとの接続、およびUXを阻害しない接続方法の検討

- ユーザーが負担するガス代の節減方法の検討

- 1文字だけ書いて日記としてカウントされるといったような不適なトークン利得の防止方法検討

  

# 【参考】市場性

我々は、本ハッカソン期間中にユーザーのペインに関するアンケート調査を行うことで、本システムの市場性を検証した（有効回答数：87）。

ここでは、アンケート結果から明らかになった示唆を記載する。

  

- 【前提】年齢は10～60代、性別も男女半々にする等、幅広い対象から回答を得ている。

- 日記などの日常的な記録（以下「日記」）をつけている人は、全体の33%程度。

- その中で日記を半年以上継続的につけている人は85%程度。

- 日記をつけていない人の中でも「日記をつけたい」と思っている人は、約半数存在。

- 以上を踏まえると、回答者全体の33%が「日記をつけたい」と考えている。

- 「現在日記をつけている人」と「現在は日記をつけていないが過去につけていた人」を比較すると、後者の方が日記をつけられなかったときのストレスは高い傾向がみられた。

- 全体的に日記を見返したときに幸せを感じる人はかなり多かった（10段階評価で8-10を付けた人が全体の半分を占める）。

  

上記を踏まえると、本サービスは下記のようなアプローチ方法が妥当であると考えている。但し、これは現時点での仮説である。今後は、アンケートで「インタビューへの協力をしてもよい」との回答を得られた36名のうち数名にインタビューを行い、本仮説の検証を継続的に実施する予定である。

  

- 初期は「①現在日記を継続的につけている人」と「②現在日記をつけていないが日記をつけたいと思っている人で、日記を継続できないことにストレスを感じる人」をターゲットとする。

- ①のターゲットについては「どうせ日記をつけるならトークンをもらえた方がいい」という発想になることを狙ってUXを構築し、ユーザー獲得を企図する。

- ②のターゲットについては、日記をつけられていないこと自体がペインであるので、そのペインにアプローチできるUXを構築し、ユーザー獲得を企図する。

- もちろん、①②いずれにもアプローチできるソリューションが提供できれば双方にアプローチするが、検証を進めた結果、いずれかを先行してフォーカスしながら開発を進める可能性もある。

# テスト方法
以下、テスト方法を記載する。

## ローカルサーバーの立ち上げ
はじめにコードをcloneする。

    git clone https://github.com/web3RWY/memory2earn.git

memory2earn/clientフォルダに移動し、依存パッケージのインストール

    cd memory2earn/client
    pnpm install
.env.local.exampleのファイル名を.env.localに変更する

ローカルサーバーとして起動する

    pnpm run dev

## ブラウザでアクセスする
Webブラウザでhttp://localhost:3000にアクセスする
**ウォレット接続時には必ずGoerliネットワークを選択してください**



