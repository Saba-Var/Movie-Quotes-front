import { IconStyle } from './types.d'

const ValidIcon: React.FC<IconStyle> = (props) => {
  const { styles } = props

  return (
    <svg
      className={styles}
      viewBox='0 0 20 20'
      height='20'
      fill='none'
      width='20'
    >
      <rect width='20' height='20' fill='white' fillOpacity='0.01' />
      <rect
        transform='translate(1 1)'
        fillOpacity='0.01'
        fill='white'
        height='18'
        width='18'
      />
      <path
        d='M6.17405 16.1421L2.34905 11.1921C1.44905 8.85212 3.38405 8.04212 4.82405 9.39212L7.29905 12.5421L14.9491 3.99212C16.2991 2.57462 18.5491 3.38461 17.6491 5.56712L8.64905 15.9171C7.68155 17.0421 6.84905 16.8171 6.17405 16.1421Z'
        fill='#198754'
      />
    </svg>
  )
}

export default ValidIcon
