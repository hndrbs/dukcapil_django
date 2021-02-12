import { 
  IonModal,
  IonButton,
  IonContent,
  IonItem,
  IonInput,
  IonRadio,
  IonRadioGroup,
  IonLabel,
  IonSelect,
  IonSelectOption,
  useIonViewWillEnter
} from '@ionic/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './ModalForm.css'
import { addDukcapil, editDukcapil, fetchReligions, fetchMaritalStatuses } from '../store/actions'

const ModalForm = ({ isOpen, dukcapil, closeModal }) => {
  const [btnSubmitClicked, setBtnSubmitClicked] = useState(false)
  const [formValues, setFormValues] = useState({
    nik: '',
    name: '',
    maiden_name: '',
    birth_date: '',
    gender: '',
    religion_id: 0,
    marital_status: ''
  })
  const [validStatus, setValidStatus] = useState({
    nik: false,
    name: false,
    maiden_name: false,
    birth_date: false,
    gender: false,
    religion_id: false,
    marital_status: false
  })
  const dispatch = useDispatch()
  const { religions, marital_statuses } = useSelector(state => state.religionAndMaritalStatusReducer)

  useEffect(() => {
    if (dukcapil) {
      const { dukcapil_data_id, ...clone } = dukcapil
      setFormValues(clone)
    }
  }, [])

  useIonViewWillEnter(() => {
    !religions && dispatch(fetchReligions())
    !marital_statuses && dispatch(fetchMaritalStatuses())
    
  })

  useEffect(() => {
    validator()
  }, [formValues])

  const formHandler = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }
  
  const validator = () => {
    const religion_ids = religions?.map(({ religion_id }) => religion_id)
    const marital_status_descs = marital_statuses?.map(({ marital_status_desc }) => marital_status_desc)
    setValidStatus({
      nik: formValues.nik.split("").every(char => !isNaN(char)) && formValues.nik, //there is a limitation for direct isNan
      name: formValues.name.length > 0,
      maiden_name: formValues.maiden_name.length > 0,
      birth_date: new Date(formValues.birth_date).getTime() < new Date ().getTime(),
      gender: ['male', 'female'].includes(formValues.gender),
      religion_id: religion_ids?.includes(formValues.religion_id),
      marital_status: marital_status_descs?.includes(formValues.marital_status)
    })
  }

  const clearState = () => {
    !dukcapil &&
    setFormValues({
      nik: '',
      name: '',
      maiden_name: '',
      birth_date: '',
      gender: '',
      religion_id: 0,
      marital_status: ''
    })
    setBtnSubmitClicked(false)
  }
  const submitHandler = () => {
    setBtnSubmitClicked(true)
    const isAllValid = Object.values(validStatus).every(bool => bool)
    if (isAllValid) {
      if (!dukcapil) {
        dispatch(addDukcapil(formValues))
      } else {
        dispatch(editDukcapil(
          dukcapil.dukcapil_data_id,
          formValues
        ))
      }
      setTimeout(() => {
        closeModal()
        // clearState()
      }, 1000)
    }
  }
  return (
    <IonModal isOpen={isOpen}>
      <IonContent className="modal-content">
        <h4>{dukcapil? "Edit Dukcapil Data" : "Add dukcapil data"}</h4>
        {!validStatus.nik  && btnSubmitClicked && <p className="valid-msg">NIK must be numbers</p>}
        <IonItem>
          <IonInput
            value={formValues.nik}
            type="text"
            placeholder="enter NIK here"
            name="nik"
            onIonChange={formHandler}
          />
        </IonItem>
        {!validStatus.name && btnSubmitClicked && <p className="valid-msg">Please fill name field</p>}
        <IonItem>
          <IonInput
            value={formValues.name}
            type="text"
            placeholder="enter name here"
            name="name"
            onIonChange={formHandler}
          />
        </IonItem>
        {!validStatus.maiden_name && btnSubmitClicked && <p className="valid-msg">Please fill maiden name</p>}
        <IonItem>
          <IonInput
            value={formValues.maiden_name}
            type="text"
            placeholder="enter maiden name here"
            name="maiden_name"
            onIonChange={formHandler}
          />
        </IonItem>
        {!validStatus.birth_date && btnSubmitClicked && <p className="valid-msg">Please fill the valid birth date</p>}
        <IonItem>
          <IonInput
            value={formValues.birth_date}
            type="date"
            name="birth_date"
            onIonChange={formHandler}
          />
        </IonItem>
        {!validStatus.gender && btnSubmitClicked && <p className="valid-msg">Please choose the provided gender choices</p>}
        <IonItem>
          <IonRadioGroup
            onIonChange={formHandler}
            name="gender"
            value={formValues.gender}
          >
            <IonItem>
              <IonRadio value="male" name="gender" />
              <IonLabel>Male</IonLabel>
            </IonItem>
            <IonItem>
              <IonRadio value="female" name="gender" />
              <IonLabel>Female</IonLabel>
            </IonItem>
          </IonRadioGroup>
        </IonItem>
        {!validStatus.religion_id && btnSubmitClicked && <p className="valid-msg">Please choose the provided religion choices</p>}
        <IonItem>
          <IonSelect
            onIonChange={formHandler}
            name="religion_id"
            value={formValues.religion_id}
          >
            <IonSelectOption value={0}>--select religion--</IonSelectOption>
              {
                religions?.map(religion => (
                  <IonSelectOption
                    key={"religion" + religion.religion_id}
                    value={religion.religion_id}
                  >
                    <IonItem>{religion.religion_name}</IonItem>
                  </IonSelectOption>
                ))
              }
            </IonSelect>
        </IonItem>
        {!validStatus.marital_status && btnSubmitClicked && <p className="valid-msg">Please choose marital status</p>}
        <IonItem>
          <IonSelect
            onIonChange={formHandler}
            name="marital_status"
            value={formValues.marital_status}
          >
            <IonSelectOption value="">--select marital status--</IonSelectOption>
            {
              marital_statuses?.map(status => (
                <IonSelectOption
                  value={status.marital_status_desc}
                  key={"marital status" + status.marital_status_id}
                >
                  <IonItem>{status.marital_status_desc}</IonItem>
                </IonSelectOption>
              ))
            }
          </IonSelect>
        </IonItem>
        <div className="btn-modal-wrapper">
          <IonButton
            onClick={() => {
              closeModal()
              clearState()
            }}
          >Cancel</IonButton>
          <IonButton
            onClick={submitHandler}
          >Submit</IonButton>
        </div>
      </IonContent>
    </IonModal>
  )
}

export default ModalForm