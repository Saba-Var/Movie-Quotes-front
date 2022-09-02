import { useCancelSave } from './useCancelSave'
import { CancelSaveProps } from './types.d'
import { Button } from 'components'

const CancelSave: React.FC<CancelSaveProps> = (props) => {
  const { saveHandler, cancelHandler, styles } = props

  const { t } = useCancelSave()

  return (
    <div
      className={`absolute items-center animate-fade-in flex bottom-[-170px] gap-8 right-[-13%] xl:right-[-14%] 2xl:right-[-16%] 3xl:right-[-23%] ${styles}`}
    >
      <div
        className='text-xl cursor-pointer active:scale-100 transition-transform hover:scale-[1.03]'
        onClick={cancelHandler}
      >
        {t('profile:cancel')}
      </div>

      <Button
        title={t('profile:save-changes')}
        styles='bg-orange text-xl'
        onClick={saveHandler}
        type='submit'
      />
    </div>
  )
}

export default CancelSave
