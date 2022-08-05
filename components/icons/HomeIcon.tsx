import { SelectedIcon } from './types.d'

const HomeIcon: React.FC<SelectedIcon> = (props) => {
  const { isSelected } = props

  return (
    <svg width='24' height='22' viewBox='0 0 24 22' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M2.99997 19.2517V9.50168H4.49997V19.2517C4.49997 19.4506 4.57899 19.6414 4.71964 19.782C4.86029 19.9227 5.05106 20.0017 5.24997 20.0017H18.75C18.9489 20.0017 19.1396 19.9227 19.2803 19.782C19.421 19.6414 19.5 19.4506 19.5 19.2517V9.50168H21V19.2517C21 19.8484 20.7629 20.4207 20.341 20.8427C19.919 21.2646 19.3467 21.5017 18.75 21.5017H5.24997C4.65323 21.5017 4.08094 21.2646 3.65898 20.8427C3.23702 20.4207 2.99997 19.8484 2.99997 19.2517ZM19.5 2.75168V8.00168L16.5 5.00168V2.75168C16.5 2.55277 16.579 2.362 16.7196 2.22135C16.8603 2.0807 17.0511 2.00168 17.25 2.00168H18.75C18.9489 2.00168 19.1396 2.0807 19.2803 2.22135C19.421 2.362 19.5 2.55277 19.5 2.75168Z'
        fill={isSelected ? '#E31221' : 'white'}
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M10.9395 1.25168C11.2208 0.970473 11.6022 0.8125 12 0.8125C12.3977 0.8125 12.7792 0.970473 13.0605 1.25168L23.031 11.2207C23.1718 11.3615 23.2509 11.5525 23.2509 11.7517C23.2509 11.9508 23.1718 12.1418 23.031 12.2827C22.8901 12.4235 22.6991 12.5026 22.5 12.5026C22.3008 12.5026 22.1098 12.4235 21.969 12.2827L12 2.31218L2.03097 12.2827C1.89014 12.4235 1.69913 12.5026 1.49997 12.5026C1.30081 12.5026 1.1098 12.4235 0.968971 12.2827C0.828141 12.1418 0.749023 11.9508 0.749023 11.7517C0.749023 11.5525 0.828141 11.3615 0.968971 11.2207L10.9395 1.25168Z'
        fill={isSelected ? '#E31221' : 'white'}
      />
    </svg>
  )
}

export default HomeIcon