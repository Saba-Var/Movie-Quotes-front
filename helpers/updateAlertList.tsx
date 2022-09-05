import { AlertListTypes, SetState, UpdatedList } from 'types'

const updateAlertList = (
  setUpdatedList: SetState<UpdatedList>,
  AlertType: AlertListTypes
) => {
  setUpdatedList((prev) => [
    { id: new Date().toISOString(), type: AlertType },
    ...prev,
  ])
}

export default updateAlertList
