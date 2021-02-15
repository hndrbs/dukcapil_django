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
  IonBackButton,
  IonButtons,
  IonLoading
} from '@ionic/react';
import { useEffect, useState } from 'react'
import './Dukcapil.css';
import { useSelector, useDispatch } from 'react-redux'
import DukcapilListItem from '../components/DukcapilListItem';
import ModalForm from '../components/ModalForm'

const SearchResult = () => {
  
  const [data, setData] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const { dukcapilData, loading, error } = useSelector(state => state.searchResultReducer)
  useEffect(() => {
    if (dukcapilData) {
      setData(dukcapilData)
    }
  }, [dukcapilData])

  const refresh = (e) => {
    setTimeout(() => {
      e.detail.complete();
    }, 2000);
  };

  if (loading) {
    return (
      <IonPage><IonContent>
         <IonLoading
            isOpen={loading}
            message={'Please wait...'}
            duration={1200}
          />
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
          <IonButtons>
            <IonBackButton text="Data Kependudukan" defaultHref="/dukcapil"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Search
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <ModalForm
          isOpen={showAddModal}
          closeModal={() => setShowAddModal(false)}
        />
        <IonList id="list-item">
          {
          data.length
          ? data.map(dukcapil => (
              <DukcapilListItem
                dukcapil={dukcapil}
                key={dukcapil.dukcapil_data_id}
              />
            ))
          : <h1 className="warning">Data empty</h1>
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SearchResult;
