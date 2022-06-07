import cls from 'classnames';
import styles from './slider.module.css';

interface SliderPginationProps {
    pages : number,
    currentPage: number,
}   

function SliderPgination(props: SliderPginationProps) {
  
    const {pages, currentPage} = props;
    
    return (
    <div className={styles.pagination_row}>
        {Array(Math.ceil(pages)).fill(0).map((_, indx:number) =>{
            return (
                <div key={indx} className={cls(styles.pagination_tab,indx + 1 === currentPage && styles.active_tab)} />
            )
        })}
    </div>
  )
}

export default SliderPgination