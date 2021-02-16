import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonLoading,
  useIonViewWillEnter
} from '@ionic/react';
import './Dukcapil.css';
import { DukcapilListItem, ModalForm, Error } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { search } from '../store/actions'

const SearchResult = () => {
  const [data, setData] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const { dukcapilData, loading, error } = useSelector(state => state.searchResultReducer)
  const location = useLocation()
  const nik = location.search.split("=")[1]
  const dispatch = useDispatch()

  useIonViewWillEnter(() => {
    dispatch(search(nik))
  })

  useEffect(() => {
    if (dukcapilData) {
      setData(dukcapilData)
    }
  }, [dukcapilData])

  const refresh = (e) => {
    dispatch(search(nik))
    setTimeout(() => {
      e.detail.complete();
    }, 2000);
  }

  if (loading && !dukcapilData) {
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
      <IonPage>
        <Error
          message={error.message}
          refreshFunction={refresh}
        />
      </IonPage>
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
          : <h1 className="warning">Not Found</h1>
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default SearchResult;
