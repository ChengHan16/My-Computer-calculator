```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 匹配我們在範例中使用的 collection 名稱
    match /act/{document=**} {
      // 允許任何人讀取與寫入 (不論是否登入)
      allow read, write: if true;
    }
    match /act/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // 對話集合的規則
    match /chats/{chatId} {
      // 只有當使用者是 members 陣列的一員時，才允許讀取與寫入
      allow read, write: if request.auth != null && request.auth.uid in resource.data.members;
      
      // 允許建立新對話，但建立者必須在 members 陣列中
      allow create: if request.auth != null && request.auth.uid in request.resource.data.members;
      
      // 訊息子集合規則
      match /messages/{messageId} {
        allow read, write: if request.auth != null;
      }
    }
    match /content/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    // 為 'post' 集合添加規則，允許已登入的使用者寫入
    match /post/{document} { // <-- 新增的規則
      allow read: if true; // 允許讀取 (您可以根據需求修改)
      allow write: if request.auth != null; // 允許已登入的使用者寫入
    }
    
    
		match /file/{document=**} {
      allow read, write: if request.auth != null;
    }
    // 確保原本的 content 和 act 集合規則也存在
    match /content/{document=**} {
      allow read: if true; // 成員名錄通常允許公開讀取
      allow write: if request.auth != null;
    }
    match /act/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /file/{fileId} {
      allow read: if request.auth != null && 
        (request.auth.token.email in ["your-admin-email@gmail.com"] || 
         request.auth.uid in resource.data.allowedUsers);
      allow create: if request.auth.token.email in ["your-admin-email@gmail.com"];
      allow delete: if request.auth.token.email in ["your-admin-email@gmail.com"];
    }
    
    // events 集合規則：任何人可讀，僅登入者可寫入與修改
    match /events/{eventId} {
      allow read: if true; 
      allow create, update: if request.auth != null;
      allow delete: if request.auth != null; // 建議刪除也限登入者
    }
    
    match /generated_events/{allPaths=**} {
      allow read: if true; // 允許所有人查看生成的活動網頁
      allow write: if request.auth != null; // 僅限登入成員生成
    }
    
    
    //20260209
    // 1. 活動資料：所有人皆可讀取，僅授權管理員可寫入
    match /events/{eventId} {
  allow read: if true; 
  // 僅限管理員新增/刪除
  allow create, delete: if request.auth != null && request.auth.token.email == "wu@ll.com";
  // 關鍵：允許所有登入成員 update，以便執行 arrayUnion/arrayRemove (投票即同步)
  allow update: if request.auth != null; 

  match /votes/{userId} {
    allow read: if true;
    allow write: if request.auth != null && request.auth.uid == userId;
  }
}

    // 3. 成員資料 (act/content)：所有人可讀，確保頭像與名稱正常顯示
    match /act/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /content/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}

```
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // 1. 成員資料管理 (重要：開放讀取以便程式碼進行排序抓取)
    match /content/{docId} {
      allow read: if true; 
      allow write: if request.auth != null;
    }

    // 2. 活動主文件：管理員可增刪，登入成員可更新 (用於 arrayUnion 投票)
    match /events/{eventId} {
      allow read: if true;
      allow create, delete: if request.auth != null && request.auth.token.email == "wu@ll.com";
      allow update: if request.auth != null;

      // 投票子集合：僅限本人操作
      match /votes/{userId} {
        allow read: if true;
        allow write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // 3. 個人資料備援 (act 集合)
    match /act/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // 4. 其他功能性集合 (聊天、檔案等)
    match /chats/{document=**} { allow read, write: if request.auth != null; }
    match /post/{document=**} { allow read: if true; allow write: if request.auth != null; }
    match /file/{document=**} { allow read, write: if request.auth != null; }
  }
}
```
