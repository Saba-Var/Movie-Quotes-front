import { useCancelSave } from './useCancelSave'
import { CancelSaveProps } from './types.d'
import { Button } from 'components'

const CancelSave: React.FC<CancelSaveProps> = (props) => {
  const { saveHandler, cancelHandler, styles, mobile, disableSubmit } = props

  const { t } = useCancelSave()

  return (
    <div
      className={`${
        !mobile
          ? 'absolute items-center animate-fade-in flex bottom-[-170px] gap-8 right-[-11%] xl:right-[-12%] 2xl:right-[-12%]'
          : 'absolute flex w-full justify-between items-center px-[10%] bottom-[-60%]'
      } ${styles}`}
    >
      <div
        className='text-xl cursor-pointer active:scale-100 transition-transform hover:scale-[1.03]'
        onClick={cancelHandler}
      >
        {t('profile:cancel')}
      </div>

      {disableSubmit ? (
        <div
          className='text-white animate-fade-in relative px-6 py-2 active:scale-100 transition-transform hover:scale-[1.03] rounded-md bg-orange text-xl'
          onClick={saveHandler}
        >
          {t(`profile:${mobile ? 'add' : 'save-changes'}`)}
        </div>
      ) : (
        <Button
          title={t(`profile:${mobile ? 'add' : 'save-changes'}`)}
          styles='bg-orange text-xl'
          onClick={saveHandler}
          type='submit'
        />
      )}
    </div>
  )
}

export default CancelSave
