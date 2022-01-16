## Doc Doc

- แอปพลิเคชันที่จะช่วยอำนวยความสะดวกให้ผู้ป่วยได้รับคำปรึกษาจากแพทย์ผู้เชี่ยวชาญได้แบบออนไลน์
- โครงงานนี้เป็นส่วนหนึ่งของวิชา Mobile Device Programming คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง

## Setup
1. To run this project, please make sure you have installed expo-cli , `if not yet` install it first.
```
$ yarn add global expo-cli
```

2. Install project dependencies.
```
$ cd docdoc
$ yarn
```

3. You need to config your web app's firebase configuration in `database/firebaseDB.js`.
```
const firebaseConfig = {
  apiKey: "XXXXXX",
  authDomain: "XXXXXX",
  projectId: "XXXXXX",
  storageBucket: "XXXXXX",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX",
  measurementId: "XXXXXX",
};
```

***You can copy it from Firebase Console > Project settings*** 

4. run project
```
$ expo start
```

## Screenshot

<div> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/0.png"> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/1.png"></div>
<div> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/2.png"> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/3.png"></div>
<div> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/4.png"> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/5.png"></div>
<div> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/6.png"> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/7.png"></div>

