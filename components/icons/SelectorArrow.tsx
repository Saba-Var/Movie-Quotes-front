import { SelectorArrowProps } from 'components'

const SelectorArrow: React.FC<SelectorArrowProps> = (props) => {
  const { isSelected } = props

  return (
    <svg
      className={`${isSelected && 'rotate-180'}`}
      viewBox='0 0 12 8'
      fill='none'
      width='12'
      height='8'
    >
      <path
        d='M5.24702 7.14L0.451017 1.658C-0.114983 1.012 0.345018 3.67706e-07 1.20402 3.67706e-07L10.796 3.67706e-07C10.9883 -0.000164459 11.1765 0.0550878 11.3381 0.159141C11.4998 0.263194 11.628 0.411637 11.7075 0.586693C11.7869 0.761749 11.8142 0.955998 11.7861 1.14618C11.758 1.33636 11.6757 1.51441 11.549 1.659L6.75302 7.139C6.65916 7.24641 6.5434 7.3325 6.41353 7.39148C6.28365 7.45046 6.14266 7.48098 6.00002 7.48098C5.85738 7.48098 5.71638 7.45046 5.58651 7.39148C5.45663 7.3325 5.34088 7.24641 5.24702 7.139V7.14Z'
        fill='white'
      />
    </svg>
  )
}

export default SelectorArrow
