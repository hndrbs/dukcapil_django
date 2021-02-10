import DukcapilListItem from '../components/DukcapilList';
// import { useState } from 'react';
// import { Message, getMessages } from '../data/messages';
import fetchDukcapil from '../store/actions'
import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux'

const Dukcapil = () => {

  // const [messages, setMessages] = useState<Message[]>([]);
  // const [data, setData] = useState<[]>([])
  const { dukcapilData, loading, error } = useSelector(state => state)
  const dispatch = useDispatch()

  useIonViewWillEnter(() => {
    dispatch(fetchDukcapil())
  });

  const refresh = (e) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  if (loading) {
    return (
      <IonPage><IonContent>
        <IonItem>
          loadinnnng
        </IonItem>  
      </IonContent></IonPage>
    )
  } else if (error) {
    return (
      <IonPage><IonContent>
        <IonItem>
          {JSON.stringify(error)}
        </IonItem>  
      </IonContent></IonPage>
    ) 
  }
  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Data Kependudukan</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Data Kependudukan
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {
            dukcapilData.length
            ? dukcapilData.map(dukcapil => (
                <DukcapilListItem
                  dukcapil={dukcapil}
                  key={dukcapil.dukcapil_data_id}
                />
              ))
            : <h1>Data empty</h1>
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Dukcapil;
