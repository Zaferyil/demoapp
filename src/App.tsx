import React, { useState } from 'react'
import { addTask, getTasks } from './firebase'
import './App.css'

function App() {
  const [status, setStatus] = useState('Firebase bağlantı testi için butona tıklayın');
  const [tasks, setTasks] = useState<any[]>([]);

  const testFirebase = async () => {
    setStatus('🔥 Firebase bağlantısı test ediliyor...');
    
    try {
      // Test 1: Görev ekleme
      setStatus('📝 Test görevi ekleniyor...');
      const taskId = await addTask('Test görevi - ' + new Date().toLocaleTimeString());
      
      // Test 2: Görevleri okuma
      setStatus('📖 Görevler okunuyor...');
      const allTasks = await getTasks();
      setTasks(allTasks || []);
      
      setStatus(`✅ Firebase başarılı! ${allTasks?.length || 0} görev bulundu`);
    } catch (error) {
      setStatus(`❌ Hata: ${error}`);
      console.error('Firebase test hatası:', error);
    }
  };

  return (
    <div className="app">
      <h1>🔥 Firebase Demo Test</h1>
      <p>Firebase Firestore entegrasyonu test sayfası</p>
      
      <div className="demo-section">
        <h2>Bağlantı Testi</h2>
        <p>{status}</p>
        <button onClick={testFirebase}>
          🧪 Firebase Test Başlat
        </button>
        
        {tasks.length > 0 && (
          <div className="tasks-list">
            <h3>📋 Firestore'daki Görevler:</h3>
            {tasks.map((task, index) => (
              <div key={task.id} className="task-item">
                {index + 1}. {task.task} 
                <small> - {task.createdAt?.toDate?.()?.toLocaleString() || 'Tarih yok'}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
