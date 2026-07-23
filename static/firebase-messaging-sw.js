importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBfOiwIknjGRfdmZk5UvpyrGjpouwAY_CE",
  authDomain: "atotheiv16.firebaseapp.com",
  projectId: "atotheiv16",
  storageBucket: "atotheiv16.firebasestorage.app",
  messagingSenderId: "469305473624",
  appId: "1:469305473624:web:dc2595ee0ee4a7b20be82d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || 'Atothei';
  const body = payload.notification?.body || '';
  const room = payload.data?.room || '';
  self.registration.showNotification(title, {
    body: body,
    icon: '/static/icon-192.png',
    data: { room: room }
  });
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('/');
    })
  );
});
