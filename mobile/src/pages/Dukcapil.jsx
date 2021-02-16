import {
  IonContent,
  IonHeader,
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
import './Dukcapil.css';
import { useEffect, useState } from 'react'
import { DukcapilListItem, ModalForm, Error } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { fetchDukcapil } from '../store/actions'
import { useHistory } from 'react-router-dom'
import { addOutline } from 'ionicons/icons'

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
    dispatch(fetchDukcapil())
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
      history.push(`/search/?nik=${nik.value}`)
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
          : <h1 className="warning">Data empty</h1>
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Dukcapil;
