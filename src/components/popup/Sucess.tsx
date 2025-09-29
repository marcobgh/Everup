import { useEffect, useState } from 'react';
import './Popup.css'

interface Props {
    popupDescription: string;
}

function Sucess( { popupDescription }: Props) {
    const [visible, setVisible] = useState(true);

     useEffect(() => {
    if (!popupDescription) return;
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [popupDescription]);


    return (
        <div className={`popup-container sucess ${visible && "show"}`}>
            <span className='sucess-detail'>{popupDescription} <i className="fa-solid fa-thumbs-up"></i></span>
        </div>
    )
}

export default Sucess;