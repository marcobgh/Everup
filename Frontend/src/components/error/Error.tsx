import { useEffect, useState } from 'react';
import './Error.css'

interface Props {
    errorDescription: string;
}

function Error( { errorDescription }: Props) {
    const [visible, setVisible] = useState(true);

     useEffect(() => {
    if (!errorDescription) return;
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorDescription]);


    return (
        <div className={`error-container ${visible && "show"}`}>
            <span className='error-detail'>{errorDescription} <i className="fa-solid fa-triangle-exclamation"></i></span>
        </div>
    )
}

export default Error;