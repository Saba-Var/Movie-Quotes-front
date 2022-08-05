import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Layout, SearchIcon, AddButton, AddMovieForm } from 'components'
import type { GetStaticProps } from 'next'
import { useMovies } from 'hooks'

const Movies = () => {
  const { t, setShowAddMovieForm, showAddMovieForm } = useMovies()

  return (
    <div className={`w-full h-screen !block pt-[25px]`}>
      {showAddMovieForm && (
        <AddMovieForm setShowAddMovieForm={setShowAddMovieForm} />
      )}

      <div>
        <div className='flex justify-between items-center'>
          <div className='1xl:flex-row 1xl:gap-3 flex flex-col animate-focus-in-text-expand'>
            <p className='text-white cursor-default text-2xl font-Helvetica-Neue-Geo font-medium'>
              {t('movies:movies-list')}
            </p>
            <p className='text-white text-base cursor-default 1xl:text-2xl font-Helvetica-Neue-Geo font-medium'>
              {`(${t('movies:total')} 0)`}
            </p>
          </div>

          <div className='hidden 1xl:block animate-fade-in'>
            <div className='flex gap-7 items-center'>
              <div className='flex cursor-pointer items-center gap-3 xl:gap-4'>
                <SearchIcon styles='xl:!block' />
                <p className='hidden xl:block animate-fade-in text-base lg:text-xl text-inputGray font-Helvetica-Neue-Geo font-medium'>
                  {t('common:search')}
                </p>
              </div>

              <AddButton
                clickHandler={() => {
                  setShowAddMovieForm(true)
                }}
                title={t('movies:add-movie')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Movies.PageLayout = Layout

export default Movies

export const getServerSideProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'side-menu',
        'landing',
        'common',
        'movies',
        'auth',
      ])),
    },
  }
}
