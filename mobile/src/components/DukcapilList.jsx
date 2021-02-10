import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import './MessageListItem.css';

const DukcapilListItem = ({ dukcapil }) => {
  return (
    <IonItem routerLink={`/dukcapil/${dukcapil.dukcapil_data_id}`} detail={false}>
      <div slot="start" className="dot dot-unread"></div>
      <IonLabel className="ion-text-wrap">
        <h2>
          {dukcapil.name}
          <span className="date">
            <IonNote>{dukcapil.gender}</IonNote>
          </span>
        </h2>
        <p>{dukcapil.nik}</p>
      </IonLabel>
    </IonItem>
  );
};

export default DukcapilListItem;
