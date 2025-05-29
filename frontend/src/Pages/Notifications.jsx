import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    // Fetch notifications
    axios.get('http://127.0.0.1:8000/api/notifications', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      if (Array.isArray(res.data)) {
        setNotifications(res.data);
      } else {
        setNotifications([]);
      }
    })
    .catch(err => {
      console.error('Erreur de chargement des notifications:', err);
      setNotifications([]);
    })
    .finally(() => {
      setLoading(false);
    });

    // Mark all notifications as read after fetching
    axios.post('http://127.0.0.1:8000/api/notifications/mark-all-read', {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(err => {
      console.error('Erreur lors du marquage comme lu:', err);
    });

  }, [token]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">🛎️ Notifications</h2>

      {loading ? (
        <p className="text-center text-gray-500">Chargement...</p>
      ) : (
        <>
          {notifications.length === 0 ? (
            <p className="text-center text-gray-500">Aucune notification trouvée.</p>
          ) : (
            <ul className="space-y-4">
              {notifications.map((n) => (
                <li key={n.id} className={`p-4 rounded border ${n.is_read ? 'bg-gray-100' : 'bg-yellow-100'}`}>
                  <h3 className="font-semibold text-lg">{n.title}</h3>
                  <p className="text-sm">{n.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{new Date(n.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default Notifications;
