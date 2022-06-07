import { ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
    error: string,
    value: string | number,
    onChange: Function,
    placeholder: string,
    type: "email" | "text"
}

function Input(props: InputProps) {

  const {error, value, onChange, placeholder, type} = props;
  const handleChange:React.ChangeEventHandler = (e:ChangeEvent) => {
    onChange(e.target.value);
  };
  return (
    <div className={styles.container}>
        <input type={type} className={styles.input} placeholder={placeholder} onChange={handleChange} />
        {error!== '' && (<p className={styles.error}>&#33; <span className={styles.error_text}>{error}</span></p>)}
    </div>
  )
}

export default Input