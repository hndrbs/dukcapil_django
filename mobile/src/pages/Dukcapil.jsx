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
  useIonViewWillEnter,
  IonIcon,
  IonButton,
  IonSearchbar,
  IonLoading
} from '@ionic/react';
import { useEffect, useState } from 'react'
import './Dukcapil.css';
import { useSelector, useDispatch } from 'react-redux'
import DukcapilListItem from '../components/DukcapilListItem';
import { fetchDukcapil, search } from '../store/actions'
import { addOutline } from 'ionicons/icons'
import ModalForm from '../components/ModalForm'
import { useHistory } from 'react-router-dom'

const Dukcapil = () => {
  const history = useHistory()
  const [data, setData] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [nik, setNik] = useState({
    value: "",
    isValid: true
  })
  const { dukcapilData, loading, error } = useSelector(state => state.dukcapilReducer)
  const dispatch = useDispatch()

  useIonViewWillEnter(() => {
    dispatch(fetchDukcapil())
  });

  useEffect(() => {
    if (dukcapilData) {
      setData(dukcapilData)
    }
  }, [dukcapilData])

  const refresh = (e) => {
    setTimeout(() => {
      e.detail.complete();
    }, 2000);
  }

  const searchChangeHandler = (value) => {
    if (value.split("").every(char => !isNaN(char))) {
      setNik({ isValid: true, value })
    } else {
      setNik({ value, isValid: false})
    }
  }

  const onSearch = () => {
    if (nik.isValid && nik.value.length) {
      dispatch(search(nik.value))
      history.push('/search')
    }
  }

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
        <div id="top-bar">
          <IonButton
            onClick={() => setShowAddModal(true)}
            id="add-btn"
          >
            <IonIcon icon={addOutline}/>
          </IonButton>
          <IonSearchbar
            onIonChange={e => {searchChangeHandler(e.target.value)}}
            placeholder="NIK"
            value={nik.value.toString()}
          ></IonSearchbar>
          <IonButton
            onClick={onSearch}
            color="light"
          >
            Search
          </IonButton>
        </div>
        <ModalForm
          isOpen={showAddModal}
          closeModal={() => setShowAddModal(false)}
        />
        <IonList id="list-item">
          <p className="warning">{!nik.isValid && "NIK must be numbers"}</p>
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
