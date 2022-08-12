import { IconStyle } from './types.d'

const ValidIcon: React.FC<IconStyle> = (props) => {
  const { styles } = props

  return (
    <svg
      className={`${styles} animate-scale-up`}
      width='18'
      height='18'
      viewBox='0 0 18 18'
      fill='none'
    >
      <path
        d='M5.17454 15.1421L1.34954 10.1921C0.449542 7.85212 2.38454 7.04212 3.82454 8.39212L6.29954 11.5421L13.9495 2.99212C15.2995 1.57462 17.5495 2.38461 16.6495 4.56712L7.64954 14.9171C6.68204 16.0421 5.84954 15.8171 5.17454 15.1421Z'
        fill='#198754'
      />
    </svg>
  )
}

export default ValidIcon
