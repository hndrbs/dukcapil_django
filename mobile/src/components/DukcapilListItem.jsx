import {
  IonItem,
  IonLabel,
  IonNote,
  IonIcon,
  IonAlert
  } from '@ionic/react';
import './DukcapilListItem.css';
import { trashBinOutline } from 'ionicons/icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteDukcapil } from '../store/actions'

const DukcapilListItem = ({ dukcapil }) => {
  const dispatch = useDispatch()
  const [showAlert, setShowAlert] = useState(false)


  return (
    <div className="item-wrapper">
      <IonItem
        routerLink={`/dukcapil/${dukcapil.dukcapil_data_id}`}
        detail={false}
      >
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {dukcapil.name}
        </h2>
        <p>{dukcapil.nik}</p>
        <IonNote>{dukcapil.gender}</IonNote>
      </IonLabel>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          message={`are you sure you want to delete this dukcapiil with NIK ${dukcapil.nik} and name ${dukcapil.name}`}
          buttons={[
            {
              text: "Sure!",
              handler: () => {
                dispatch(deleteDukcapil(dukcapil.dukcapil_data_id))
              }
            },
            {
              text: 'No',
              role: 'cancel'
            }
          ]}
        />
      </IonItem>
    <span className="icon">
      <IonIcon 
        icon={trashBinOutline}
        onClick={() => setShowAlert(true)}
      />
    </span>
    </div>
  );
};

export default DukcapilListItem;