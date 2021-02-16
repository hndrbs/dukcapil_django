import React from 'react';
import { IonContent, IonRefresher, IonRefresherContent } from '@ionic/react';
import { chevronDownCircleOutline } from 'ionicons/icons';


const Error = ({ refreshFunction, message }) => {
  return (
    <IonContent>
      <IonRefresher slot="fixed" onIonRefresh={refreshFunction}>
        <IonRefresherContent
          pullingIcon={chevronDownCircleOutline}
          pullingText="Pull to refresh"
          refreshingSpinner="circles"
          refreshingText="Refreshing..."
        >
        </IonRefresherContent>
      </IonRefresher>
      <p className="warning">{message}</p>
    </IonContent>
  )
}

export default Error