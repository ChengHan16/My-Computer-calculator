// 1. 統一版面載入器
async function loadLayout(activeNav) {
    try {
        // 使用相對路徑抓取零件
        const headerData = await fetch('./components/dashboard.html').then(res => res.text());
        // 確保這裡的 ID 與 HTML 中的 <div id="..."> 一致
        document.getElementById('header-layout').innerHTML = headerData;
        
        const footerData = await fetch('./components/footer.html').then(res => res.text());
        document.getElementById('footer-layout').innerHTML = footerData;

        // 設定導覽列高亮
        const navLink = document.querySelector(`[data-nav="${activeNav}"]`);
        if (navLink) navLink.classList.add('active-dark');
    } catch (error) {
        console.error("無法載入頁面零件:", error);
    }
}

// 2. Firebase 與成員資料抓取 (您的原本邏輯)
const firebaseConfig = { 
    apiKey: "AIzaSyACnoimIASfb1rb59SbgLDkUmyYR6ODbUU",
    authDomain: "llwb-ed686.firebaseapp.com",
    projectId: "llwb-ed686",
    storageBucket: "llwb-ed686.firebasestorage.app", 
    messagingSenderId: "940345852074",
    appId: "1:940345852074:web:7a30cca5a6d997a92350d3",
    measurementId: "G-KWL4ZE3D18"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


// main.js 修正部分
async function syncMemberData(targetName, dept, group) {
    // 將 .innerText 改為 .innerHTML
    if(document.getElementById('banner-dept')) {
        document.getElementById('banner-dept').innerHTML = dept; 
    }
    if(document.getElementById('banner-group')) {
        document.getElementById('banner-group').innerHTML = group; 
    }

    try {
        const snapshot = await db.collection("content").where("text", "==", targetName).get();
        if (!snapshot.empty) {
            const data = snapshot.docs[0].data();
            if (data.imageUrl) document.getElementById('dynamic-avatar').src = data.imageUrl;
        }
    } catch (error) {
        console.error("Firebase 錯誤:", error);
    }
}
document.addEventListener("DOMContentLoaded", async () => {
    // 1. 先執行版面載入 (確保側邊欄 HTML 已經被抓取並放入頁面)
    await loadLayout('index'); 

    // 2. 監聽 Firebase 登入狀態
    auth.onAuthStateChanged((user) => {
        if (user) {
            // --- 權限判斷邏輯 ---
            // 在這裡填入允許看到的 Email 地址
            const adminEmails = ["wu@ll.com", "boss@example.com"];
            
            // 抓取剛才在 HTML 建立的按鈕 ID
            const addEventBtn = document.getElementById('admin-add-event');
            
            // 如果按鈕存在，且使用者的 Email 在名單內
            if (addEventBtn && adminEmails.includes(user.email)) {
                addEventBtn.style.display = "block"; // 改為顯示
            }
            
            // (其餘原本的個人資料抓取邏輯保留在此處...)
        } else {
            // 未登入處理
            window.location.href = "login.html";
        }
    });
});