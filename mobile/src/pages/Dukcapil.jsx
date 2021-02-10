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
import { useEffect, useState } from 'react'
import './Home.css';
import { useSelector, useDispatch } from 'react-redux'
import DukcapilListItem from '../components/DukcapilListItem';
import { fetchDukcapil } from '../store/actions'

const Dukcapil = () => {
  
  const [data, setData] = useState([])
  const { dukcapilData, loading, error } = useSelector(state => state.dukcapilReducer)
  const dispatch = useDispatch()

  useIonViewWillEnter(() => {
    dispatch(fetchDukcapil())
  });

  useEffect(() => {
    console.log('berubah')
    if (dukcapilData) {
      setData(dukcapilData)
    }
  }, [dukcapilData])

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
            data.length
            ? data.map(dukcapil => (
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
