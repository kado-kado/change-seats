# CONTRIBUTING.md

## ⚠glib に関するビルド警告 (glib build warning)

### 日本語 (Japanese)

ビルド時に `glib` に関する次のような警告が表示される場合があります：

note: some crate(s) may be compiled with -C opt-level=3 instead of -C opt-level=z

これは **問題ではありません**。本プロジェクトは `glib` に **直接依存していません**。

この警告は、間接的な依存関係やビルドツールの影響で表示される場合がありますが、アプリケーションの動作やサイズには影響しません。

**特別な対応は不要です**。そのままビルドを続けて問題ありません。

**もし、glib を使用する際は、気をつけてください。**
  
---

### English (英語)

You might see a warning related to `glib` during the build process, such as:

note: some crate(s) may be compiled with -C opt-level=3 instead of -C opt-level=z

This is **not a problem**. This project **does not directly depend on `glib`**.

The warning may appear due to indirect dependencies or build tools, but it has no effect on the behavior or size of the final application.

**No special action is needed.** You can safely continue building the project.

**Please be careful if you choose to use `glib`.**
