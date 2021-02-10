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
  IonSelectOption
} from '@ionic/react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './ModalForm.css'
import { addDukcapil, editDukcapil } from '../store/actions'

const ModalForm = ({ isOpen, dukcapil, closeModal }) => {
  const [formValues, setFormValues] = useState({
    nik: '',
    name: '',
    maiden_name: '',
    birth_date: '',
    gender: '',
    religion_id: 0,
    marital_status: ''
  })
  
  const dispatch = useDispatch()
  const { religions, marital_statuses } = useSelector(state => state.religionAndMaritalStatusReducer)

  const formHandler = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  console.log(formValues)

  useEffect(() => {
    if (dukcapil) {
      const { dukcapil_data_id, ...clone } = dukcapil
      setFormValues(clone)
    }
  }, [])

  const submitHandler = () => {
    if (!dukcapil) {
      dispatch(addDukcapil(formValues))
    } else {
      dispatch(editDukcapil(
        dukcapil.dukcapil_data_id,
        formValues
      ))
    }
    setTimeout(closeModal, 1000)
  }
  return (
    <IonModal isOpen={isOpen}>
      <IonContent>
      <h4>{dukcapil? "Edit Dukcapil Data" : "Add dukcapil data"}</h4>
      <IonItem>
        <IonInput
          value={formValues.nik}
          type="text"
          placeholder="enter NIK here"
          name="nik"
          onIonChange={formHandler}
        />
      </IonItem>
      <IonItem>
        <IonInput
          value={formValues.name}
          type="text"
          placeholder="enter name here"
          name="name"
          onIonChange={formHandler}
        />
      </IonItem>
      <IonItem>
        <IonInput
          value={formValues.maiden_name}
          type="text"
          placeholder="enter maiden name here"
          name="maiden_name"
          onIonChange={formHandler}
        />
      </IonItem>
      <IonItem>
        <IonInput
          value={formValues.birth_date}
          type="date"
          name="birth_date"
          onIonChange={formHandler}
        />
      </IonItem>
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
      <IonItem>
        <IonSelect
          onIonChange={formHandler}
          name="religion_id"
          value={formValues.religion_id}
        >
          <IonSelectOption value="">--select religion--</IonSelectOption>
            {
              religions.map(religion => (
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
      <IonItem>
        <IonSelect
          onIonChange={formHandler}
          name="marital_status"
          value={formValues.marital_status}
        >
          <IonSelectOption value="">--select marital status--</IonSelectOption>
          {
            marital_statuses.map(status => (
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
          onClick={closeModal}
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