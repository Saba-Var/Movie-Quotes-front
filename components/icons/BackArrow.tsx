import { BackArrowProps } from './types.d'

const BackArrow: React.FC<BackArrowProps> = (props) => {
  const { styles, clearStyles, onClick } = props

  return (
    <svg
      onClick={() => onClick && onClick()}
      className={`${
        !clearStyles && 'absolute bottom-[15px] left-[103px]'
      } ${styles}`}
      viewBox='0 0 13 10'
      height='10'
      fill='none'
      width='13'
    >
      <path
        d='M0.900423 4.83098C0.900423 5.03531 0.982397 5.23963 1.12887 5.38386L4.96677 9.31415C5.13086 9.48242 5.30664 9.56055 5.48828 9.56055C5.91015 9.56055 6.20898 9.25406 6.20898 8.8454C6.20898 8.62906 6.12109 8.44877 5.98633 8.31055L4.67382 6.95237L3.1328 5.50406L4.457 5.58218L11.3652 5.58218C11.8105 5.58218 12.1152 5.27569 12.1152 4.83098C12.1152 4.38626 11.8105 4.07978 11.3652 4.07978L4.457 4.07978L3.12695 4.1579L4.67382 2.70959L5.98633 1.3514C6.12109 1.21917 6.20898 1.03894 6.20898 0.816556C6.20898 0.413941 5.91015 0.107403 5.48828 0.107403C5.30664 0.107403 5.13086 0.179556 4.97262 0.335787L1.12887 4.27809C0.982397 4.42233 0.900423 4.62665 0.900423 4.83098Z'
        fill='white'
      />
    </svg>
  )
}

export default BackArrow
