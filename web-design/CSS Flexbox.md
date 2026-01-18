
<img width="1254" height="1352" alt="image" src="https://github.com/user-attachments/assets/d3e355fb-d6cc-40e4-8a05-f31352d5e93d" />
### ● 程式碼：
```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <title>Sticky Footer 範例</title>
    <style>
        /* 核心機制：設定 body 為 Flex 容器 */
        body {
            margin: 0;
            display: flex;          /* 啟用彈性盒子 */
            flex-direction: column; /* 讓子元素垂直排列 */
            min-height: 100vh;      /* 讓 body 最小高度等於整個螢幕 */
            font-family: sans-serif;
        }

        header {
            background-color: #1a237e;
            color: white;
            padding: 20px;
            text-align: center;
        }

        /* 核心機制：讓 main 自動撐開所有剩餘空間 */
        main {
            flex: 1;                /* 這個 1 代表「伸展權重」，它會吃掉所有空白處 */
            padding: 40px;
            background-color: #ffffff;
        }

        footer {
            background-color: #333;
            color: white;
            padding: 20px;
            text-align: center;
        }

        /* 裝飾用樣式 */
        .card {
            border: 2px dashed #ccc;
            padding: 20px;
            border-radius: 8px;
        }
    </style>
</head>
<body>

    <header>
        <h1>這是導覽列 (Header)</h1>
    </header>

    <main>
        <div class="card">
            <h2>主要內容區域 (Main)</h2>
            <p>目前內容很少，但因為設定了 <code>flex: 1</code>，這個區域會自動伸展，把 Footer 推到螢幕最下方。</p>
            <p>試著在這邊增加很多文字，當內容超過螢幕高度時，Footer 會正常地出現在頁面最末端。</p>
        </div>
    </main>

    <footer>
        <p>© 2026 版權所有 - 永遠在底部的頁腳</p>
    </footer>

</body>
</html>
```
