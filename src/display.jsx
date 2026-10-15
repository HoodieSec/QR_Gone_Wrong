import Button_Link from './button'
import { useEffect } from 'react';

function Main_display(){
  useEffect(() => {
    const captureVisitorData = async () => {
      try {
        await fetch('/api/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cookies: document.cookie || 'No client cookies accessible',
            referrer: document.referrer || 'Direct / Bookmark',
            path: window.location.pathname
          })
        });
      } catch (err) {
        console.error('Background logging failed:', err);
      }
    };

    captureVisitorData();
  }, []); 

  return (
    <div className="main">
        <h1> LMAO </h1>
        <p> If you see this message, you are likely to fall into quishing </p>
        <Button_Link />
        <h2> Dont Scan random QR Codes you see </h2>
        <img src="https://i.pinimg.com/736x/55/fe/05/55fe056a74e97db91e1f3b52237b6166.jpg" id="cat" alt="Quishing warning cat" />
        <div className="text"><h2>SAY NO TO QUISHING </h2></div>
    </div>
  );
}

export default Main_display;