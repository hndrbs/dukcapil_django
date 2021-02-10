import { useState } from 'react'
import { IonModal, IonButton, IonContent, IonPage } from '@ionic/react'

const ModalForm = () => {
  const [formValues, setFormValues] = useState({
    nik: '',
    name: '',
    maiden_name: '',
    birth_date: '',
    gender: '',
    religion_id: 0,
    marital_status: ''
  })

  return (
    <IonPage>
      <IonContent>
        <IonModal isOpen={true} cssClass='my-custom-class'>
          <p>This is modal content</p>
          <IonButton>Close Modal</IonButton>
        </IonModal>
        <IonButton>Show Modal</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default ModalForm