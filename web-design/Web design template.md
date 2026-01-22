● 示意圖：

<img width="2550" height="1373" alt="image" src="https://github.com/user-attachments/assets/ad365d72-e590-4139-a72b-c5565db300ea" />

● 程式碼：
```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>網頁標題</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    
    <style>
        /* --- 基礎樣式與防溢出 --- */
        html { scroll-behavior: smooth; }
        html, body { max-width: 100%; overflow-x: hidden; margin: 0; padding: 0; }

        body {
            font-family: "Noto Sans TC", "Arial", sans-serif;
            background-color: #f4f4f4;
            color: #333;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        /* --- 1. 導覽列樣式 --- */
        .navbar-static {
            background-color: #1a237e;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
        }

        .navbar-full {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            max-width: 1100px;
            margin: 0 auto;
        }

        .logo {
            font-size: 1.5em;
            font-weight: bold;
            color: white;
            display: flex;
            align-items: center;
            text-decoration: none;
        }

        .logo-circle {
            background-color: #ffcc00;
            color: #1a237e;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            font-weight: 700;
        }

        .nav-links {
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
        }

        .nav-links li { margin-left: 30px; }
        .nav-links a { color: white; text-decoration: none; font-weight: 500; padding: 8px 15px; transition: 0.3s; }
        .nav-links a:hover { border-bottom: 2px solid #ffcc00; }
        .nav-links a.active-dark { background-color: #004d99; border-radius: 4px; color: white !important; }

        /* --- 2. Banner 樣式 (固定高度) --- */
        .event-banner {
            background: linear-gradient(135deg, #1a237e 0%, #0d1241 100%);
            color: white;
            padding: 60px 20px;
            text-align: center;
            border-bottom: 4px solid #ffcc00;
            height: 240px; 
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            overflow: hidden;
        }

        .event-banner h1 { font-size: 3.5em; margin: 0; letter-spacing: 2px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }

        .banner-info-wrap {
            display: flex;
            flex-direction: column; 
            align-items: center;
            gap: 15px;
            margin-top: 20px;
            font-size: 1.1em;
            color: #ffcc00;
        }

        /* --- 3. 主要內容區域 --- */
        .event-content-area {
            max-width: 1100px;
            margin: 0 auto;
            padding: 40px 20px;
            flex: 1;
        }

        .org-image-container { text-align: center; margin-bottom: 50px; }
        .org-logo {
            width: 180px; height: 180px; border-radius: 50%;
            border: 6px solid white; box-shadow: 0 6px 20px rgba(0,0,0,0.15);
            object-fit: cover;
        }

        .info-card {
            background: white; 
            padding: 30px; 
            border-radius: 12px; 
            box-shadow: 0 4px 10px rgba(0,0,0,0.05); 
            margin-bottom: 40px; 
            border-left: 6px solid #ffcc00;
        }

        .section-title {
            border-left: 6px solid #1a237e;
            padding-left: 15px;
            margin: 50px 0 25px;
            color: #1a237e;
            font-size: 1.6em;
            font-weight: bold;
        }

        /* --- 4. 網格佈局 (電腦版並排 4 個) --- */
        .member-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr); 
            gap: 25px;
            margin-top: 20px;
            width: 100%;
        }

        .member-card {
            background: white;
            padding: 30px 15px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 10px rgba(0,0,0,0.05);
            border-top: 5px solid #1a237e;
            transition: all 0.3s ease;
        }
        .member-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 20px rgba(26, 35, 126, 0.15);
            border-top-color: #ffcc00;
        }

        .m-title { font-weight: bold; font-size: 1.3em; color: #111; margin-bottom: 10px; }
        .m-desc { font-size: 1em; color: #666; line-height: 1.5; }

        /* --- 5. 其他元件 --- */
        .back-to-top {
            position: fixed; bottom: 30px; right: 30px;
            width: 50px; height: 50px; background-color: #1a237e;
            color: white; border-radius: 50%; display: flex;
            justify-content: center; align-items: center; z-index: 1000;
            border: 2px solid #ffcc00; transition: 0.3s;
            text-decoration: none;
        }

        footer { text-align: center; padding: 20px; background-color: #1a237e; color: white; font-size: 0.9em; }

        /* =============================================
           響應式優化 (RWD)
           ============================================= */
        @media (max-width: 1100px) {
            .member-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
            /* 導覽列在手機版強制不換行且縮小字體 */
            .navbar-full { flex-direction: column; padding: 10px 5px; }
            .nav-links { 
                margin-top: 10px; 
                width: 100%; 
                justify-content: center; 
                display: flex;
                flex-wrap: nowrap; 
                padding: 10px 0 5px 0;
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            .nav-links li { margin: 0 4px; flex-shrink: 1; }
            .nav-links a { 
                padding: 5px 8px; 
                font-size: clamp(12px, 3.2vw, 14px); 
                white-space: nowrap; 
            }

            .event-banner { height: auto; padding: 40px 20px; }
            .event-banner h1 { font-size: 2.2em; }

            /* 手機版網格改為並排 2 個 */
            .member-grid { grid-template-columns: repeat(2, 1fr); gap: 15px; }
        }
    </style>
</head>
<body>

    <header class="navbar-static">
        <nav class="navbar-full">
            <div class="logo"><div class="logo-circle">立</div> 立法院 Legislature</div>
            <ul class="nav-links">
                <li><a href="index.html">首頁</a></li>
                <li><a href="about.html"class="active-dark">關於我們</a></li> 
                <li><a href="members.html">成員介紹</a></li> 
                <li><a href="events.html">活動行程</a></li>
                <li><a href="index.html">其他</a></li>
            </ul>
        </nav>
    </header>

    <section class="event-banner">
        <h1>這是立法院的首頁</h1>
        <div class="banner-info-wrap">
        </div>
    </section>

    <main class="event-content-area">
            <div>
                <div class="org-image-container" style="padding: 50px 0 0 0;">
                    <img src="https://github.com/ChengHan16/Legislature-Family-Website/blob/main/image/%E7%AB%8B%E6%B3%95%E9%99%A2%E5%A4%A7%E9%A0%AD%E8%B2%BC.png?raw=true" alt="立法院大頭貼" class="org-logo">
                </div>
            </div>
    </main>

    <a href="#" class="back-to-top"><i class="fa-solid fa-chevron-up"></i></a>

    <footer>
        <p>© 2026 您的版權所有文字. All rights reserved.</p>
    </footer>

</body>
</html>
```
