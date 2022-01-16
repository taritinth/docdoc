## Doc Doc

- แอปพลิเคชันที่จะช่วยอำนวยความสะดวกให้ผู้ป่วยได้รับคำปรึกษาจากแพทย์ผู้เชี่ยวชาญได้แบบออนไลน์
- โครงงานนี้เป็นส่วนหนึ่งของวิชา Mobile Device Programming คณะเทคโนโลยีสารสนเทศ สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง

## Setup
### 1. Firestore
1. Create `firestore` database (**not firebase realtime database**)
2. Get firebase configuration from `Firebase Console` > `Yout Project` > `Project settings`, that config will look like this :
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
3. Replace your web app's firebase configuration in `database/firebaseDB.js`.

### 2. Application
1. To run this project, please make sure you have installed expo-cli , `if not yet` install it first.
```
$ yarn add global expo-cli
```

2. Install project dependencies.
```
$ cd docdoc
$ yarn
```

3. Run your application.
```
$ expo start
```

## Screenshot

<div> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/0.png"> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/1.png"></div>
<div> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/2.png"> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/3.png"></div>
<div> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/4.png"> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/5.png"></div>
<div> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/6.png"> <img width="40%" src="https://github.com/taritinth/docdoc/blob/main/demo/7.png"></div>

