import { ChangeEvent } from 'react';
import styles from './Input.module.css';

interface InputProps {
    error: string,
    value: string | number,
    onChange: Function,
    placeholder: string,
}

function Input(props: InputProps) {

  const {error, value, onChange, placeholder} = props;
  const handleChange:React.ChangeEventHandler = (e:ChangeEvent) => {
    onChange(e.target.value);
  };
  return (
    <div className={styles.container}>
        <input className={styles.input} placeholder={placeholder} onChange={handleChange} />
        {error!== '' && (<p className={styles.error}>&#33; <span className={styles.error_text}>{error}</span></p>)}
    </div>
  )
}

export default Input