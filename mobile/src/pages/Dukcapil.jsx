// import MessageListItem from '../components/MessageListItem';
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
  console.log(dukcapilData, error)
  useIonViewWillEnter(() => {
    // const msgs = getMessages();
    // setMessages(msgs);
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
        <IonItem style={{ color:"white" }}>
         {
           dukcapilData.length && JSON.stringify(dukcapilData)
         }
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Dukcapil;
